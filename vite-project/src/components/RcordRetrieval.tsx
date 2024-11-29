import React, { useState } from "react";

const RetrieveRecord: React.FC = () => {
  const [record, setRecord] = useState<string | null>(null);

  const handleRetrieve = () => {
    // Call smart contract to fetch the record
    console.log("Retrieving record...");
    setRecord("EncryptedRecord123");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Retrieve Encrypted Record</h2>
      <button
        type="button"
        onClick={handleRetrieve}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Retrieve Record
      </button>
      {record && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p className="text-gray-700">Record: {record}</p>
        </div>
      )}
    </div>
  );
};

export default RetrieveRecord;
