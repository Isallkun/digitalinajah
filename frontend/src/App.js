import React, { useState } from "react";
import CertificateForm from "./components/CertificateForm";
import CertificatePreview from "./components/CertificatePreview";
import MintButton from "./components/MintButton";

function App() {
  const [certificateData, setCertificateData] = useState(null);

  const handleGenerate = (data) => {
    // Generate certificate image (mock for now)
    setCertificateData(data);
  };

  const handleMint = async () => {
    // Call backend to mint NFT
    if (certificateData) {
      try {
        const response = await fetch("/api/mint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(certificateData),
        });
        const result = await response.json();
        console.log("Minting result:", result);
      } catch (error) {
        console.error("Error minting NFT:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>NFT Generator Certificate</h1>
      <CertificateForm onGenerate={handleGenerate} />
      {certificateData && <CertificatePreview certificateData={certificateData} />}
      {certificateData && <MintButton onMint={handleMint} />}
    </div>
  );
}

export default App;
