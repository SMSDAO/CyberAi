# CyberAi Architecture and Deployment Guide

## Overview

This document provides comprehensive guidance for understanding, cloning, and deploying the CyberAi ecosystem within the SolanaRemix organization.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SolanaRemix Ecosystem                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────┐    ┌─────────────────────────┐  │
│  │  SmartContractAudit    │    │      CyberAi.git        │  │
│  │  (Core Repository)     │───▶│  (Bot Orchestrator)     │  │
│  │                        │    │                         │  │
│  │  - Smart Contract      │    │  - SmartBrain Bot       │  │
│  │    Functions           │    │  - Audit Orchestration  │  │
│  │  - Security Scripts    │    │  - Multi-Bot Coordinator│  │
│  │  - Base Infrastructure │    │  - Workflow Automation  │  │
│  └────────────────────────┘    └─────────────────────────┘  │
│           │                              │                   │
│           │                              │                   │
│           └──────────────┬───────────────┘                   │
│                          ▼                                   │
│              ┌─────────────────────┐                         │
│              │  Unified Workflow   │                         │
│              │  - Git Antivirus    │                         │
│              │  - Audit Actions    │                         │
│              │  - Security Scans   │                         │
│              └─────────────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

## Repository Roles

### SmartContractAudit (This Repository)
- **Purpose**: Core smart contract security infrastructure
- **Contains**:
  - Smart contract auditing scripts
  - Security scanning tools (GitAntivirus)
  - Base SmartBrain orchestrator (master.sh)
  - Documentation and governance
- **Functions**: Provides foundational security tools and infrastructure

### CyberAi.git (Separate Repository)
- **Purpose**: AI-powered bot orchestration and automation
- **Contains**:
  - CyberAi Bot (SmartBrain coordinator)
  - Advanced workflow automation
  - Multi-bot integration layer
  - DAO and governance tools
  - Web interfaces
- **Functions**: Orchestrates all SolanaRemix bots and handles comprehensive audits

## Domain Structure

### Naming Convention
- **Standard Name**: CyberAi (preferred for all new references)
- **Legacy Name**: CuberAi (being phased out for consistency)
- **Domain**: cyberai.network
- **Repository**: cyberai.git or CyberAi (on GitHub)

### Domain Usage
- `cyberai.git` - Primary repository reference
- `cyberai.network` - Production deployment domain
- Email: `*@cyberai.example` (placeholder for security, privacy, etc.)

## Separation of Concerns

### SmartContractAudit (This Repo)
**Stays focused on:**
- Smart contract-specific security functions
- Basic auditing capabilities
- Core security scripts
- GitAntivirus workflow
- Foundation for other tools

**Does NOT handle:**
- Complex multi-bot orchestration
- Advanced AI decision-making
- DAO token distribution
- Production web interfaces

### CyberAi Bot (Separate Repo)
**Handles:**
- All audit orchestration using SmartContractAudit tools
- Multi-bot coordination (calling various SolanaRemix bots as needed)
- Advanced AI-powered analysis and decision-making
- Workflow automation at scale
- DAO governance and token management
- Production deployments

**Architecture:**
- Runs independently but can invoke SmartContractAudit functions
- Coordinates multiple specialized bots
- Provides unified interface for all security operations
- No confusion: SmartContracts stay in SmartContractAudit, CyberAi orchestrates

## PR and Clone Strategy

### Identifying CyberAi-Related PRs

To scan all PRs related to CyberAi launch:

```bash
# List all branches with CyberAi/CuberAi references
git branch -a | grep -i "cyber\|cuber"

# Search commit history
git log --all --oneline | grep -i "cyber\|cuber"

# Find files with CyberAi references
find . -type f \( -name "*.md" -o -name "*.sh" -o -name "*.yml" \) \
  -exec grep -l "CyberAi\|CuberAi\|cyberai" {} \;
```

### Current CyberAi-Related Items in SmartContractAudit

1. **Documentation Files**:
   - `docs/cuberai-setup.md` - Setup documentation
   - `docs/dao/*` - DAO infrastructure docs
   - `docs/partners/*` - Partnership documentation
   - `TRIO.md` - Product/Governance/Security overview
   - `resume.md` - Project overview

2. **Scripts**:
   - `create_cuberai_and_pr.sh` - Repository creation script
   - `scripts/master.sh` - SmartBrain orchestrator

3. **Templates**:
   - Bot templates for extensibility

### Safe Cloning Strategy

#### Option 1: Clone SmartContractAudit First (Recommended)
This is the **safest approach** for understanding the infrastructure:

```bash
# Step 1: Clone the base repository
git clone https://github.com/SolanaRemix/SmartContractAudit.git
cd SmartContractAudit

# Step 2: Review the structure
ls -la
cat docs/cuberai-setup.md
cat TRIO.md

# Step 3: Understand the scripts
cat scripts/master.sh
cat create_cuberai_and_pr.sh

# Step 4: Set up safely (dry-run mode)
cp .env.example .env
echo "DRY_RUN=true" >> .env
chmod +x scripts/*.sh

# Step 5: Test the infrastructure
./scripts/master.sh health
```

#### Option 2: Create CyberAi Repository
Once you understand SmartContractAudit:

```bash
# Review the creation script first
cat create_cuberai_and_pr.sh

# Run in dry-run mode to see what it would do
DRY_RUN=1 ./create_cuberai_and_pr.sh

# When ready, create the actual repository
# (Requires gh CLI and proper authentication)
./create_cuberai_and_pr.sh
```

### Merge Strategy

#### For SmartContractAudit Repository

**DO NOT auto-merge all CyberAi PRs into main.** Instead:

1. **Review Each PR Individually**:
   ```bash
   # List open PRs
   gh pr list
   
   # View specific PR
   gh pr view <PR_NUMBER>
   
   # Check out PR locally for testing
   gh pr checkout <PR_NUMBER>
   ```

2. **Categorize PRs**:
   - **Core Infrastructure**: Merge to main (e.g., GitAntivirus, master.sh)
   - **CyberAi References**: Keep documentation but avoid coupling
   - **Experimental Features**: Review carefully, may go to separate branch

3. **Safe Merge Process**:
   ```bash
   # Checkout main
   git checkout main
   git pull origin main
   
   # Create test branch
   git checkout -b test-merge-pr-X
   
   # Merge PR branch
   git merge <PR_BRANCH>
   
   # Test thoroughly
   DRY_RUN=true ./scripts/master.sh health
   DRY_RUN=true ./scripts/master.sh audit
   
   # If successful, merge to main
   git checkout main
   git merge test-merge-pr-X
   git push origin main
   ```

#### For CyberAi Repository

When CyberAi repository is created:

1. **Keep it separate** from SmartContractAudit
2. **Reference SmartContractAudit** as a dependency
3. **Use git submodules or package references** if needed
4. **Do not duplicate** core smart contract functions

## Workflow Optimization

### Super Workflow for CyberAi Bot

The CyberAi Bot should act as a coordinator:

```yaml
# .github/workflows/cyberai-super-workflow.yml
name: CyberAi Super Workflow

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:

jobs:
  orchestrate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout SmartContractAudit
        uses: actions/checkout@v4
        with:
          repository: SolanaRemix/SmartContractAudit
          path: smart-contract-audit
      
      - name: Checkout CyberAi
        uses: actions/checkout@v4
        with:
          repository: SolanaRemix/CyberAi
          path: cyberai
      
      - name: Setup Environment
        run: |
          cd smart-contract-audit
          chmod +x scripts/*.sh
          cp .env.example .env
          echo "DRY_RUN=true" >> .env
      
      - name: Run SmartBrain Health Check
        run: |
          cd smart-contract-audit
          ./scripts/master.sh health
      
      - name: CyberAi Bot Orchestration
        run: |
          cd cyberai
          # CyberAi bot coordinates all operations
          # Calls SmartContractAudit tools as needed
          ./cyberai-bot.sh orchestrate \
            --audit-repo ../smart-contract-audit \
            --mode dry-run
      
      - name: Aggregate Results
        run: |
          # CyberAi Bot aggregates all results
          cd cyberai
          ./cyberai-bot.sh report
```

### Integration Points

```bash
# CyberAi Bot can call SmartContractAudit functions:

# From CyberAi repository
./cyberai-bot.sh audit --use-smart-contract-audit

# Which internally calls:
# ../SmartContractAudit/scripts/master.sh audit

# CyberAi Bot adds:
# - AI-powered analysis of results
# - Multi-bot coordination
# - Advanced reporting
# - DAO integration
# - Automated remediation
```

## Best Practices

### 1. Always Use Dry-Run First

Always test workflows in dry-run mode before production deployment:

```bash
# Test in dry-run mode
DRY_RUN=true ./scripts/master.sh audit

# Example output:
# [DRY-RUN] Would scan repository: example/repo
# [DRY-RUN] Would check for secrets in: src/, config/
# [DRY-RUN] Would analyze dependencies: package.json
# [DRY-RUN] Would generate report: audit-report.pdf
# ✓ Dry-run completed successfully

# After verification, run in production
DRY_RUN=false ./scripts/master.sh audit
```

### 2. Keep Repositories Decoupled

Maintain clear separation between SmartContractAudit and CyberAi:

```bash
# Directory structure example
/projects
  ├── SmartContractAudit/     # Core security functions
  │   ├── scripts/
  │   │   ├── audit.sh
  │   │   └── master.sh
  │   └── README.md
  │
  └── CyberAi/                 # Orchestration layer
      ├── cyberai-bot.sh
      ├── workflows/
      └── integrations/
          └── smart-contract-audit/  # Reference, not copy
              └── README.md

# In CyberAi, reference SmartContractAudit
# cyberai-bot.sh
SMART_CONTRACT_AUDIT_PATH="../SmartContractAudit"
source "${SMART_CONTRACT_AUDIT_PATH}/scripts/master.sh"
```

### 3. Version Control Best Practices

```bash
# Tag coordinated releases
cd SmartContractAudit
git tag -a v2026.02.09 -m "Security core v2026.02.09"
git push origin v2026.02.09

cd ../CyberAi
git tag -a v2026.02.09 -m "CyberAi orchestrator v2026.02.09"
git push origin v2026.02.09

# Document version compatibility
cat > COMPATIBILITY.md << EOF
# Version Compatibility

| CyberAi | SmartContractAudit | Status |
|---------|-------------------|--------|
| v2026.02.09 | v2026.02.09 | ✅ Compatible |
| v2026.01.01 | v2026.01.01 | ✅ Compatible |
EOF
```

### 4. Documentation Sync

```bash
# Keep TRIO.md in sync between repositories
# scripts/sync-docs.sh

#!/bin/bash
SOURCE_REPO="../SmartContractAudit"
TARGET_REPO="../CyberAi"

# Sync key documents
cp "${SOURCE_REPO}/TRIO.md" "${TARGET_REPO}/TRIO.md"
cp "${SOURCE_REPO}/SECURITY.md" "${TARGET_REPO}/SECURITY.md"

# Update cross-references
sed -i 's/SmartContractAudit/CyberAi/g' "${TARGET_REPO}/TRIO.md"

echo "✅ Documentation synced"
```

## Security Considerations

### 1. No Secrets in Code

Always use environment variables and never commit secrets:

```bash
# Bad - Never do this!
GITHUB_TOKEN="ghp_abc123xyz456"  # ❌ Hardcoded secret

# Good - Use environment variables
export GITHUB_TOKEN="${GITHUB_TOKEN}"  # ✅ From environment

# Create .env file (never commit this)
cat > .env << 'EOF'
GITHUB_TOKEN=ghp_your_token_here
OPENAI_API_KEY=sk-your_key_here
DATABASE_URL=postgresql://user:pass@localhost/db
EOF

# Add to .gitignore
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore
echo "!.env.example" >> .gitignore

# Create example file (safe to commit)
cat > .env.example << 'EOF'
# GitHub Configuration
GITHUB_TOKEN=your_github_token_here

# AI Configuration
OPENAI_API_KEY=your_openai_key_here

# Database
DATABASE_URL=postgresql://localhost/cyberai
EOF
```

### 2. Least Privilege Access

Grant minimal necessary permissions:

```yaml
# GitHub Actions: Minimal permissions
name: Security Scan
on: [push]

permissions:
  contents: read        # Read code
  pull-requests: write  # Comment on PRs
  statuses: write      # Update status checks

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Scan
        run: ./scripts/master.sh audit
```

```javascript
// API token with minimal scopes
const tokenScopes = {
  read: ['repo:public_repo'],     // ✅ Read public repos only
  write: ['gist'],                 // ✅ Create gists for reports
  admin: []                         // ❌ No admin access needed
};

// Use dedicated bot accounts
const botUser = {
  username: 'cyberai-bot',
  type: 'bot',
  permissions: 'minimal'
};
```

### 3. Safe Defaults

Always default to safe, non-destructive modes:

```javascript
// Configuration defaults
const DEFAULT_CONFIG = {
  dryRun: true,              // ✅ Dry-run by default
  autoFix: false,            // ✅ No automatic fixes
  requireApproval: true,     // ✅ Human approval required
  maxChanges: 0,             // ✅ No changes allowed
  readOnly: true             // ✅ Read-only mode
};

// Explicit opt-in for production
function runInProductionMode() {
  if (!process.env.PRODUCTION_CONFIRMED) {
    console.error('❌ PRODUCTION_CONFIRMED environment variable required');
    process.exit(1);
  }
  
  if (!process.env.HUMAN_APPROVED) {
    console.error('❌ HUMAN_APPROVED flag required');
    process.exit(1);
  }
  
  // Only then proceed
  config.dryRun = false;
  config.readOnly = false;
}
```

## Troubleshooting

### Issue: Confusion Between SmartContractAudit and CyberAi

**Solution**: Remember the separation:
- **SmartContractAudit**: Smart contract functions stay here
- **CyberAi Bot**: Orchestrates and coordinates, calls SmartContractAudit when needed

### Issue: Which Repository to Clone First?

**Solution**: Clone SmartContractAudit first:
1. It's the foundation
2. CyberAi depends on it
3. Safer to understand core before orchestration

### Issue: Naming Inconsistency (CyberAi vs CuberAi)

**Solution**: Standardize on **CyberAi**:
- Update all new references to use CyberAi
- Phase out CuberAi references gradually
- Document the preferred spelling

## Deployment Checklist

- [ ] Clone SmartContractAudit repository
- [ ] Review documentation (TRIO.md, docs/cuberai-setup.md)
- [ ] Set up environment (DRY_RUN=true)
- [ ] Test SmartBrain orchestrator (./scripts/master.sh health)
- [ ] Review create_cuberai_and_pr.sh script
- [ ] Understand PR structure and merge strategy
- [ ] Create CyberAi repository (if needed)
- [ ] Set up CyberAi Bot orchestration
- [ ] Configure workflow integration
- [ ] Test end-to-end in dry-run mode
- [ ] Deploy to production with monitoring

## Resources

- **SmartContractAudit Repository**: https://github.com/SolanaRemix/SmartContractAudit
- **CyberAi Repository** (when created): https://github.com/SolanaRemix/CyberAi
- **Setup Documentation**: docs/cuberai-setup.md
- **TRIO Framework**: TRIO.md
- **Security Policy**: SECURITY.md

## Summary

**Key Takeaways**:
1. **Clone SmartContractAudit first** - it's the foundation
2. **Keep concerns separated** - SmartContracts in SmartContractAudit, orchestration in CyberAi
3. **Review PRs individually** - don't auto-merge all CyberAi PRs
4. **Use CyberAi Bot for orchestration** - it coordinates all SolanaRemix bots
5. **Always test in dry-run mode** - safety first
6. **Standardize on CyberAi naming** - consistency matters

---

**Last Updated**: 2026-02-09  
**Version**: 2.0.0  
**Maintainer**: SolanaRemix Team

---

## Related Documentation

- [Getting Started Guide](../../getting-started.md) - Setup and first steps
- [Quick Reference](CYBERAI_QUICKREF.md) - Common commands
- [PR Merge Guide](CYBERAI_PR_MERGE_GUIDE.md) - Pull request workflow
- [Setup Guide](cuberai-setup.md) - Detailed deployment instructions
- [SmartBrain Documentation](../smartbrain/README.md) - AI orchestration

---

## See Also

- **Security**: [SECURITY.md](../../SECURITY.md)
- **Contributing**: [CONTRIBUTING.md](../../CONTRIBUTING.md)
- **Governance**: [GOVERNANCE.md](../../GOVERNANCE.md)
- **TRIO Framework**: [TRIO.md](../../TRIO.md)

---

[⬅ Back to Documentation](../../TABLE_OF_CONTENTS.md) | [🏠 Home](../../README.md) | [💬 Discussions](https://github.com/SMSDAO/CyberAi/discussions)
