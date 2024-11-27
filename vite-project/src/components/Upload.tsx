import React, { useState } from "react";
import { ethers } from "ethers";
import { useReadHealthcareGetRecord } from "../generated"; // Import ABI

const contractAddress = "0x101ffCd65A691BB83D18fD7f31bAD50e7571273A";

const UploadRecord: React.FC = () => {
  const [recordHash, setRecordHash] = useState("");

  const uploadRecord = async () => {
    if (!window.ethereum || !recordHash) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      useReadHealthcareGetRecord.abi,
      await signer
    );

    const tx = await contract.uploadRecord(recordHash);
    await tx.wait();
    alert("Record uploaded successfully!");
    setRecordHash("");
  };

  return (
    <div>
      <h1>Upload Record</h1>
      <input
        type="text"
        value={recordHash}
        onChange={(e) => setRecordHash(e.target.value)}
        placeholder="Enter Record Hash"
        className="text-black"
      />
      <button onClick={uploadRecord}>Upload</button>
    </div>
  );
};

export default UploadRecord;
