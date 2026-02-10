# Getting Started with CyberAi

Welcome to CyberAi! This guide will help you get up and running with our AI-powered smart contract security platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.25.0 or higher)
- A **GitHub account** (for repository integration)

### Optional but Recommended
- **Docker** (for containerized deployment)
- **Python 3.8+** (for advanced scripting)
- **Solana CLI** (for Solana-specific features)

## Installation

### Quick Install

```bash
# Clone the repository
git clone https://github.com/SMSDAO/CyberAi.git
cd CyberAi

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit configuration (use your preferred editor)
nano .env

# Run setup script
npm run setup

# Verify installation
npm run health-check
```

### Environment Configuration

Edit your `.env` file with the following required settings:

```bash
# Basic Configuration
NODE_ENV=development
DRY_RUN=true  # Always start in dry-run mode for safety

# GitHub Integration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=your_repository

# Security Settings
ENABLE_SECRET_SCANNING=true
ENABLE_DEPENDENCY_SCANNING=true
ENABLE_STATIC_ANALYSIS=true

# AI Features (Optional)
OPENAI_API_KEY=your_openai_api_key  # For AI-powered analysis
SMARTBRAIN_ENABLED=true

# Logging
LOG_LEVEL=info
LOG_TO_FILE=true
```

## First Steps

### 1. Run a Basic Health Check

```bash
npm run health-check
```

Expected output:
```
✓ Node.js version: v16.14.0
✓ npm version: 7.24.0
✓ Git configuration: OK
✓ Environment variables: Loaded
✓ Database connection: OK
✓ API endpoints: Accessible
✓ CyberAi is ready!
```

### 2. Scan Your First Repository

Start with a dry-run to see what would happen without making changes:

```bash
# Scan a public GitHub repository
cyberai audit --repo https://github.com/example/repo --dry-run

# Scan a local directory
cyberai scan --path ./my-contracts --dry-run
```

### 3. View the Results

```bash
# Display scan results in terminal
cyberai results --latest

# Generate HTML report
cyberai report --format html --output report.html

# Generate PDF report
cyberai report --format pdf --output report.pdf
```

## Common Use Cases

### Use Case 1: CI/CD Integration

Add CyberAi to your GitHub Actions workflow:

```yaml
# .github/workflows/security-scan.yml
name: CyberAi Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      
      - name: Install CyberAi
        run: npm install -g @cyberai/cli
      
      - name: Run Security Scan
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: cyberai audit --repo ${{ github.repository }}
      
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: ./report.html
```

### Use Case 2: Smart Contract Auditing

Audit Solana smart contracts:

```bash
# Audit a Solana program
cyberai audit:solana --program-id YourProgramId123

# Audit Rust source code
cyberai scan:rust --path ./programs/my-program/src

# Generate comprehensive audit report
cyberai report:audit --chain solana --output solana-audit.pdf
```

### Use Case 3: Secret Detection

Scan for exposed secrets and credentials:

```bash
# Scan repository for secrets
cyberai secrets:scan --repo https://github.com/example/repo

# Scan local files
cyberai secrets:scan --path ./

# Scan with custom patterns
cyberai secrets:scan --config ./secret-patterns.yml
```

## Understanding the Output

### Security Levels

CyberAi categorizes findings into severity levels:

- 🔴 **Critical**: Immediate action required (e.g., exposed private keys)
- 🟠 **High**: Should be fixed soon (e.g., known vulnerabilities)
- 🟡 **Medium**: Should be addressed (e.g., deprecated functions)
- 🟢 **Low**: Consider fixing (e.g., code style issues)
- ℹ️ **Info**: For your awareness (e.g., suggestions)

### Sample Output

```
🔍 CyberAi Security Scan Results
================================

Repository: example/smart-contracts
Scan Date: 2026-02-07 20:55:00 UTC
Duration: 45.3 seconds

Findings:
---------
🔴 Critical: 2 issues found
   - Hardcoded private key in config.js:15
   - SQL injection vulnerability in api/users.js:42

🟠 High: 5 issues found
   - Outdated dependency: web3@1.0.0 (CVE-2024-1234)
   - Missing input validation in transfer function
   ...

🟡 Medium: 12 issues found
🟢 Low: 8 issues found
ℹ️ Info: 3 suggestions

Overall Risk Score: 7.5/10 (High Risk)

Recommendations:
- Fix critical issues immediately
- Update vulnerable dependencies
- Add input validation
- Review access controls
```

## Configuration Options

### Basic Configuration

Create a `cyberai.config.js` file in your project root:

```javascript
module.exports = {
  // Scanning options
  scan: {
    enabled: true,
    depth: 'full',  // 'quick', 'standard', or 'full'
    fileTypes: ['*.rs', '*.sol', '*.js', '*.ts'],
    excludePaths: ['node_modules', 'target', 'build'],
  },

  // Security checks
  security: {
    secretScanning: true,
    dependencyScanning: true,
    staticAnalysis: true,
    dynamicAnalysis: false,  // Requires sandbox environment
  },

  // AI features
  ai: {
    enabled: true,
    model: 'gpt-4',
    confidence: 0.8,  // Minimum confidence for AI findings
  },

  // Reporting
  reporting: {
    format: 'html',  // 'html', 'pdf', 'json', 'markdown'
    includeDetails: true,
    includeCodeSnippets: true,
  },
};
```

### Advanced Configuration

For more advanced use cases and detailed configuration options, see the [Architecture Overview](audit/CYBERAI_ARCHITECTURE.md) and [Setup Guide](audit/cuberai-setup.md).

## Troubleshooting

### Common Issues

#### Issue: "GitHub token not found"

**Solution**: Ensure your GitHub personal access token is set:

```bash
# Set in environment
export GITHUB_TOKEN=your_token_here

# Or add to .env file
echo "GITHUB_TOKEN=your_token_here" >> .env
```

#### Issue: "Scan taking too long"

**Solution**: Use quick scan mode for faster results:

```bash
cyberai scan --mode quick --path ./
```

#### Issue: "Permission denied" errors

**Solution**: Check file permissions and ensure you have necessary access:

```bash
# Fix permissions
chmod +x ./cyberai
chmod 755 ./node_modules/.bin/cyberai
```

### Getting Help

If you encounter issues:

1. Check the [README](../README.md) for common solutions
2. Search [existing issues](https://github.com/SMSDAO/CyberAi/issues)
3. Review the [Quick Reference](audit/CYBERAI_QUICKREF.md)
4. Ask in [GitHub Discussions](https://github.com/SMSDAO/CyberAi/discussions)
5. Contact support: support@cyberai.network

## Next Steps

Now that you're up and running, explore more features:

- 📖 Read the [Architecture Overview](audit/CYBERAI_ARCHITECTURE.md)
- 🔍 Learn about [Security Best Practices](../SECURITY.md)
- 🤝 Join the [Community](../CONTRIBUTING.md)
- 🔧 Learn about [SmartBrain AI](smartbrain/README.md)
- 🏛️ Explore [DAO Governance](dao/README.md)

## Best Practices

### Security First

- Always start with `DRY_RUN=true`
- Review results before taking action
- Keep credentials in environment variables, never in code
- Regularly update CyberAi to get latest security definitions

### Continuous Integration

- Integrate CyberAi into your CI/CD pipeline
- Set up automated scans on every commit
- Block merges if critical issues are found
- Generate and archive security reports

### Team Collaboration

- Share configuration files with your team
- Document custom rules and patterns
- Review findings together
- Establish a remediation workflow

## Additional Resources

- [Complete Documentation](../TABLE_OF_CONTENTS.md)
- [Quick Reference](audit/CYBERAI_QUICKREF.md)
- [Architecture Guide](audit/CYBERAI_ARCHITECTURE.md)
- [SmartBrain Documentation](smartbrain/README.md)
- [Examples on GitHub](https://github.com/SMSDAO/CyberAi)

---

**Welcome to the CyberAi community!** 🎉

We're excited to have you here. If you have questions or feedback, please don't hesitate to reach out.

---

## Related Documentation

- [Architecture Overview](audit/CYBERAI_ARCHITECTURE.md) - System design and components
- [Quick Reference](audit/CYBERAI_QUICKREF.md) - Common commands
- [SmartBrain AI](smartbrain/README.md) - AI orchestration system
- [DAO Governance](dao/README.md) - Community governance
- [Partnership Program](partners/README.md) - Sponsorship and collaboration

---

[⬅ Back to Documentation](../../TABLE_OF_CONTENTS.md) | [🏠 Home](../../README.md) | [💬 Get Help](https://github.com/SMSDAO/CyberAi/discussions)
