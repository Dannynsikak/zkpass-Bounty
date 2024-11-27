import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GetSecret
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getSecretAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_proxy', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_proof',
        internalType: 'struct Proof',
        type: 'tuple',
        components: [
          { name: 'taskId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schemaId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'validator', internalType: 'address', type: 'address' },
          { name: 'allocatorSignature', internalType: 'bytes', type: 'bytes' },
          { name: 'validatorSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'encryptedData', internalType: 'string', type: 'string' },
    ],
    name: 'assignRecord',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_proof',
        internalType: 'struct Proof',
        type: 'tuple',
        components: [
          { name: 'taskId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schemaId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'validator', internalType: 'address', type: 'address' },
          { name: 'allocatorSignature', internalType: 'bytes', type: 'bytes' },
          { name: 'validatorSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'getRecord',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'patientRecords',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'encryptedRecord',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'RecordAssigned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'encryptedRecord',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'RecordFetched',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Healthcare
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const healthcareAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultAllocator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deleteRecord',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllAttestations',
    outputs: [
      {
        name: '',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'uid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getAttestation',
    outputs: [
      {
        name: '',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_recipient', internalType: 'address', type: 'address' }],
    name: 'getAttestationFromAddress',
    outputs: [
      {
        name: '',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getRecord',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSecret',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_recipient', internalType: 'address', type: 'address' }],
    name: 'isAddressAttested',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_proofAsBytes', internalType: 'bytes', type: 'bytes' },
      { name: 'encryptedData', internalType: 'string', type: 'string' },
    ],
    name: 'storeRecord',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newEncryptedData', internalType: 'string', type: 'string' },
    ],
    name: 'updateRecord',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newSecret', internalType: 'string', type: 'string' }],
    name: 'updateSecret',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_proof',
        internalType: 'struct Proof',
        type: 'tuple',
        components: [
          { name: 'taskId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schemaId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'validator', internalType: 'address', type: 'address' },
          { name: 'allocatorSignature', internalType: 'bytes', type: 'bytes' },
          { name: 'validatorSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_taskId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_schemaId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_validator', internalType: 'address', type: 'address' },
      { name: '_allocatorSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyAllocatorSignature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_taskId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_schemaId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_uHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_publicFieldsHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_validator', internalType: 'address', type: 'address' },
      { name: '_validatorSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyValidatorSignature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RecordDeleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'encryptedData',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'secret',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'RecordStored',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'newEncryptedData',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'RecordUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newSecret',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'SecretUpdated',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProofVerifier
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const proofVerifierAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_defaultAllocator', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultAllocator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_proof',
        internalType: 'struct Proof',
        type: 'tuple',
        components: [
          { name: 'taskId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schemaId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'validator', internalType: 'address', type: 'address' },
          { name: 'allocatorSignature', internalType: 'bytes', type: 'bytes' },
          { name: 'validatorSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_taskId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_schemaId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_validator', internalType: 'address', type: 'address' },
      { name: '_allocatorSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyAllocatorSignature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_taskId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_schemaId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_uHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_publicFieldsHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_validator', internalType: 'address', type: 'address' },
      { name: '_validatorSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyValidatorSignature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link getSecretAbi}__
 */
export const useReadGetSecretundefined = /*#__PURE__*/ createUseReadContract({
  abi: getSecretAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"patientRecords"`
 */
export const useReadGetSecretPatientRecords =
  /*#__PURE__*/ createUseReadContract({
    abi: getSecretAbi,
    functionName: 'patientRecords',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"proxy"`
 */
export const useReadGetSecretProxy = /*#__PURE__*/ createUseReadContract({
  abi: getSecretAbi,
  functionName: 'proxy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link getSecretAbi}__
 */
export const useWriteGetSecretundefined = /*#__PURE__*/ createUseWriteContract({
  abi: getSecretAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"assignRecord"`
 */
export const useWriteGetSecretAssignRecord =
  /*#__PURE__*/ createUseWriteContract({
    abi: getSecretAbi,
    functionName: 'assignRecord',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"getRecord"`
 */
export const useWriteGetSecretGetRecord = /*#__PURE__*/ createUseWriteContract({
  abi: getSecretAbi,
  functionName: 'getRecord',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link getSecretAbi}__
 */
export const useSimulateGetSecretundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: getSecretAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"assignRecord"`
 */
export const useSimulateGetSecretAssignRecord =
  /*#__PURE__*/ createUseSimulateContract({
    abi: getSecretAbi,
    functionName: 'assignRecord',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"getRecord"`
 */
export const useSimulateGetSecretGetRecord =
  /*#__PURE__*/ createUseSimulateContract({
    abi: getSecretAbi,
    functionName: 'getRecord',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link getSecretAbi}__
 */
export const useWatchGetSecretundefined =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: getSecretAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link getSecretAbi}__ and `eventName` set to `"RecordAssigned"`
 */
export const useWatchGetSecretRecordAssigned =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: getSecretAbi,
    eventName: 'RecordAssigned',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link getSecretAbi}__ and `eventName` set to `"RecordFetched"`
 */
export const useWatchGetSecretRecordFetched =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: getSecretAbi,
    eventName: 'RecordFetched',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__
 */
export const useReadHealthcareundefined = /*#__PURE__*/ createUseReadContract({
  abi: healthcareAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"defaultAllocator"`
 */
export const useReadHealthcareDefaultAllocator =
  /*#__PURE__*/ createUseReadContract({
    abi: healthcareAbi,
    functionName: 'defaultAllocator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"getAllAttestations"`
 */
export const useReadHealthcareGetAllAttestations =
  /*#__PURE__*/ createUseReadContract({
    abi: healthcareAbi,
    functionName: 'getAllAttestations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"getAttestation"`
 */
export const useReadHealthcareGetAttestation =
  /*#__PURE__*/ createUseReadContract({
    abi: healthcareAbi,
    functionName: 'getAttestation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"getAttestationFromAddress"`
 */
export const useReadHealthcareGetAttestationFromAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: healthcareAbi,
    functionName: 'getAttestationFromAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"getRecord"`
 */
export const useReadHealthcareGetRecord = /*#__PURE__*/ createUseReadContract({
  abi: healthcareAbi,
  functionName: 'getRecord',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"getSecret"`
 */
export const useReadHealthcareGetSecret = /*#__PURE__*/ createUseReadContract({
  abi: healthcareAbi,
  functionName: 'getSecret',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"isAddressAttested"`
 */
export const useReadHealthcareIsAddressAttested =
  /*#__PURE__*/ createUseReadContract({
    abi: healthcareAbi,
    functionName: 'isAddressAttested',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"owner"`
 */
export const useReadHealthcareOwner = /*#__PURE__*/ createUseReadContract({
  abi: healthcareAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"verify"`
 */
export const useReadHealthcareVerify = /*#__PURE__*/ createUseReadContract({
  abi: healthcareAbi,
  functionName: 'verify',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"verifyAllocatorSignature"`
 */
export const useReadHealthcareVerifyAllocatorSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: healthcareAbi,
    functionName: 'verifyAllocatorSignature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"verifyValidatorSignature"`
 */
export const useReadHealthcareVerifyValidatorSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: healthcareAbi,
    functionName: 'verifyValidatorSignature',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link healthcareAbi}__
 */
export const useWriteHealthcareundefined = /*#__PURE__*/ createUseWriteContract(
  { abi: healthcareAbi },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"deleteRecord"`
 */
export const useWriteHealthcareDeleteRecord =
  /*#__PURE__*/ createUseWriteContract({
    abi: healthcareAbi,
    functionName: 'deleteRecord',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteHealthcareRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: healthcareAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"storeRecord"`
 */
export const useWriteHealthcareStoreRecord =
  /*#__PURE__*/ createUseWriteContract({
    abi: healthcareAbi,
    functionName: 'storeRecord',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteHealthcareTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: healthcareAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"updateRecord"`
 */
export const useWriteHealthcareUpdateRecord =
  /*#__PURE__*/ createUseWriteContract({
    abi: healthcareAbi,
    functionName: 'updateRecord',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"updateSecret"`
 */
export const useWriteHealthcareUpdateSecret =
  /*#__PURE__*/ createUseWriteContract({
    abi: healthcareAbi,
    functionName: 'updateSecret',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link healthcareAbi}__
 */
export const useSimulateHealthcareundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: healthcareAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"deleteRecord"`
 */
export const useSimulateHealthcareDeleteRecord =
  /*#__PURE__*/ createUseSimulateContract({
    abi: healthcareAbi,
    functionName: 'deleteRecord',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateHealthcareRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: healthcareAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"storeRecord"`
 */
export const useSimulateHealthcareStoreRecord =
  /*#__PURE__*/ createUseSimulateContract({
    abi: healthcareAbi,
    functionName: 'storeRecord',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateHealthcareTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: healthcareAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"updateRecord"`
 */
export const useSimulateHealthcareUpdateRecord =
  /*#__PURE__*/ createUseSimulateContract({
    abi: healthcareAbi,
    functionName: 'updateRecord',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link healthcareAbi}__ and `functionName` set to `"updateSecret"`
 */
export const useSimulateHealthcareUpdateSecret =
  /*#__PURE__*/ createUseSimulateContract({
    abi: healthcareAbi,
    functionName: 'updateSecret',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link healthcareAbi}__
 */
export const useWatchHealthcareundefined =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: healthcareAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link healthcareAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchHealthcareOwnershipTransferred =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: healthcareAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link healthcareAbi}__ and `eventName` set to `"RecordDeleted"`
 */
export const useWatchHealthcareRecordDeleted =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: healthcareAbi,
    eventName: 'RecordDeleted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link healthcareAbi}__ and `eventName` set to `"RecordStored"`
 */
export const useWatchHealthcareRecordStored =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: healthcareAbi,
    eventName: 'RecordStored',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link healthcareAbi}__ and `eventName` set to `"RecordUpdated"`
 */
export const useWatchHealthcareRecordUpdated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: healthcareAbi,
    eventName: 'RecordUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link healthcareAbi}__ and `eventName` set to `"SecretUpdated"`
 */
export const useWatchHealthcareSecretUpdated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: healthcareAbi,
    eventName: 'SecretUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3undefined = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3undefined =
  /*#__PURE__*/ createUseWriteContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3undefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnableundefined = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnableundefined = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnableundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: ownableAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableundefined =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ownableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferred =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__
 */
export const useReadProofVerifierundefined =
  /*#__PURE__*/ createUseReadContract({ abi: proofVerifierAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__ and `functionName` set to `"defaultAllocator"`
 */
export const useReadProofVerifierDefaultAllocator =
  /*#__PURE__*/ createUseReadContract({
    abi: proofVerifierAbi,
    functionName: 'defaultAllocator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__ and `functionName` set to `"verify"`
 */
export const useReadProofVerifierVerify = /*#__PURE__*/ createUseReadContract({
  abi: proofVerifierAbi,
  functionName: 'verify',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__ and `functionName` set to `"verifyAllocatorSignature"`
 */
export const useReadProofVerifierVerifyAllocatorSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: proofVerifierAbi,
    functionName: 'verifyAllocatorSignature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__ and `functionName` set to `"verifyValidatorSignature"`
 */
export const useReadProofVerifierVerifyValidatorSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: proofVerifierAbi,
    functionName: 'verifyValidatorSignature',
  })
