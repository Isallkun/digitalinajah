import React from "react";

const CertificateForm = ({ onGenerate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      certificateNumber: formData.get("certificateNumber"),
      name: formData.get("name"),
    };
    onGenerate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit"></button>
    </form>
  );
};

export default CertificateForm;
