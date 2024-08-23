import React, { useState } from "react";
import "./index.css";
import CertificateForm from "../components/CertificateForm";

export default function Main() {
  const [certificateData, setCertificateData] = useState({ name: "", certificateNumber: "" });

  const handleGenerate = (data) => {
    setCertificateData(data);
  };

  return (
    <div className="main-container">
      <div className="imac">
        <div className="rectangle" />
        <div className="rectangle-1" />
        <div className="group">
          <span className="nft-certificate">NFT Certificate</span>
          <div className="group-2">
            <div className="form-group">
              <span className="no-certificate">No. Certificate</span>
              <input type="text" name="certificateNumber" className="certificate-number" value={certificateData.certificateNumber} onChange={(e) => setCertificateData({ ...certificateData, certificateNumber: e.target.value })} />
            </div>
            <div className="form-group">
              <span className="guest-name">Name</span>
              <input type="text" name="name" className="name" value={certificateData.name} onChange={(e) => setCertificateData({ ...certificateData, name: e.target.value })} />
            </div>
          </div>
          <CertificateForm onGenerate={handleGenerate} />
          <button className="component">
            <span className="generate">Generate</span>
            <div className="rectangle-4" />
          </button>
        </div>
      </div>
      <footer className="footer">Made with ❤️ by Dinasti Yudharta Team</footer>
    </div>
  );
}
