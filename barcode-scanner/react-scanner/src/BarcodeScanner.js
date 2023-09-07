import React, { useState } from "react";
import QRCode from "qrcode.react";

function QRCodeGenerator() {
  return (
    <div>
      <h2>QR Code Generator</h2>

      <QRCode
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value="9106909768"
      />
    </div>
  );
}

export default QRCodeGenerator;
