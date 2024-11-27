import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useReadHealthcareGetRecord } from "../generated"; // Import ABI

const contractAddress = "0x101ffCd65A691BB83D18fD7f31bAD50e7571273A";

const Dashboard: React.FC = () => {
  const [records, setRecords] = useState<
    { recordHash: string; timestamp: number }[]
  >([]);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        useReadHealthcareGetRecord.abi,
        signer
      );

      const userRecords = await contract.getRecords();
      setRecords(userRecords);
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            Record Hash: {record.recordHash} <br />
            Timestamp: {new Date(record.timestamp * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
