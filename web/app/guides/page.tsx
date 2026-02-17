"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Code, Shield, Users, Zap, Database, Github, Rocket } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const guideCategories = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Quick start guides and platform basics",
    guides: [
      { title: "Platform Introduction", time: "5 min", link: "#intro" },
      { title: "Setting Up Your Account", time: "3 min", link: "#setup" },
      { title: "Your First Audit", time: "10 min", link: "#first-audit" },
      { title: "Understanding CYB Tokens", time: "7 min", link: "#cyb-tokens" },
    ],
  },
  {
    icon: Code,
    title: "Smart Contract Security",
    description: "Best practices for secure smart contract development",
    guides: [
      { title: "Common Vulnerabilities", time: "15 min", link: "#vulnerabilities" },
      { title: "Security Patterns", time: "12 min", link: "#patterns" },
      { title: "Audit Checklist", time: "8 min", link: "#checklist" },
      { title: "Testing Strategies", time: "20 min", link: "#testing" },
    ],
  },
  {
    icon: Shield,
    title: "Using the Platform",
    description: "Platform features and functionality",
    guides: [
      { title: "Running Automated Audits", time: "8 min", link: "#audits" },
      { title: "Understanding Reports", time: "10 min", link: "#reports" },
      { title: "CI/CD Integration", time: "15 min", link: "#cicd" },
      { title: "API Documentation", time: "25 min", link: "#api" },
    ],
  },
  {
    icon: Users,
    title: "DAO & Governance",
    description: "Community participation and voting",
    guides: [
      { title: "DAO Overview", time: "6 min", link: "/GOVERNANCE.md" },
      { title: "Creating Proposals", time: "12 min", link: "#proposals" },
      { title: "Voting System", time: "8 min", link: "#voting" },
      { title: "Token Distribution", time: "10 min", link: "#distribution" },
    ],
  },
  {
    icon: Zap,
    title: "Earning & Rewards",
    description: "Maximize your platform earnings",
    guides: [
      { title: "Reward System", time: "8 min", link: "#rewards" },
      { title: "Bonus Programs", time: "7 min", link: "/bonuses" },
      { title: "NFT Benefits", time: "9 min", link: "/nft" },
      { title: "Referral Program", time: "5 min", link: "#referrals" },
    ],
  },
  {
    icon: Database,
    title: "Advanced Topics",
    description: "Deep dives into advanced features",
    guides: [
      { title: "Custom Security Rules", time: "18 min", link: "#custom-rules" },
      { title: "Machine Learning Models", time: "22 min", link: "#ml-models" },
      { title: "Multi-Chain Support", time: "15 min", link: "#multichain" },
      { title: "Enterprise Features", time: "20 min", link: "#enterprise" },
    ],
  },
];

const quickLinks = [
  { icon: Github, title: "GitHub Repository", link: "https://github.com/SMSDAO/CyberAi" },
  { icon: BookOpen, title: "Full Documentation", link: "/docs" },
  { icon: Code, title: "API Reference", link: "#api" },
  { icon: Shield, title: "Security Policy", link: "/SECURITY.md" },
];

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-text-cyan">
          Documentation & Guides
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Everything you need to master the CyberAi platform
        </p>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              target={link.link.startsWith("http") ? "_blank" : "_self"}
              rel={link.link.startsWith("http") ? "noopener noreferrer" : ""}
            >
              <Card
                glow={false}
                className="text-center hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <CardContent className="p-6">
                  <link.icon className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white text-sm">{link.title}</h3>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Guide Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {guideCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card glow className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle glow>{category.title}</CardTitle>
                <p className="text-gray-400 text-sm mt-2">{category.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.guides.map((guide, guideIndex) => (
                    <li key={guideIndex}>
                      <a
                        href={guide.link}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 hover:bg-slate-900/60 border border-transparent hover:border-cyan-500/30 transition-all group"
                      >
                        <span className="text-white group-hover:text-cyan-400 transition-colors">
                          {guide.title}
                        </span>
                        <span className="text-xs text-gray-500">{guide.time}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Documentation Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow className="text-center">Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-6 rounded-lg bg-slate-900/40">
                <BookOpen className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Full Documentation</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Comprehensive documentation covering all platform features
                </p>
                <Link
                  href="/docs"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Browse Docs →
                </Link>
              </div>
              <div className="text-center p-6 rounded-lg bg-slate-900/40">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Community Support</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Get help from our active community of developers
                </p>
                <a
                  href="#community"
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Join Community →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Code Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow>Quick Start Example</CardTitle>
            <p className="text-gray-400 text-sm mt-2">
              Run your first security audit with our CLI
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-950 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-cyan-400">
                <code>{`# Install CyberAi CLI
npm install -g @cyberai/cli

# Login with your account
cyberai login

# Run audit on your smart contract
cyberai audit ./contracts/MyContract.sol

# View detailed report
cyberai report --latest

# Export results
cyberai export --format json`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
