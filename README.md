# CyberAi - AI-Powered Smart Contract Security Platform

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-green.svg)]()
[![Documentation](https://img.shields.io/badge/docs-latest-brightgreen.svg)](docs/)

## 🌟 Overview

**CyberAi** is an advanced AI-powered security platform designed specifically for smart contract auditing and blockchain security. It combines automated security scanning, intelligent vulnerability detection, and comprehensive governance tools to create a safer blockchain ecosystem.

### Mission

To provide cutting-edge, AI-driven security tools that make blockchain development safer, more transparent, and accessible to everyone - from individual developers to enterprise organizations.

## ✨ Key Features

### 🔍 Automated Security Auditing
- **Continuous Scanning**: Real-time monitoring of smart contract code
- **Multi-Chain Support**: Solana, Ethereum, and other blockchain platforms
- **Pattern Recognition**: AI-powered detection of known vulnerabilities
- **Static Analysis**: Deep code inspection without execution

### 🤖 AI-Powered Analysis
- **SmartBrain Bot**: Intelligent orchestration of security workflows
- **Vulnerability Detection**: Machine learning-based threat identification
- **Risk Scoring**: Automated severity assessment
- **Remediation Suggestions**: AI-generated fix recommendations

### 🛡️ GitAntivirus
- **Repository Scanning**: Automated security checks for entire codebases
- **Secret Detection**: Identify exposed credentials and API keys
- **Dependency Analysis**: Third-party package vulnerability scanning
- **CI/CD Integration**: Seamless GitHub Actions workflows

### 🏛️ DAO Governance
- **Decentralized Decision Making**: Community-driven project governance
- **Token-Based Voting**: Contributor recognition and participation
- **Transparent Processes**: Open governance documentation
- **Eligibility Tracking**: Fair contribution-based access

### 🤝 Partnership Program
- **Sponsorship Tiers**: Multiple levels of organizational support
- **Technical Integration**: API access and custom workflows
- **Priority Support**: Dedicated assistance for partners
- **Co-Development**: Collaborative feature development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Git
- GitHub account
- Basic understanding of smart contracts (recommended)

### Web UI Setup

The CyberAi platform includes a production-ready web interface built with Next.js, TypeScript, and Tailwind CSS.

```bash
# Navigate to the web directory
cd web

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration:
# - GITHUB_ID and GITHUB_SECRET for OAuth
# - STRIPE_SECRET_KEY for payments
# - NEXTAUTH_SECRET for authentication

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The web UI will be available at `http://localhost:3000` with the following features:
- 🎨 **NEO Glow Design**: Futuristic dark theme with digital glow effects
- 🔐 **GitHub Authentication**: Sign in with your GitHub account
- 📊 **User Dashboard**: Track your levels, earnings, and airdrop status
- 💳 **Stripe Payments**: Subscription management and payment processing
- 🎁 **NFT Minting**: Collect platform NFTs with special benefits
- 📚 **Guides & Documentation**: Comprehensive platform guides

### Installation

```bash
# Clone the repository
git clone https://github.com/SMSDAO/CyberAi.git
cd CyberAi

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run initial setup
npm run setup

# Start in dry-run mode (safe, non-destructive)
npm run audit:dry-run
```

### Basic Usage

```bash
# Run security audit on a repository
cyberai audit --repo <repository-url>

# Scan for secrets and vulnerabilities
cyberai scan --path ./contracts

# Generate security report
cyberai report --format pdf --output report.pdf

# Health check
cyberai health
```

## 🖥️ Web Platform

### Modern Web Interface

CyberAi features a production-ready web platform built with modern technologies:

**Tech Stack:**
- ⚡ Next.js 16 with App Router and TypeScript
- 🎨 Tailwind CSS v4 with custom NEO glow theme
- 🔐 NextAuth.js for GitHub OAuth authentication
- 💳 Stripe integration for payments
- 🎭 Framer Motion for animations
- 📱 Fully responsive design

**Key Features:**
- **Landing Page**: High-conversion page with modern animations
- **Dashboard**: User levels, earning points, and airdrop status
- **Pricing**: Subscription tiers with Stripe checkout
- **Bonuses**: Comprehensive reward system
- **NFT Mint**: Platform NFT minting interface
- **Guides**: Complete documentation and tutorials

**UI Preview**

UI preview coming soon.

### Deployment

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd web
vercel

# Production deployment
vercel --prod
```

**Environment Variables for Production:**
- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GITHUB_ID` / `GITHUB_SECRET`: GitHub OAuth app credentials
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret

## 📚 Documentation

Comprehensive documentation is available in the [docs/](docs/) directory:

### Quick Start & Guides
- **[Getting Started Guide](docs/getting-started.md)** - Detailed setup, configuration, and first steps with examples
- **[Quick Reference](docs/audit/CYBERAI_QUICKREF.md)** - Common commands and workflows at a glance
- **[Full Documentation Index](TABLE_OF_CONTENTS.md)** - Complete documentation map with all resources

### Core Concepts
- **[Architecture Overview](docs/audit/CYBERAI_ARCHITECTURE.md)** - System design, components, and integration patterns
- **[SmartBrain AI](docs/smartbrain/README.md)** - AI-powered orchestration and automation
- **[TRIO Framework](TRIO.md)** - Product · Governance · Security overview

### Governance & Community
- **[DAO Documentation](docs/dao/README.md)** - Community governance, eligibility, and participation
- **[Partner Guide](docs/partners/README.md)** - Sponsorship tiers and integration options
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute code, docs, and more

### Policies & Security
- **[Security Policy](SECURITY.md)** - Vulnerability reporting and security practices
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines and expectations
- **[Privacy Policy](PRIVACY.md)** - Data protection and privacy commitments

## 🏗️ Architecture

CyberAi is built with a modular, scalable architecture:

```
┌─────────────────────────────────────────────┐
│         CyberAi Platform                     │
├─────────────────────────────────────────────┤
│                                              │
│  ┌──────────────┐      ┌─────────────────┐ │
│  │  Web UI      │──────│  SmartBrain     │ │
│  │  (Next.js)   │      │  Bot            │ │
│  └──────────────┘      └─────────────────┘ │
│         │                      │            │
│         │                      │            │
│  ┌──────▼──────────────────────▼─────────┐ │
│  │      Security Scanner Layer           │ │
│  │  - GitAntivirus  - Static Analysis    │ │
│  │  - Secret Detection - Dependency Scan │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌────────────────────────────────────────┐│
│  │        Integration Layer               ││
│  │  - GitHub Actions  - CI/CD Pipelines  ││
│  │  - Webhooks  - API Endpoints          ││
│  └────────────────────────────────────────┘│
│                                             │
│  ┌────────────────────────────────────────┐│
│  │         Governance & DAO               ││
│  │  - Voting System  - Token Management  ││
│  │  - Contributor Tracking               ││
│  └────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

See [Architecture Documentation](docs/audit/CYBERAI_ARCHITECTURE.md) for details.

## 🔒 Security

Security is our top priority. CyberAi follows industry best practices:

- **Secure by Default**: Dry-run mode enabled by default
- **No Secrets in Code**: Environment-based configuration
- **Least Privilege**: Minimal required permissions
- **Defense in Depth**: Multiple security layers
- **Transparent Auditing**: Comprehensive logging

### Reporting Vulnerabilities

If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md) to report it responsibly.

**Security Contact**: security@cyberai.network

## 🤝 Contributing

We welcome contributions from the community! Here's how to get involved:

1. **Read the [Contributing Guide](CONTRIBUTING.md)**
2. **Check [open issues](https://github.com/SMSDAO/CyberAi/issues)**
3. **Review our [Code of Conduct](CODE_OF_CONDUCT.md)**
4. **Submit a pull request**

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit code patches
- 🎨 Design improvements
- 🧪 Write tests
- 📢 Spread the word

See [GOVERNANCE.md](GOVERNANCE.md) for detailed governance information.

## 🏆 Community & Support

### Get Help

- **GitHub Issues**: [Report bugs and request features](https://github.com/SMSDAO/CyberAi/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/SMSDAO/CyberAi/discussions)
- **Documentation**: [Browse our docs](docs/)
- **Email Support**: support@cyberai.network

### Stay Connected

- **Twitter**: [@CyberAiNetwork](https://twitter.com/CyberAiNetwork)
- **Discord**: [Join our community](https://discord.gg/cyberai)
- **Blog**: [blog.cyberai.network](https://blog.cyberai.network)
- **Newsletter**: [Subscribe for updates](https://cyberai.network/newsletter)

## 💰 Sponsorship

Support CyberAi's development through our sponsorship program and receive exclusive benefits:

### Sponsorship Tiers

| Tier | Monthly | Benefits |
|------|---------|----------|
| 🤝 **Supporter** | $100 | Logo on sponsors page, newsletter mentions |
| 🥉 **Bronze** | $500 | + Priority support, early feature access |
| 🥈 **Silver** | $2,000 | + Dedicated support, co-marketing |
| 🥇 **Gold** | $5,000 | + Custom features, strategic input |
| 💎 **Platinum** | $10,000+ | + Enterprise SLA, white-label options |

**[View Full Tier Details](docs/partners/sponsorship_tiers.md)** | **[Become a Partner](docs/partners/README.md)**

### Why Sponsor?

- ✅ **Support Open Source Security** - Fund development of critical security infrastructure
- ✅ **Demonstrate Leadership** - Show commitment to blockchain security
- ✅ **Gain Visibility** - Recognition across project channels and community
- ✅ **Access Benefits** - Priority support, early features, and custom integrations
- ✅ **Shape the Future** - Influence on roadmap and feature development

See [Partnership Documentation](docs/partners/README.md) for details on how to get started.

## 📜 License

CyberAi is licensed under the [Apache License 2.0](LICENSE).

This means you can:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use for private purposes
- ✅ Use patents granted by contributors

With conditions:
- 📄 Include license and copyright notice
- 📝 State changes made to the code
- 📋 Include a copy of the Apache License

## 🗺️ Roadmap

### Current Focus (Q1 2026)
- ✅ Core platform architecture
- ✅ Basic security scanning
- 🔄 Advanced AI models integration
- 🔄 Multi-chain support expansion

### Upcoming (Q2-Q3 2026)
- 📋 Web dashboard interface
- 📋 Enhanced DAO governance
- 📋 Mobile app development
- 📋 API marketplace

See [RELEASE.md](RELEASE.md) for detailed release plans.

## 📊 Project Stats

- **License**: Apache 2.0
- **Status**: Active Development
- **Language**: JavaScript/Node.js, Shell
- **Platform**: Multi-chain (Solana, Ethereum, etc.)
- **Community**: Growing

## 🙏 Acknowledgments

CyberAi is built by the community, for the community. Special thanks to:

- All our contributors and maintainers
- Sponsors and partners supporting the project
- The broader blockchain security community
- Open source projects we depend on

## 📖 Additional Resources

### Documentation & Guides
- **[TRIO Framework](TRIO.md)**: Product · Governance · Security comprehensive overview
- **[Migration Guide](MIGRATION.md)**: Upgrading between versions safely
- **[Release Notes](RELEASE.md)**: Latest features, updates, and roadmap
- **[Governance Model](GOVERNANCE.md)**: Decision-making and project management

### Policies
- **[Privacy Policy](PRIVACY.md)**: How we protect user data and privacy
- **[Data Retention](DATA_RETENTION.md)**: Data storage and deletion policies
- **[Code of Conduct](CODE_OF_CONDUCT.md)**: Community standards and expectations

### External Resources
- **[GitHub Issues](https://github.com/SMSDAO/CyberAi/issues)**: Bug reports and feature requests
- **[GitHub Discussions](https://github.com/SMSDAO/CyberAi/discussions)**: Community Q&A and ideas
- **[Full Documentation](TABLE_OF_CONTENTS.md)**: Complete documentation index

---

## 🗺️ Navigation

- **New to CyberAi?** Start with the [Getting Started Guide](docs/getting-started.md)
- **Looking for commands?** Check the [Quick Reference](docs/audit/CYBERAI_QUICKREF.md)
- **Want to contribute?** Read the [Contributing Guide](CONTRIBUTING.md)
- **Need support?** Visit [GitHub Discussions](https://github.com/SMSDAO/CyberAi/discussions)
- **Interested in partnering?** See [Partnership Program](docs/partners/README.md)
- **Want to participate in governance?** Explore [DAO Documentation](docs/dao/README.md)

---

**Built with ❤️ by the SMSDAO community**

[Website](https://cyberai.network) · [Documentation](docs/) · [GitHub](https://github.com/SMSDAO/CyberAi) · [Support](https://github.com/SMSDAO/CyberAi/discussions)
