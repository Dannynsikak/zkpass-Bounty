import { type FormEvent, useEffect, useState } from "react";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import type { Result } from "@zkpass/transgate-js-sdk/lib/types";
import { ethers, Transaction } from "ethers";
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

const contractAddress = "0x9941945A378Ac9b58D6BE283bec71B72E9CCE747";

const Form = () => {
  // States for the app
  const [appId, setAppId] = useState<string>(
    "9af234d9-262f-4ee7-b85a-098d82f1efab"
  );
  const [schemaId, setSchemaId] = useState<string>(
    "a70764f1b4564e0cbfe6d42e276cdc91"
  );
  const [result, setResult] = useState<Result | undefined>(undefined);
  // const [record, setRecord] = useState<string | undefined>("0x");
  const [recordLink, setRecordLink] = useState<string | undefined>(
    "https://sepolia.etherscan.io/"
  );

  const { writeContractAsync, isPending } = useWriteGetSecretAssignRecord();
  const {
    data,
    isPending: isPendingRead,
    refetch,
  } = useReadHealthcareGetSecret({ address: contractAddress });

  // Update record when data changes
  useEffect(() => {
    if (!isPending && !isPendingRead) {
      setRecordLink(data ?? "");
    }
  }, [data, isPending, isPendingRead]);

  // Fetch transaction hash and generate etherscan link
  const getRecordLink = async () => {
    if (!window.ethereum) {
      alert("Ethereum provider not found. Please install MetaMask.");
      return;
    }

    try {
      // const provider = new ethers.BrowserProvider(window.ethereum);

      const transactionHash = Transaction.toString();
      const etherscanLink = `https://sepolia.etherscan.io/tx/${transactionHash}`;
      setRecordLink(etherscanLink);
    } catch (error) {
      console.error("Error fetching transaction hash:", error);
    }
  };

  // Handle form submission
  const requestVerifyMessage = async (
    e: FormEvent,
    appId: string,
    schemaId: string
  ) => {
    e.preventDefault();

    try {
      const connector = new TransgateConnect(appId);
      const isAvailable = await connector.isTransgateAvailable();

      if (!isAvailable) {
        alert(
          "zkPass Transgate is not available. Please install it from the Chrome Web Store."
        );
        return;
      }

      const provider = window.ethereum
        ? new ethers.BrowserProvider(window.ethereum)
        : null;
      const signer = await provider?.getSigner();
      const recipient = await signer?.getAddress();

      if (!recipient) {
        alert("Unable to fetch recipient address. Please connect your wallet.");
        return;
      }

      const res = (await connector.launch(schemaId, recipient)) as Result;
      console.log("Result:", res);

      const validatedResult = connector.verifyProofMessageSignature(
        "evm",
        schemaId,
        res
      );

      if (validatedResult) {
        alert("Proof validated successfully.");
        setResult(res);

        const chainParams: Proof = {
          taskId: ethers.hexlify(
            ethers.toUtf8Bytes(res.taskId)
          ) as `0x${string}`,
          schemaId: ethers.hexlify(
            ethers.toUtf8Bytes(schemaId)
          ) as `0x${string}`,
          uHash: res.uHash as `0x${string}`,
          recipient: recipient as `0x${string}`,
          publicFieldsHash: res.publicFieldsHash as `0x${string}`,
          validator: res.validatorAddress as `0x${string}`,
          allocatorSignature: res.allocatorSignature as `0x${string}`,
          validatorSignature: res.validatorSignature as `0x${string}`,
        };

        await writeContractAsync({
          address: contractAddress,
          args: [chainParams, recipient],
        });

        await refetch();
        await getRecordLink();
      } else {
        alert("Proof validation failed.");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      alert(`Error during verification: ${(error as TransgateError).message}`);
    }
  };

  return (
    <div className="app text-black">
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
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="Your App ID"
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
            value={schemaId}
            onChange={(e) => setSchemaId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="Your Schema ID"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Start Verification
        </button>

        {result && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Verification Result:
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-auto whitespace-pre-wrap break-words">
              {JSON.stringify(result, null, 2)}
            </pre>

            {recordLink && (
              <div className="mt-4 flex items-center space-x-2">
                {recordLink ? (
                  <>
                    <span className="text-gray-700 font-medium">
                      Record Link:
                    </span>
                    <a
                      href={`https://etherscan.io/tx/${recordLink}`} // Replace with the correct Etherscan URL format if needed
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      View Record on Etherscan
                    </a>
                  </>
                ) : (
                  <p className="text-red-500">No Record link available</p>
                )}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
