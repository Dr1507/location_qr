import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const qrRef = useRef();
  const houseLocationURL = "https://maps.app.goo.gl/xB7h1nwDh74ywfo1A?g_st=ac"; // your real map link

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "house-location.png";
    downloadLink.click();
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        ref={qrRef}
      >
        <h2 style={{ color: "#333", marginBottom: "20px" }}>
          🏠 House Location QR Code
        </h2>

        <QRCodeCanvas
          value={houseLocationURL}
          size={220}
          bgColor={"#ffffff"}
          fgColor={"#111111"}
          level={"H"}
          includeMargin={true}
          style={{ borderRadius: "10px" }}
        />

        <p style={{ marginTop: "15px" }}>
          <a
            href={houseLocationURL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "500",
            }}
          >
            View on Google Maps
          </a>
        </p>

        <button
          onClick={downloadQR}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}

export default App;
