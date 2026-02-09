# DAO Overview

## Introduction

The SmartContractAudit DAO (Decentralized Autonomous Organization) enables community governance and rewards contributors through a transparent, merit-based system.

## What is the DAO?

The SmartContractAudit DAO is a governance structure that:

- **Rewards Contributors**: Distribute governance tokens based on contributions
- **Enables Voting**: Community voting on proposals and project decisions
- **Distributes Value**: Fair allocation of resources to active participants
- **Ensures Transparency**: All decisions and distributions are public and auditable

## Governance Flow

### 1. Contribution Phase

Contributors participate by:
- Submitting pull requests
- Reviewing code
- Reporting issues
- Writing documentation
- Supporting community members
- Providing security research

See [eligibility.md](eligibility.md) for detailed criteria.

### 2. Scoring Phase

Contributions are scored based on:
- Impact and quality
- Difficulty and complexity
- Timeliness and responsiveness
- Community value

See [scoring.md](scoring.md) for the scoring formula.

### 3. Snapshot Phase

Periodic snapshots capture:
- Eligible contributors
- Contribution scores
- Token allocations
- Voting power distribution

See [snapshot.md](snapshot.md) for snapshot process.

### 4. Airdrop Phase

Token distribution via:
- Merkle tree generation
- On-chain or off-chain claims
- Verification and validation
- Distribution tracking

See [merkle.md](merkle.md) and [claiming.md](claiming.md) for details.

### 5. Governance Phase

Token holders can:
- Vote on proposals
- Submit governance proposals
- Delegate voting power
- Participate in discussions

## Governance Structure

### Snapshot Integration

The DAO uses Snapshot for gasless voting:

- **Platform**: snapshot.org
- **Strategies**: Token-based voting power
- **Proposals**: Community and maintainer submissions
- **Voting**: Gasless, off-chain voting
- **Execution**: Multisig for on-chain actions

See [snapshot.md](snapshot.md) for Snapshot setup.

### Multisig Control

Critical operations require multisig approval:

- **Token Distribution**: Airdrop execution
- **Treasury Management**: Fund allocation
- **Parameter Changes**: Governance updates
- **Emergency Actions**: Security responses

Multisig composition:
- 3-5 core maintainers
- Requires majority approval (e.g., 3-of-5)
- Transparent on-chain operations

## Token Economics

### Token Utility

Governance tokens provide:
- Voting power on proposals
- Access to exclusive features (planned)
- Recognition of contributions
- Potential future benefits

### Distribution Model

- **Contributors**: 70% - Active contributors and maintainers
- **Treasury**: 20% - Project development and operations
- **Ecosystem**: 10% - Partnerships and growth initiatives

### Vesting Schedule

To ensure long-term alignment:
- Immediate: 25% unlocked at claim
- Linear vesting: 75% over 12 months
- Cliff: None (begins vesting immediately)

## Eligibility

### Who Can Participate?

Eligible participants include:
- Code contributors (merged PRs)
- Documentation contributors
- Security researchers (vulnerability reports)
- Community moderators
- Issue reporters (quality issues)
- Code reviewers

See [eligibility.md](eligibility.md) for full criteria.

### Snapshot Dates

Snapshots are taken:
- **Frequency**: Quarterly
- **Announcement**: 2 weeks advance notice
- **Cut-off**: Specific date/time announced
- **Distribution**: Within 30 days of snapshot

## How to Participate

### 1. Start Contributing

Review the contributing guidelines and start making meaningful contributions:

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/CyberAi.git
cd CyberAi

# Create a feature branch
git checkout -b feature/your-contribution

# Make your changes and commit with DCO sign-off
git commit -s -m "Add: Description of your contribution"

# Push and create a pull request
git push origin feature/your-contribution
```

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed guidelines.

### 2. Track Your Contributions

Monitor your contributions to understand your potential DAO eligibility:

```bash
# Check your merged pull requests
# Via GitHub CLI
gh pr list --author @me --state merged --repo SMSDAO/CyberAi

# Count your contributions
gh api repos/SMSDAO/CyberAi/contributors | \
  jq '.[] | select(.login=="YOUR_USERNAME")'
```

Keep track of:
- Merged PRs (check the PR number and date)
- Issue resolutions (issues you reported that led to fixes)
- Documentation improvements (docs PRs merged)
- Security reports (vulnerabilities discovered and reported)

### 3. Verify Eligibility

Check your eligibility using the scoring formula:

```javascript
// Example eligibility calculation
const contributions = {
  mergedPRs: 5,        // 5 merged pull requests
  issuesReported: 2,   // 2 quality issues reported
  codeReviews: 3,      // 3 code reviews completed
  securityFindings: 1  // 1 security vulnerability reported
};

// Scoring weights (see scoring.md for details)
const weights = {
  mergedPRs: 10,
  issuesReported: 5,
  codeReviews: 3,
  securityFindings: 50
};

// Calculate score
const score = (
  contributions.mergedPRs * weights.mergedPRs +
  contributions.issuesReported * weights.issuesReported +
  contributions.codeReviews * weights.codeReviews +
  contributions.securityFindings * weights.securityFindings
);

console.log(`Total Score: ${score} points`);
// Output: Total Score: 126 points
```

See [eligibility.md](eligibility.md) for detailed criteria and [scoring.md](scoring.md) for the complete formula.

### 4. Claim Your Tokens

When airdrop is announced, follow the claiming process:

```bash
# Example claiming workflow (pseudo-code)
# 1. Verify your inclusion in the merkle tree
curl https://api.cyberai.network/dao/merkle/verify \
  -d '{"address":"YOUR_WALLET_ADDRESS"}'

# 2. Get your merkle proof
curl https://api.cyberai.network/dao/merkle/proof \
  -d '{"address":"YOUR_WALLET_ADDRESS"}' \
  > merkle-proof.json

# 3. Submit claim transaction (example for Solana)
solana program invoke \
  --program-id CYBERdaoXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  --function claim \
  --args merkle-proof.json

# 4. Verify token receipt
solana balance YOUR_WALLET_ADDRESS
```

See [claiming.md](claiming.md) for detailed instructions and [merkle.md](merkle.md) for technical details.

### 5. Participate in Governance

Use your tokens to participate in DAO governance:

```bash
# Connect to Snapshot (example)
# 1. Visit https://snapshot.org/#/cyberai.eth

# 2. Connect your wallet (MetaMask, WalletConnect, etc.)

# 3. View active proposals
curl https://hub.snapshot.org/api/proposals \
  -H "Content-Type: application/json" \
  -d '{"space":"cyberai.eth"}'

# 4. Cast your vote
# Use the Snapshot UI or API to vote on active proposals

# 5. Create a proposal (requires minimum token threshold)
# Visit Snapshot UI and follow the proposal creation workflow
```

Example governance proposal structure:
```markdown
## Proposal Title: Add Support for New Blockchain

**Summary**: This proposal requests adding support for [Blockchain Name]

**Motivation**: [Explain why this is important]

**Specification**: 
- Technical requirements
- Timeline estimate
- Resource needs

**Implementation**: [How it will be done]

**Voting Options**: 
- Yes, add support
- No, do not add support
- Abstain
```

## Important Notes

### ⚠️ Current Status

The DAO infrastructure is currently in **planning phase**:

- Documentation is complete
- Tools and scripts are provided
- Actual token distribution has not begun
- Snapshot space to be created
- Token contract to be deployed

### 🔒 Security

- Never share private keys
- Verify contract addresses before claiming
- Use hardware wallets for significant holdings
- Beware of phishing attempts
- Official announcements only via GitHub

### 📋 Legal Disclaimer

Governance tokens are for utility and governance only:
- Not investment securities
- No expectation of profit
- Utility for voting only
- Subject to terms of service

Consult legal and tax professionals regarding token receipt and holdings.

## Resources

### Documentation

- [eligibility.md](eligibility.md) - Who can participate
- [scoring.md](scoring.md) - How contributions are scored
- [merkle.md](merkle.md) - Merkle tree airdrop process
- [snapshot.md](snapshot.md) - Snapshot setup and usage
- [claiming.md](claiming.md) - How to claim tokens

### Tools

- [dao/airdrop-sample.json](../../dao/airdrop-sample.json) - Example allocation data
- [dao/merkle/generate_merkle.js](../../dao/merkle/generate_merkle.js) - Merkle tree generator

### External Links

- Snapshot: https://snapshot.org
- Governance forums: GitHub Discussions
- Community: GitHub Issues

## FAQ

**Q: When will the first airdrop happen?**
A: To be announced. Follow GitHub for updates.

**Q: Can I participate if I'm new?**
A: Yes! Start contributing now. Future snapshots will include your contributions.

**Q: How are contributions valued?**
A: See [scoring.md](scoring.md) for the detailed formula.

**Q: Is this legally compliant?**
A: Consult your own legal and tax advisors. Governance tokens are for utility purposes.

**Q: Can I transfer my tokens?**
A: Token transferability depends on the token contract design (TBD).

## Contact

Questions about the DAO?

- **GitHub Discussions**: Community Q&A
- **GitHub Issues**: Bug reports and suggestions
- **Email**: governance@cuberai.example (placeholder)

---

## Related Documentation

- [Eligibility Criteria](eligibility.md) - Who can participate
- [Scoring Formula](scoring.md) - How contributions are valued
- [Claiming Process](claiming.md) - How to claim tokens
- [Snapshot Integration](snapshot.md) - Governance voting
- [Merkle Distribution](merkle.md) - Technical implementation
- [Contributing Guide](../../CONTRIBUTING.md) - Start contributing

---

## Questions?

- **Eligibility**: See [eligibility.md](eligibility.md)
- **Scoring**: See [scoring.md](scoring.md)
- **Claiming**: See [claiming.md](claiming.md)
- **General Questions**: [GitHub Discussions](https://github.com/SMSDAO/CyberAi/discussions)
- **Governance**: governance@cyberai.example

---

**Status**: Planning Phase

**Last Updated**: 2026-02-09

**Next Review**: Q1 2026

---

[⬅ Back to Documentation](../../TABLE_OF_CONTENTS.md) | [🏠 Home](../../README.md) | [💬 Get Help](https://github.com/SMSDAO/CyberAi/discussions)
