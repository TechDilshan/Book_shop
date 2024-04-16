import React, { useState } from "react";
import jsPDF from "jspdf";
import "./QR_Gen.css";

const QR_Gen = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");

  const genarateQR = async () => {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error Genarating QR code", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          const doc = new jsPDF();
          const imgProps = doc.getImageProperties(base64data);
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          doc.addImage(base64data, "PNG", 0, 0, pdfWidth, pdfHeight);
          doc.save("qrCode.pdf");
        };
      })
      .catch((error) => {
        console.error("Error Downloading QR code", error);
      });
  };

  const downloadImgQR = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "abishaan.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading the Image", error);
      });
  };
  

  return (
    <div className="qrContainer">
      <p>QR CODE GENARATOR</p>
      {loading && <p>please wait..</p>}
      {img && <img src={img} className="gr-code-image" />}
      <div className="qrCoContainer">
        <input
          className="qr-input"
          type="text"
          id="dataInput"
          placeholder="Enter for QR Code"
          onChange={(e) => setQrData(e.target.value)}
        />
        <br></br>
        <input
          className="qr-input"
          type="text"
          id="sizeInput"
          placeholder="Enter Image Size"
          onChange={(e) => setQrSize(e.target.value)}
        />
        <button
          className="generate-button"
          disabled={loading}
          onClick={genarateQR}
        >
          Genarate QR Code
        </button>
        <button className="download-button" onClick={downloadQR}>
          Download QR Code
        </button>
        <button className="download-button" onClick={downloadImgQR}>
          Download Img QR Code
        </button>
      </div>
    </div>
  );
};

export default QR_Gen;
