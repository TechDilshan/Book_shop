import { useState, useEffect, useRef } from "react";
import "./PurchaseOrder.css";
import { Input, Form, DatePicker, Button, Modal, message } from "antd";
import {
  DeleteOutlined,
  PlusSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import Navi from '../Navi'

const PurchaseOrder = () => {

  // useEffect(() => {
  //   const email = sessionStorage.getItem('userEmail');
  //   setEmail(email);
  // }, []);

  const userEmail = sessionStorage.getItem('userEmail');

  const [name, setName] = useState("");
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [order, setOrder] = useState("");
  const [items, setItems] = useState([
    {
      id: 0,
      item: "",
      description: "",
      quantity: "",
      price: "",
      amount: "",
      discount: 10,
    },
  ]);
  const [discount, setDiscount] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");

  useEffect(() => {
    generateOrderNumber();
  }, []);

  const generateOrderNumber = () => {
    let randomNumber;
    do {
      randomNumber = Math.floor(100000 + Math.random() * 900000);
    } while (generatedOrderNumbers.includes(randomNumber));
    setOrder("#" + randomNumber.toString());
    setGeneratedOrderNumbers((prev) => [...prev, randomNumber]);
  };

  const [generatedOrderNumbers, setGeneratedOrderNumbers] = useState([]);

  const scrollToPurchaseOrder = () => {
    const purchaseOrderSection = document.getElementById(
      "purchase-order-section"
    );
    purchaseOrderSection.scrollIntoView({ behavior: "smooth" });
  };

  const searchRef = useRef(null);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
    try {
      // Validate form fields
      await form.validateFields();

      // Extract formatted value from date picker
      const formattedValue = form
        .getFieldValue("start-date-picker")
        .format("YYYY-MM-DD");
      console.log("Received value of start-date-picker: ", formattedValue);

      // Prepare data for submission
      const dataList = {
        name,
        email,
        phone,
        address,
        zipcode,
        state,
        order,
        items: items,
        discount,
        startDate,
        endDate,
        status: 0,
      };

      let summaryContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nZip Code: ${zipcode}\nState: ${state}\nOrder: ${order}\nStart Date: ${startDate}\nEnd Date: ${endDate}\nItems:\n`;

      items.forEach((item, index) => {
        summaryContent += `Item ${index + 1}:\n`;
        summaryContent += `   Item: ${item.item}\n`;
        summaryContent += `   Description: ${item.description}\n`;
        summaryContent += `   Quantity: ${item.quantity}\n`;
        summaryContent += `   Price: ${item.price}\n`;
        summaryContent += `   Discount: ${item.discount}%\n`;
        summaryContent += `   Amount: Rs.${item.amount}\n\n`;
      });

      summaryContent += `Subtotal: Rs.${calculateSubtotal()}\n`;
      summaryContent += `Discount: ${discount}%\n`;
      summaryContent += `Total: Rs.${calculateTotal()}`;

      setSummaryContent(summaryContent);

      setModalVisible(true);
      const response = await axios.post(
        "http://localhost:6001/api/createPurchaseorder",
        dataList
      );
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Request Error:", error.message);
      }
      console.log("Abishaan");
    }
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItemLine = () => {
    const newItem = {
      id: items.length,
      item: "",
      description: "",
      quantity: "",
      price: "",
      discount: discount, 
    };
    setItems([...items, newItem]);
    if (items.length === 0) {
      setDiscount(10);
    }
  };

  const deleteItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      console.log("At least one row must remain.");
    }
  };

  const calculateAmount = (index) => {
    const updatedItems = [...items];
    const item = updatedItems[index];
    const quantity = parseFloat(item.quantity);
    const price = parseFloat(item.price);
    const discountPercentage = parseFloat(item.discount);

    if (!isNaN(quantity) && !isNaN(price) && !isNaN(discountPercentage)) {
      const discountAmount = (price * quantity * discountPercentage) / 100;
      const amount = (quantity * price - discountAmount).toFixed(2);
      updatedItems[index] = { ...item, amount };
    } else {
      updatedItems[index] = { ...item, amount: "" };
    }

    setItems(updatedItems);
  };

  const calculateSubtotal = () => {
    if (items.length === 0) {
      return "-";
    } else {
      let subtotal = 0;
      items.forEach((item) => {
        if (item.amount !== "") {
          subtotal += parseFloat(item.amount);
        }
      });
      return subtotal.toFixed(2);
    }
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    if (!isNaN(subtotal)) {
      const totalAmount = subtotal;
      return totalAmount.toFixed(2);
    } else {
      return "-";
    }
  };
  const inputRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const zipcodeRef = useRef(null);
  const stateRef = useRef(null);

  const lastFocusedFieldRef = useRef(null); 

  const handleClick = (fieldName) => {
    const fields = [
      { name: "name", value: name, setValue: setName, ref: inputRef },
      { name: "email", value: email, setValue: setEmail, ref: emailRef },
      { name: "phone", value: phone, setValue: setPhone, ref: phoneRef },
      {
        name: "address",
        value: address,
        setValue: setAddress,
        ref: addressRef,
      },
      {
        name: "zipcode",
        value: zipcode,
        setValue: setZipcode,
        ref: zipcodeRef,
      },
      { name: "state", value: state, setValue: setState, ref: stateRef },
    ];

    fields.some((field) => {
      if (!field.value.trim() || fieldName === field.name) {
        field.setValue(" ");
        setTimeout(() => {
          field.ref.current.focus();
        }, 0);
        return true;
      }
      return false;
    });

    lastFocusedFieldRef.current = fieldName; 
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_lzpk098", "template_iiwepkn", form.current, {
        publicKey: "_VKkGOITL4rFikULQ",
      })
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          console.log("success");
        },
        (error) => {
          console.error("Failed to send email:", error);
          console.log("fail");
        }
      );
  };
  return (
    <div className="Home">
      <Navi />
      <div className="Home_Invoice">
        <div className="rathAni">
          <h2>Ratiy Intech</h2>
        </div>
        <div class="animation-container">
          <div class="Streamline">
            <h1 class="move-right-to-left">Streamline Your Orders With</h1>
          </div>
          <div class="Purchase">
            <h1 class="move-right-to-left">Our Purchase Order</h1>
          </div>
          <div class="OurPurchase">
            <h1 class="move-right-to-left">Our Purchase Order</h1>
          </div>
          <div class="PDocument">
            <h1 class="move-right-to-left">Document</h1>
          </div>
        </div>

        <div className="PO_Document_Text"><h3>Instantly create a purchase order Document</h3></div>
        <button className="purchase-btn" onClick={scrollToPurchaseOrder}>
          Create a Purchase Order
        </button>
      </div>

      <div className="POS_container" id="purchase-order-section">
        <p className="personal">Enter your personal information</p>
        <div className="STEP_content">
          <p className="step">STEP 1 of 2</p>
          <span className="dot1"></span>
          <span className="dot"></span>
        </div>
      </div>
      <hr />
      <br />

      <Form form={form} onFinish={handleSubmit} onSubmit={sendEmail}>
        <div className="example-input">
          <div className="input-row">
            <Form.Item
              name="fullname"
              rules={[
                { required: true, message: "Please enter your Full name!" },
              ]}
              className={name ? "input-item input-item-active" : "input-item"}
            >
              <div>
                <Input
                  name="name"
                  size="large"
                  placeholder={name ? "" : "Full name"}
                  className="fullname"
                  onClick={() => handleClick("name")}
                  onChange={(e) => setName(e.target.value)}
                  ref={inputRef}
                />
                {name ? (
                  <label className="input-label-active">Full Name</label>
                ) : null}
              </div>
            </Form.Item>

            <Form.Item
              name="email"
              value={email}
              className={email ? "input-item input-item-active" : "input-item"}
              rules={[
                { message: "Please enter your Email!" },
                {
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <div>
                <Input
                  name="email"
                  size="large"
                  placeholder={email ? "" : "Email"}
                  className="Email"
                  value={email}
                
                  ref={emailRef}
                />
                {email ? (
                  <label className="input-label-active">Email</label>
                ) : null}
              </div>
            </Form.Item>

            <Form.Item
              name="phone"
              className={phone ? "input-item input-item-active" : "input-item"}
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /^(0)[0-9]{9}$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <div>
                <Input
                  name="phone"
                  className="phone"
                  placeholder={phone ? "" : "Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                  onClick={() => handleClick("phone")}
                  ref={phoneRef}
                />
                {phone ? (
                  <label className="input-label-active">Phone</label>
                ) : null}
              </div>
            </Form.Item>
          </div>

          <div className="input-row">
            <Form.Item
              name="address"
              className={
                address ? "input-item input-item-active" : "input-item"
              }
              rules={[
                { required: true, message: "Please enter your Address!" },
              ]}
            >
              <div>
                <Input
                  name="address"
                  size="large"
                  placeholder={address ? "" : "Address"}
                  className="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  onClick={() => handleClick("address")}
                  ref={addressRef}
                />
                {address ? (
                  <label className="input-label-active">Address</label>
                ) : null}
              </div>
            </Form.Item>

            <Form.Item
              name="zipcode"
              className={
                zipcode ? "input-item input-item-active" : "input-item"
              }
              rules={[
                { required: true, message: "Please enter your Zip Code!" },
                {
                  pattern: /^[0-9]{5}$/,
                  message: "Please enter a valid Zip code",
                },
              ]}
            >
              <div>
                <Input
                  name="zipcode"
                  size="large"
                  placeholder={zipcode ? "" : "Zip Code"}
                  className="zipcode"
                  onChange={(e) => setZipcode(e.target.value)}
                  onClick={() => handleClick("zipcode")}
                  ref={zipcodeRef}
                />
                {zipcode ? (
                  <label className="input-label-active">Zip Code</label>
                ) : null}
              </div>
            </Form.Item>

            <Form.Item
              name="state"
              className={state ? "input-item input-item-active" : "input-item"}
              rules={[{ required: true, message: "Please enter your State!" }]}
            >
              <div>
                <Input
                  name="state"
                  size="large"
                  placeholder={state ? "" : "State"}
                  className="State"
                  onChange={(e) => setState(e.target.value)}
                  onClick={() => handleClick("state")}
                  ref={stateRef}
                />
                {state ? (
                  <label className="input-label-active">State</label>
                ) : null}
              </div>
            </Form.Item>
          </div>
        </div>

        <div className="POS_container" id="purchase-order-section">
          <p className="personal">Enter your Purchase Order information</p>
          <div className="STEP_content">
            <p className="step">STEP 1 of 2</p>
            <span className="dot1"></span>
            <span className="dot3"></span>
          </div>
        </div>
        <hr />
        <br />

        <div className="example-input1">
          <div className="p_ID"> Purchase OrderID : </div>
          <Form.Item
            rules={[
              { required: true, message: "Please enter your Purchase Order!" },
            ]}
          >

              <Input
                name="order"
                size="large"
                placeholder="Purchase Order #"
                className="Order"
                value={order} 
                readOnly
              />
          </Form.Item>
          <Form.Item
            name="start-date-picker"
            label="Start Date"
            rules={[
              {
                type: "object",
                required: true,
                message: "Please select a start date!",
              },
            ]}
          >
            <DatePicker
              className="DatePicker"
              onChange={(date) => setStartDate(date)}
              name="start-date-picker"
            />
          </Form.Item>
          <div className="datepicker">
            <Form.Item
              name="end-date-picker"
              label="End Date"
              rules={[
                {
                  type: "object",
                  required: true,
                  message: "Please select an end date!",
                },
              ]}
            >
              <DatePicker
                className="DatePicker"
                onChange={(date) => setEndDate(date)}
                name="end-date-picker"
              />
            </Form.Item>
          </div>
        </div>

        <div className="Row">
          {items.map((item, index) => (
            <div key={item.id} className="item">
              <Form.Item
                name={`item-${item.id}`}
                rules={[{ required: true, message: "Please enter your Item!" }]}
              >
                <Input
                  name={`item-${item.id}`}
                  size="large"
                  placeholder="Item"
                  className="Item"
                  value={item.item}
                  onChange={(e) => {
                    const updatedItems = [...items];
                    updatedItems[index].item = e.target.value;
                    setItems(updatedItems);
                  }}
                />
              </Form.Item>

              <Form.Item
                name={`description-${item.id}`}
                rules={[
                  { required: true, message: "Please enter your Description!" },
                ]}
              >
                <Input
                  name={`description-${item.id}`}
                  size="large"
                  placeholder="Description"
                  className="Description"
                  value={item.description}
                  onChange={(e) => {
                    const updatedItems = [...items];
                    updatedItems[index].description = e.target.value;
                    setItems(updatedItems);
                  }}
                />
              </Form.Item>

              <Form.Item
                name={`quantity-${item.id}`}
                rules={[
                  { required: true, message: "Please enter your Quantity!" },
                ]}
              >
                <Input
                  name={`quantity-${item.id}`}
                  size="large"
                  placeholder="Quantity"
                  className="Quantity"
                  value={item.quantity}
                  onChange={(e) => {
                    const updatedItems = [...items];
                    updatedItems[index].quantity = e.target.value;
                    setItems(updatedItems);
                    calculateAmount(index);
                  }}
                />
              </Form.Item>

              <Form.Item
                name={`price-${item.id}`}
                rules={[
                  { required: true, message: "Please enter the Unit Price!" },
                ]}
              >
                <Input
                  name={`price-${item.id}`}
                  size="large"
                  placeholder="Unit Price"
                  className="item_price"
                  value={item.price}
                  onChange={(e) => {
                    const updatedItems = [...items];
                    updatedItems[index].price = e.target.value;
                    setItems(updatedItems);
                    calculateAmount(index);
                  }}
                />
              </Form.Item>
              <Input
                name={`discount-${item.id}`}
                size="large"
                placeholder="Discount (%)"
                className="Discount"
                value={item.discount}
                readOnly
              />

              <Input
                className="amount"
                value={item.amount}
                placeholder="Amount"
                readOnly
              />

              <DeleteOutlined
                onClick={() => deleteItem(item.id)}
                className="delete-icon"
              />
            </div>
          ))}
          <div className="item_line">
            <span onClick={addItemLine}>
              <PlusSquareOutlined />
              <span> Add a new line</span>
            </span>
          </div>
        </div>

        <div className="total-container">
          <div className="subtotal-discount">
            <p>SUBTOTAL: Rs.{calculateSubtotal()}</p>
            <p>DISCOUNT: {discount}%</p>
          </div>
          <div className="PO_total-amount">
            <p>TOTAL: Rs.{calculateTotal()}</p>
          </div>
        </div>

        <Form.Item wrapperCol={{ span: 24 }} className="wrapperCol">
          <div className="purchaseSubmit">
            <Button type="primary" htmlType="submit" className="submit">
              Submit
              <Modal
                title="Purchase Order Summary"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={() => {
                  message.success(
                    "Your purchase order has been submitted successfully!"
                  );
                  setModalVisible(false);
                  navigate("../Profile");
                }}
              >
                <pre>{summaryContent}</pre>
              </Modal>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PurchaseOrder;
