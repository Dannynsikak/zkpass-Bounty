import { useState } from "react";
import { useWriteHealthcareUpdateRecord } from "../generated"; // Adjust path as needed

// Assuming the Proof data is passed as part of the update
interface Proof {
  taskId: string;
  schemaId: string;
  uHash: string;
  recipient: string;
  publicFieldsHash: string;
  validator: string;
  allocatorSignature: string;
  validatorSignature: string;
}

const UpdateRecord: React.FC = () => {
  const [recordHash, setRecordHash] = useState(""); // The new record hash to update
  const [recordId, setRecordId] = useState(""); // The record ID you wish to update
  const [proof, setProof] = useState<Proof | null>(null); // Proof data (ensure you set it)

  const { writeContractAsync, isPending } = useWriteHealthcareUpdateRecord();

  const updateRecord = async () => {
    if (!recordHash || !recordId || !proof) {
      alert("Please provide both record ID, record hash, and proof data");
      return;
    }

    try {
      // Call the contract to update the record with the proof and new hash
      const tx = await writeContractAsync({
        args: [proof, recordHash] as const, // Passing proof and recordHash as arguments to the contract
      });
      console.log("Transaction sent:", tx);

      // Wait for the transaction to be mined
      await tx.wait();

      alert("Record updated successfully!");
      setRecordHash("");
      setRecordId("");
      setProof(null); // Reset proof state after success
    } catch (error) {
      console.error("Error updating record:", error);
      alert("Failed to update the record. Please try again.");
    }
  };

  return (
    <div>
      <h1>Update Record</h1>

      <div>
        <label htmlFor="record-id">Record ID:</label>
        <input
          type="text"
          id="record-id"
          value={recordId}
          onChange={(e) => setRecordId(e.target.value)}
          placeholder="Enter Record ID"
        />
      </div>

      <div>
        <label htmlFor="record-hash">New Record Hash:</label>
        <input
          type="text"
          id="record-hash"
          value={recordHash}
          onChange={(e) => setRecordHash(e.target.value)}
          placeholder="Enter New Record Hash"
        />
      </div>

      <div>
        <label htmlFor="proof">Proof Data:</label>
        <textarea
          id="proof"
          value={proof ? JSON.stringify(proof, null, 2) : ""}
          onChange={(e) => setProof(JSON.parse(e.target.value))}
          placeholder="Enter Proof Data"
        />
      </div>

      <button type="button" onClick={updateRecord} disabled={isPending}>
        {isPending ? "Updating..." : "Update Record"}
      </button>
    </div>
  );
};

export default UpdateRecord;
