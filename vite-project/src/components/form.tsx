import { type FormEvent, useEffect, useState } from "react";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import type { Result } from "@zkpass/transgate-js-sdk/lib/types";
import { ethers } from "ethers";
import {
  useReadHealthcareGetSecret,
  useWriteGetSecretAssignRecord,
} from "../generated";

export type TransgateError = {
  message: string;
  code: number;
};

export type Proof = {
  taskId: `0x${string}`;
  schemaId: `0x${string}`;
  uHash: `0x${string}`;
  recipient: `0x${string}`;
  publicFieldsHash: `0x${string}`;
  validator: `0x${string}`;
  allocatorSignature: `0x${string}`;
  validatorSignature: `0x${string}`;
};

const contractAddress = "0xAd0842bEc05F5f3AC8E456e25fA0Ee1E5afe7EF4";

const Form = () => {
  let chainParams: Proof = {
    taskId: "0x",
    schemaId: "0x",
    uHash: "0x",
    recipient: "0x",
    publicFieldsHash: "0x",
    validator: "0x",
    allocatorSignature: "0x",
    validatorSignature: "0x",
  };
  const [appId, setAppId] = useState<string>(
    "9af234d9-262f-4ee7-b85a-098d82f1efab"
  );
  const [schemaId, setSchemaId] = useState<string>(
    "a70764f1b4564e0cbfe6d42e276cdc91"
  );
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [secret, setSecret] = useState<string | undefined>("0x");
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    return localStorage.getItem("isVerified") === "true";
  });
  const { writeContractAsync, isPending } = useWriteGetSecretAssignRecord();
  const {
    data,
    isPending: isPendingRead,
    refetch,
  } = useReadHealthcareGetSecret({
    address: contractAddress,
  });

  useEffect(() => {
    if (!isPending || !isPendingRead) {
      setSecret(data ?? "");
    }
  }, [isPending, isPendingRead, data]);

  const requestVerifyMessage = async (
    e: FormEvent,
    appId: string,
    schemaId: string
  ) => {
    e.preventDefault();
    try {
      const connector = new TransgateConnect(appId);
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const provider = window.ethereum
          ? new ethers.BrowserProvider(window.ethereum)
          : null;
        const signer = await provider?.getSigner();
        const recipient = await signer?.getAddress();
        const res = (await connector.launch(schemaId, recipient)) as Result;
        console.log("Result", res);

        // Verifying the proof's message signatures
        const validatedResult = connector.verifyProofMessageSignature(
          "evm",
          schemaId,
          res
        );

        if (validatedResult) {
          alert("Validated Result");
          console.log(res);
          setResult(res);
          setIsVerified(true); // Set verification status to true
          localStorage.setItem("isVerified", "true"); // Save verification status to local storage

          // Constructing the proof parameters
          const taskId = ethers.hexlify(
            ethers.toUtf8Bytes(res.taskId)
          ) as `0x${string}`;
          const schemaIdHex = ethers.hexlify(
            ethers.toUtf8Bytes(schemaId)
          ) as `0x${string}`;

          if (recipient) {
            chainParams = {
              taskId,
              schemaId: schemaIdHex,
              uHash: res.uHash as `0x${string}`,
              recipient: recipient as `0x${string}`,
              publicFieldsHash: res.publicFieldsHash as `0x${string}`,
              validator: res.validatorAddress as `0x${string}`,
              allocatorSignature: res.allocatorSignature as `0x${string}`,
              validatorSignature: res.validatorSignature as `0x${string}`,
            };

            // Assuming the second element is a string identifier (could be tx hash, or another string)
            const stringIdentifier =
              "0x029f72fa1416ccd173badd841e00cf85b3df3812b89ab5a01d9308eb64551cb2"; // Replace with your actual string

            // Writing the proof to the contract
            await writeContractAsync({
              address: contractAddress,
              args: [chainParams, stringIdentifier],
            });

            // Refetch data after writing
            await refetch();
          }
        }
      } else {
        console.log(
          "Please install zkPass Transgate from https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma"
        );
      }
    } catch (error) {
      const transgateError = error as TransgateError;
      alert(`Transgate Error: ${transgateError.message}`);
      console.log(transgateError);
    }
  };

  return (
    <div className="app text-black">
      {isVerified ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Verification Result:
          </h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-auto whitespace-pre-wrap break-words">
            {JSON.stringify(result, null, 2)}
          </pre>
          <h1 className="mt-4 text-xl text-gray-800">Secret: {secret}</h1>
        </div>
      ) : (
        <form
          className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4"
          onSubmit={(e) => requestVerifyMessage(e, appId, schemaId)}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Verification Form
          </h2>

          <div>
            <label
              htmlFor="app-id"
              className="block text-gray-700 font-medium mb-2"
            >
              AppId:
            </label>
            <input
              id="app-id"
              type="text"
              placeholder="Your App ID"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="schema-id"
              className="block text-gray-700 font-medium mb-2"
            >
              SchemaId:
            </label>
            <input
              id="schema-id"
              type="text"
              placeholder="Your Schema ID"
              value={schemaId}
              onChange={(e) => setSchemaId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start Verification
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
