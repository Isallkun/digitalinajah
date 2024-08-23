import React from "react";

const CertificatePreview = ({ certificateData }) => {
  return (
    <div>
      <h3>Certificate Preview</h3>
      <div>
        <p>Certificate Number: {certificateData.certificateNumber}</p>
        <p>Name: {certificateData.name}</p>
      </div>
      <button
        onClick={() => {
          /* Logic to download image */
        }}
      >
        Download as Image
      </button>
    </div>
  );
};

export default CertificatePreview;
