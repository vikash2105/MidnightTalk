import React, { useState } from "react";

const Kyc = () => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      alert("KYC uploaded successfully!");
      // Later: send file to backend
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload KYC</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-4 bg-blue-600 px-4 py-2 rounded">Upload</button>
    </div>
  );
};

export default Kyc;
