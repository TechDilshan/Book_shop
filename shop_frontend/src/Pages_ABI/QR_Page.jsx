import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import Dashboard from "../Components_ABI/Dashboard";
import QR_Gen from "../Components_ABI/QR_Gen";

const QR_Page = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      width: "10%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      width: "15%",
      ...getColumnSearchProps("fullname"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "NIC",
      dataIndex: "nic",
      key: "nic",
      width: "20%",
      ...getColumnSearchProps("nic"),
    },
    {
      title: "Eroll",
      dataIndex: "eroll",
      key: "eroll",
      width: "20%",
      ...getColumnSearchProps("eroll"),
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
      width: "20%",
      ...getColumnSearchProps("number"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const employeeData = () => {
    axios
      .get(`http://localhost:6001/api/getAllEmployeeDetails`)
      .then((response) => {
        setData(response.data?.response || []);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  useEffect(() => {
    employeeData();
  }, []);

  return (
    <div className="QR_Page">
      <Dashboard />
      <div
        className="QR_Page_Name"
        style={{ color: "black", fontSize: "30px", fontWeight: "bold", marginTop:"20px", textAlign:"center", marginBottom:"20px" }}
      >
        QR Details
      </div>
      <Table columns={columns} dataSource={data} />; |<QR_Gen />
    </div>
  );
};

export default QR_Page;
