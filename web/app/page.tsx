"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Zap, Lock, TrendingUp, Users, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const features = [
  {
    icon: Shield,
    title: "Automated Security Auditing",
    description: "Real-time monitoring and continuous scanning of smart contract code across multiple blockchains.",
  },
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description: "Machine learning-based threat identification with intelligent vulnerability detection.",
  },
  {
    icon: Lock,
    title: "GitAntivirus",
    description: "Automated security checks for entire codebases with secret detection and dependency analysis.",
  },
  {
    icon: TrendingUp,
    title: "Risk Scoring",
    description: "Automated severity assessment and AI-generated fix recommendations.",
  },
  {
    icon: Users,
    title: "DAO Governance",
    description: "Community-driven decision making with token-based voting and transparent processes.",
  },
  {
    icon: Award,
    title: "Rewards & Airdrops",
    description: "Earn CYB tokens through contributions, audits, and platform participation.",
  },
];

const stats = [
  { value: "10K+", label: "Smart Contracts Audited" },
  { value: "500+", label: "Vulnerabilities Found" },
  { value: "50+", label: "Active Contributors" },
  { value: "$2M+", label: "Assets Protected" },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-gradient">
        <div className="absolute inset-0 digital-grid opacity-30" />
        
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 glow-text-cyan"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              AI-Powered Smart Contract Security
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Secure your blockchain projects with cutting-edge AI technology.
              Automated auditing, vulnerability detection, and comprehensive governance.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/dashboard">
                <Button variant="glow" size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/guides">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-950/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold glow-text-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-cyan">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to secure your blockchain projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card glow>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle glow>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 cyber-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text-cyan">
              Ready to Secure Your Smart Contracts?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers building safer blockchain applications
            </p>
            <Link href="/pricing">
              <Button variant="glow" size="lg">
                View Pricing Plans
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
