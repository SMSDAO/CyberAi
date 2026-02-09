# CyberAi SmartBrain Documentation

## Overview

SmartBrain is the AI-powered orchestration system at the heart of CyberAi. It coordinates security scans, analyzes findings, and provides intelligent recommendations for securing blockchain applications.

## What is SmartBrain?

SmartBrain is an autonomous bot that:

- **Orchestrates** multiple security scanning tools
- **Analyzes** code patterns and vulnerabilities using AI
- **Coordinates** workflows across different blockchain platforms
- **Generates** intelligent security recommendations
- **Automates** remediation where appropriate

## Architecture

```
┌─────────────────────────────────────────┐
│           SmartBrain Core               │
├─────────────────────────────────────────┤
│                                          │
│  ┌────────────────┐  ┌────────────────┐│
│  │  AI Decision   │  │   Workflow     ││
│  │     Engine     │──│  Orchestrator  ││
│  └────────────────┘  └────────────────┘│
│          │                    │         │
│          ▼                    ▼         │
│  ┌────────────────────────────────────┐│
│  │      Security Scanner Layer        ││
│  │  - Static Analysis                 ││
│  │  - Secret Detection                ││
│  │  - Dependency Scanning             ││
│  │  - Pattern Matching                ││
│  └────────────────────────────────────┘│
│                                          │
│  ┌────────────────────────────────────┐│
│  │       Integration Layer            ││
│  │  - GitHub API                      ││
│  │  - Blockchain RPC                  ││
│  │  - External Tools                  ││
│  └────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Key Features

### 1. Intelligent Orchestration

SmartBrain coordinates multiple security tools to provide comprehensive coverage:

```bash
# SmartBrain automatically selects appropriate tools
cyberai smartbrain orchestrate --repo <repository>

# Result: Runs static analysis, secret scanning, dependency checks
```

### 2. AI-Powered Analysis

Uses machine learning to identify vulnerabilities:

- Pattern recognition for known exploits
- Anomaly detection for unusual code patterns
- Risk scoring based on historical data
- False positive reduction

### 3. Multi-Bot Coordination

SmartBrain can coordinate with specialized bots:

```
SmartBrain (Master)
    ├── SolanaScanBot (Solana-specific)
    ├── EthereumAuditBot (Ethereum-specific)
    ├── SecretFinderBot (Credential detection)
    └── DependencyBot (Package analysis)
```

### 4. Automated Workflows

Define custom security workflows:

```yaml
# smartbrain-workflow.yml
name: Comprehensive Security Audit

triggers:
  - on_commit
  - on_pull_request
  - daily_schedule

steps:
  - name: Initial Scan
    action: scan:quick
    
  - name: Deep Analysis
    action: scan:deep
    condition: quick_scan.findings > 0
    
  - name: AI Review
    action: ai:analyze
    model: gpt-4
    
  - name: Generate Report
    action: report:generate
    format: pdf
    
  - name: Auto-Fix
    action: fix:safe
    dry_run: true
```

## Configuration

### Basic Configuration

```javascript
// smartbrain.config.js
module.exports = {
  // AI Model Settings
  ai: {
    provider: 'openai',
    model: 'gpt-4',
    temperature: 0.3,  // Lower = more consistent
    maxTokens: 2000,
  },

  // Orchestration Settings
  orchestration: {
    parallel: true,  // Run scans in parallel
    maxConcurrent: 5,
    timeout: 300,  // seconds
  },

  // Bot Coordination
  bots: {
    enabled: ['solana', 'ethereum', 'secret', 'dependency'],
    priority: 'critical-first',
  },

  // Automation
  automation: {
    autoFix: false,  // Require manual approval
    dryRun: true,
    notifyOn: ['critical', 'high'],
  },
};
```

### Advanced Configuration

See [SmartBrain Configuration Guide](smartbrain-config.md) for advanced options.

## Usage

### Command Line

```bash
# Start SmartBrain orchestration
cyberai smartbrain start

# Run health check
cyberai smartbrain health

# View orchestration status
cyberai smartbrain status

# Stop all running bots
cyberai smartbrain stop

# View logs
cyberai smartbrain logs --follow
```

### Programmatic Usage

```javascript
const { SmartBrain } = require('@cyberai/smartbrain');

// Initialize SmartBrain
const brain = new SmartBrain({
  aiModel: 'gpt-4',
  enableAutoFix: false,
});

// Run orchestrated scan
async function runSecurityScan(repoUrl) {
  try {
    const results = await brain.orchestrate({
      target: repoUrl,
      depth: 'full',
      ai: true,
    });

    console.log(`Findings: ${results.findings.length}`);
    console.log(`Risk Score: ${results.riskScore}/10`);
    
    return results;
  } catch (error) {
    console.error('Scan failed:', error);
  }
}

// Analyze findings with AI
async function analyzeWithAI(code) {
  const analysis = await brain.analyze({
    code: code,
    context: 'smart-contract',
    language: 'rust',
  });
  
  return analysis;
}
```

### API Endpoints

```bash
# Start orchestration via API
POST /api/v1/smartbrain/orchestrate
{
  "repository": "https://github.com/example/repo",
  "depth": "full",
  "ai_enabled": true
}

# Get orchestration status
GET /api/v1/smartbrain/status/:job_id

# Get results
GET /api/v1/smartbrain/results/:job_id
```

## AI Models

### Supported Models

| Model | Provider | Use Case | Speed | Accuracy |
|-------|----------|----------|-------|----------|
| GPT-4 | OpenAI | Deep analysis | Slow | Excellent |
| GPT-3.5-Turbo | OpenAI | Quick scans | Fast | Good |
| Claude-2 | Anthropic | Code review | Medium | Excellent |
| CodeLlama | Meta | Pattern matching | Fast | Good |

### Model Selection

SmartBrain automatically selects the best model based on:

- Scan depth (quick vs. deep)
- Code complexity
- Available API credits
- Response time requirements

## Workflows

### Example: Pull Request Review

```yaml
name: SmartBrain PR Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  smartbrain-review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout PR
        uses: actions/checkout@v3
        
      - name: SmartBrain Analysis
        uses: cyberai/smartbrain-action@v1
        with:
          mode: 'pr-review'
          ai-model: 'gpt-4'
          auto-comment: true
          
      - name: Post Results
        if: always()
        uses: actions/github-script@v6
        with:
          script: |
            const results = require('./smartbrain-results.json');
            await github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: results.summary
            });
```

### Example: Scheduled Audit

```yaml
name: Daily Security Audit

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily

jobs:
  daily-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Full Repository Scan
        uses: cyberai/smartbrain-action@v1
        with:
          mode: 'full-audit'
          ai-model: 'gpt-4'
          generate-report: true
          
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: security-audit
          path: ./audit-report.pdf
```

## Best Practices

### 1. Start with Dry-Run

Always test workflows in dry-run mode:

```bash
cyberai smartbrain orchestrate --dry-run
```

### 2. Use Appropriate AI Models

- **Quick scans**: GPT-3.5-Turbo
- **Deep analysis**: GPT-4 or Claude-2
- **Cost-sensitive**: CodeLlama

### 3. Monitor Resource Usage

SmartBrain can be resource-intensive:

```bash
# Monitor resource usage
cyberai smartbrain metrics

# Limit concurrent operations
cyberai smartbrain config set max-concurrent 3
```

### 4. Review AI Findings

AI can produce false positives. Always review:

```bash
# Review findings with confidence scores
cyberai smartbrain results --min-confidence 0.8
```

## Troubleshooting

### Issue: SmartBrain not starting

```bash
# Check status
cyberai smartbrain health

# View logs
cyberai smartbrain logs --tail 100

# Reset state
cyberai smartbrain reset
```

### Issue: AI API rate limits

```bash
# Configure rate limiting
cyberai smartbrain config set ai.rate-limit 10
cyberai smartbrain config set ai.retry-delay 5000
```

### Issue: Slow performance

```bash
# Use parallel processing
cyberai smartbrain config set orchestration.parallel true

# Reduce scan depth
cyberai smartbrain orchestrate --depth quick
```

## Advanced Topics

- [SmartBrain Architecture](smartbrain-architecture.md)
- [Custom Bot Development](custom-bots.md)
- [AI Model Training](ai-training.md)
- [Performance Optimization](smartbrain-performance.md)

## Contributing

Help improve SmartBrain:

- Report bugs and issues
- Suggest new features
- Contribute code
- Improve documentation

See [Contributing Guide](../CONTRIBUTING.md).

## Resources

- [SmartBrain API Reference](../api-reference.md#smartbrain)
- [Comparison with Alternatives](COMPARISON.md)
- [Example Workflows](https://github.com/SMSDAO/CyberAi-Examples)
- [Community Forum](https://github.com/SMSDAO/CyberAi/discussions)

---

**SmartBrain - Intelligent Security Orchestration** 🧠

[Back to Documentation](../TABLE_OF_CONTENTS.md)
