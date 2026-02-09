# Merkle Airdrop Process

## Overview

This document explains the merkle tree airdrop mechanism used for efficient and gas-optimized token distribution to DAO participants.

## What is a Merkle Airdrop?

A merkle airdrop uses a merkle tree data structure to:
- **Reduce Gas Costs**: Only root hash stored on-chain
- **Prove Inclusion**: Users prove eligibility with merkle proof
- **Scale Efficiently**: Support thousands of recipients
- **Maintain Transparency**: Full tree publicly verifiable

## Merkle Tree Basics

### Structure

```
            Root Hash
           /         \
      Hash AB      Hash CD
      /    \        /    \
  Hash A Hash B  Hash C Hash D
    |      |       |      |
  User A User B  User C User D
```

### Components

1. **Leaf Nodes**: Individual allocations (address + amount)
2. **Branch Nodes**: Hashes of child nodes
3. **Root Hash**: Single hash representing entire tree
4. **Merkle Proof**: Path from leaf to root

## Distribution Flow

### Phase 1: Data Collection

1. **Snapshot**: Capture contributions at specific time
2. **Scoring**: Calculate scores using [scoring.md](scoring.md)
3. **Allocation**: Convert scores to token amounts
4. **Verification**: Community review period

### Phase 2: Merkle Tree Generation

1. **Format Data**: Create allocation list
   ```json
   {
     "address": "0x1234...",
     "amount": "1000000000000000000",
     "score": 500
   }
   ```

2. **Generate Leaves**: Hash each allocation
   ```javascript
   leaf = keccak256(abi.encodePacked(address, amount))
   ```

3. **Build Tree**: Combine hashes pairwise up to root

4. **Generate Proofs**: Create proof for each leaf

5. **Publish**: Release tree data publicly

### Phase 3: Contract Deployment (If On-Chain)

1. **Deploy Contract**: MerkleDistributor contract
2. **Set Root**: Store merkle root hash
3. **Fund Contract**: Transfer tokens to contract
4. **Verify**: Confirm setup correct
5. **Announce**: Notify eligible claimants

### Phase 4: Claiming

See [claiming.md](claiming.md) for user claiming process.

## Generating Merkle Trees

### Using the Provided Script

We provide a merkle tree generator script:

**Location**: `dao/merkle/generate_merkle.js`

**Usage**:
```bash
# Navigate to merkle directory
cd dao/merkle

# Install dependencies (if needed)
npm install merkletreejs keccak256

# Generate merkle tree from allocations
node generate_merkle.js ../airdrop-sample.json output.json

# Output files:
# - output.json: Complete merkle tree data
# - merkle-root.txt: Root hash for contract
# - merkle-proofs.json: Proofs for each address
```

**Input Format** (`airdrop-sample.json`):
```json
[
  {
    "address": "0x1234567890123456789012345678901234567890",
    "amount": "1000000000000000000000",
    "score": 500,
    "contributions": {
      "prs": 5,
      "issues": 2,
      "reviews": 3
    }
  },
  {
    "address": "0x2345678901234567890123456789012345678901",
    "amount": "500000000000000000000",
    "score": 250,
    "contributions": {
      "prs": 2,
      "docs": 3
    }
  }
]
```

**Output Format** (`output.json`):
```json
{
  "merkleRoot": "0xabcdef1234567890...",
  "totalAllocations": 1500000000000000000000,
  "numberOfRecipients": 2,
  "allocations": [
    {
      "index": 0,
      "address": "0x1234...",
      "amount": "1000000000000000000000",
      "proof": [
        "0xabc123...",
        "0xdef456..."
      ]
    }
  ]
}
```

### Manual Merkle Tree Generation

```javascript
// Example: Generate merkle tree manually
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const { ethers } = require('ethers');

// Step 1: Prepare allocation data
const allocations = [
  { address: '0x1234...', amount: '1000000000000000000000' },
  { address: '0x2345...', amount: '500000000000000000000' },
  { address: '0x3456...', amount: '750000000000000000000' }
];

// Step 2: Create leaf nodes
const leaves = allocations.map((allocation, index) => {
  return ethers.utils.solidityKeccak256(
    ['uint256', 'address', 'uint256'],
    [index, allocation.address, allocation.amount]
  );
});

// Step 3: Build merkle tree
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getRoot().toString('hex');

console.log('Merkle Root:', '0x' + root);

// Step 4: Generate proofs for each allocation
allocations.forEach((allocation, index) => {
  const leaf = leaves[index];
  const proof = tree.getProof(leaf);
  const hexProof = proof.map(x => '0x' + x.data.toString('hex'));
  
  console.log(`\nAllocation ${index}:`);
  console.log(`Address: ${allocation.address}`);
  console.log(`Amount: ${allocation.amount}`);
  console.log(`Proof:`, hexProof);
  
  // Verify proof
  const verified = tree.verify(proof, leaf, root);
  console.log(`Verified: ${verified}`);
});

// Output example:
// Merkle Root: 0xabcdef1234567890...
// 
// Allocation 0:
// Address: 0x1234...
// Amount: 1000000000000000000000
// Proof: ['0xabc123...', '0xdef456...']
// Verified: true
```

### Verifying Merkle Proofs

```javascript
// Verify a merkle proof on-chain (Solidity)
function verifyProof(
    bytes32[] memory proof,
    bytes32 root,
    bytes32 leaf
) public pure returns (bool) {
    bytes32 computedHash = leaf;
    
    for (uint256 i = 0; i < proof.length; i++) {
        bytes32 proofElement = proof[i];
        
        if (computedHash <= proofElement) {
            computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
        } else {
            computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
        }
    }
    
    return computedHash == root;
}

// Verify off-chain (JavaScript)
function verifyProofOffChain(proof, root, leaf) {
  let computedHash = leaf;
  
  for (let i = 0; i < proof.length; i++) {
    const proofElement = proof[i];
    
    if (BigInt(computedHash) <= BigInt(proofElement)) {
      computedHash = ethers.utils.solidityKeccak256(
        ['bytes32', 'bytes32'],
        [computedHash, proofElement]
      );
    } else {
      computedHash = ethers.utils.solidityKeccak256(
        ['bytes32', 'bytes32'],
        [proofElement, computedHash]
      );
    }
  }
  
  return computedHash === root;
}

// Example usage
const allocation = {
  index: 0,
  address: '0x1234...',
  amount: '1000000000000000000000'
};

const leaf = ethers.utils.solidityKeccak256(
  ['uint256', 'address', 'uint256'],
  [allocation.index, allocation.address, allocation.amount]
);

const proof = ['0xabc123...', '0xdef456...'];
const root = '0xabcdef1234567890...';

const isValid = verifyProofOffChain(proof, root, leaf);
console.log('Proof valid:', isValid);
```
  {
    "address": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    "amount": "500000000000000000000",
    "score": 250
  }
]
```

**Output Format** (`output.json`):
```json
{
  "merkleRoot": "0xabc123...",
  "claims": {
    "0x1234...": {
      "index": 0,
      "amount": "1000000000000000000000",
      "proof": ["0xdef456...", "0x789abc..."]
    }
  }
}
```

### Manual Generation

For custom implementations:

**Step 1: Prepare leaves**
```javascript
const leaves = allocations.map((alloc, index) => {
  return ethers.utils.solidityKeccak256(
    ['uint256', 'address', 'uint256'],
    [index, alloc.address, alloc.amount]
  );
});
```

**Step 2: Build tree**
```javascript
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getRoot();
```

**Step 3: Generate proofs**
```javascript
const proof = tree.getHexProof(leaves[index]);
```

## Smart Contract Integration

### Example Solidity Contract

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleDistributor {
    IERC20 public token;
    bytes32 public merkleRoot;
    mapping(address => bool) public claimed;

    event Claimed(address indexed account, uint256 amount);

    constructor(IERC20 _token, bytes32 _merkleRoot) {
        token = _token;
        merkleRoot = _merkleRoot;
    }

    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata merkleProof)
        external
    {
        require(!claimed[account], "Already claimed");

        // Verify merkle proof
        bytes32 node = keccak256(abi.encodePacked(index, account, amount));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), "Invalid proof");

        // Mark as claimed and transfer
        claimed[account] = true;
        require(token.transfer(account, amount), "Transfer failed");

        emit Claimed(account, amount);
    }

    function isClaimed(address account) public view returns (bool) {
        return claimed[account];
    }
}
```

## Off-Chain Alternative

For projects preferring off-chain distribution:

### Process

1. **Generate Merkle Tree**: Same as on-chain
2. **Store Root**: Database or decentralized storage
3. **Verify Claims**: Backend verifies proofs
4. **Distribute**: Direct transfer or claim portal
5. **Record**: Log all distributions

### Benefits

- No gas costs for claiming
- Faster distribution
- More flexible distribution logic
- Easier to handle errors

### Drawbacks

- Requires trust in distributor
- Less transparent
- Centralization risk

## Security Considerations

### Best Practices

1. **Verify All Data**: Review allocations before generation
2. **Test Proofs**: Validate proofs before deployment
3. **Audit Contract**: Have contract audited if on-chain
4. **Use Standard Libraries**: Don't roll your own crypto
5. **Double-Check Root**: Verify merkle root matches data
6. **Backup Data**: Store tree data redundantly

### Common Pitfalls

❌ **Don't**:
- Regenerate tree with same data (hashes may differ)
- Modify allocation list after tree generation
- Lose original tree data
- Skip proof verification testing
- Use weak hashing algorithms

✅ **Do**:
- Keep original allocation data
- Version control tree data
- Test claim process thoroughly
- Document tree generation parameters
- Use established merkle libraries

## Verification Process

### Verify Your Inclusion

1. **Download Tree Data**: Get public merkle data
2. **Find Your Entry**: Search for your address
3. **Verify Proof**: Use verification script
4. **Check Amount**: Confirm allocation matches score

### Verification Script

```javascript
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const { ethers } = require('ethers');

function verifyProof(address, amount, proof, root) {
  const leaf = ethers.utils.solidityKeccak256(
    ['address', 'uint256'],
    [address, amount]
  );
  
  const tree = new MerkleTree([], keccak256, { sortPairs: true });
  return tree.verify(proof, leaf, root);
}

// Example usage
const isValid = verifyProof(
  '0x1234...',
  '1000000000000000000000',
  ['0xabc...', '0xdef...'],
  '0x789...'
);

console.log('Valid proof:', isValid);
```

## Tools and Libraries

### JavaScript/Node.js

- **merkletreejs**: Full-featured merkle tree library
  ```bash
  npm install merkletreejs
  ```

- **ethers.js**: Ethereum utilities and encoding
  ```bash
  npm install ethers
  ```

### Python

- **merkly**: Python merkle tree implementation
  ```bash
  pip install merkly
  ```

### Solidity

- **OpenZeppelin MerkleProof**: Standard implementation
  ```solidity
  import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
  ```

## Testing

### Test Checklist

- [ ] Generate tree with sample data
- [ ] Verify all proofs validate correctly
- [ ] Test invalid proofs are rejected
- [ ] Confirm root hash matches
- [ ] Test claim process end-to-end
- [ ] Verify double-claim prevention
- [ ] Test with various data sizes
- [ ] Validate gas costs (if on-chain)

### Sample Test Data

See `dao/airdrop-sample.json` for example allocations.

## FAQ

**Q: Why use merkle trees instead of a list?**
A: Much more gas-efficient. Storing thousands of addresses on-chain is expensive.

**Q: Can allocations be changed after tree generation?**
A: No. Changing data would change the merkle root, invalidating all proofs.

**Q: What if I lose my proof?**
A: Proofs can be regenerated from the original tree data (publicly available).

**Q: Is the merkle tree data public?**
A: Yes. Full tree data and all proofs are published for transparency.

**Q: Can someone steal my allocation?**
A: No. Proofs are tied to specific addresses. Only you can claim your allocation.

**Q: What if there's an error in my allocation?**
A: Raise during community review period. After tree deployment, corrections require new tree.

## Resources

### Documentation

- [claiming.md](claiming.md) - How to claim your tokens
- [snapshot.md](snapshot.md) - Snapshot process
- [eligibility.md](eligibility.md) - Eligibility criteria

### Tools

- `dao/merkle/generate_merkle.js` - Tree generator script
- `dao/airdrop-sample.json` - Example data

### External Resources

- [MerkleTreeJS Documentation](https://github.com/miguelmota/merkletreejs)
- [OpenZeppelin MerkleProof](https://docs.openzeppelin.com/contracts/4.x/api/utils#MerkleProof)
- [Merkle Tree Explainer](https://en.wikipedia.org/wiki/Merkle_tree)

## Contact

Questions about merkle airdrops?
- **GitHub Discussions**: Technical questions
- **GitHub Issues**: Bug reports
- **Email**: governance@cuberai.example

---

**Version**: 1.0

**Last Updated**: 2026-01-01
