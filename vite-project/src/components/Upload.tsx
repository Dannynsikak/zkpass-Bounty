import React, { useState } from "react";

const UploadRecord: React.FC = () => {
  const [data, setData] = useState("");
  const [proof, setProof] = useState("");

  const handleUpload = () => {
    // Logic to upload encrypted data and proof
    console.log("Uploading record...");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Upload Encrypted Record</h2>
      <input
        type="text"
        placeholder="Enter encrypted data"
        className="border w-full p-2 mb-4"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter proof"
        className="border w-full p-2 mb-4"
        value={proof}
        onChange={(e) => setProof(e.target.value)}
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadRecord;
