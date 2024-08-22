import React, { useState } from "react";

const CertificateForm = ({ onGenerate }) => {
  const [name, setName] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ name, certificateNumber });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Certificate Number" value={certificateNumber} onChange={(e) => setCertificateNumber(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Generate Certificate</button>
    </form>
  );
};

export default CertificateForm;
