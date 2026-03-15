"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Terminal,
  Shield,
  Zap,
  Settings,
  Users,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const docSections = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Quick start guide, environment setup, and first audit walkthrough.",
    href: "/docs#getting-started",
    color: "text-cyan-400",
    items: ["Installation", "Environment Variables", "First Audit", "Dashboard Overview"],
  },
  {
    icon: Shield,
    title: "Security & Auditing",
    description: "Smart contract scanning, vulnerability detection, and risk scoring.",
    href: "/docs#security",
    color: "text-green-400",
    items: ["Automated Scanning", "Manual Review", "Severity Levels", "Fix Recommendations"],
  },
  {
    icon: Terminal,
    title: "Developer Guide",
    description: "API reference, integration patterns, and SDK documentation.",
    href: "/docs#developer",
    color: "text-purple-400",
    items: ["REST API", "Webhooks", "Authentication", "Rate Limits"],
  },
  {
    icon: Users,
    title: "Admin Guide",
    description: "User management, RBAC configuration, and system settings.",
    href: "/docs#admin",
    color: "text-yellow-400",
    items: ["User Management", "Role Configuration", "Audit Logs", "System Health"],
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Environment variables, deployment configuration, and CI/CD setup.",
    href: "/docs#configuration",
    color: "text-blue-400",
    items: ["Environment Vars", "Vercel Deploy", "Docker Setup", "GitHub Actions"],
  },
  {
    icon: BookOpen,
    title: "Architecture",
    description: "System design, data flow, database schema, and module relationships.",
    href: "/docs#architecture",
    color: "text-pink-400",
    items: ["Tech Stack", "Data Flow", "Database Schema", "Module Map"],
  },
];

const envVars = [
  { key: "NEXTAUTH_URL", description: "Base URL of your application", example: "http://localhost:3000", required: true },
  { key: "NEXTAUTH_SECRET", description: "Secret for signing JWT tokens", example: "generate-with-openssl-rand", required: true },
  { key: "GITHUB_ID", description: "GitHub OAuth App client ID", example: "your-github-client-id", required: true },
  { key: "GITHUB_SECRET", description: "GitHub OAuth App client secret", example: "your-github-client-secret", required: true },
  { key: "STRIPE_SECRET_KEY", description: "Stripe API secret key", example: "sk_live_...", required: false },
  { key: "STRIPE_WEBHOOK_SECRET", description: "Stripe webhook signing secret", example: "whsec_...", required: false },
  { key: "NEXT_PUBLIC_APP_URL", description: "Public app URL for redirects", example: "https://your-domain.com", required: false },
  { key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", description: "Stripe publishable key", example: "pk_live_...", required: false },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-10 h-10 text-cyan-400" />
          <h1 className="text-5xl md:text-6xl font-bold glow-text-cyan">Documentation</h1>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Everything you need to build, deploy, and operate CyberAi
        </p>
      </motion.div>

      {/* Doc Sections Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {docSections.map((section, index) => {
          const sectionId = section.href.split("#")[1] ?? "";
          return (
            <motion.div
              key={section.title}
              id={sectionId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={section.href} className="block h-full">
                <Card glow className="h-full hover:scale-[1.02] transition-transform">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                        <section.icon className={`w-5 h-5 ${section.color}`} />
                      </div>
                      <CardTitle className={section.color} glow={false}>
                        {section.title}
                      </CardTitle>
                    </div>
                    <p className="text-gray-400 text-sm">{section.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                          <ChevronRight className="w-3 h-3 text-cyan-500/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Environment Variables Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
        id="configuration"
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/20 text-gray-400">
                    <th className="text-left py-3 px-2">Variable</th>
                    <th className="text-left py-3 px-2">Description</th>
                    <th className="text-left py-3 px-2">Example</th>
                    <th className="text-left py-3 px-2">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {envVars.map((env) => (
                    <tr key={env.key} className="border-b border-slate-800 hover:bg-cyan-500/5 transition-colors">
                      <td className="py-3 px-2 font-mono text-cyan-400">{env.key}</td>
                      <td className="py-3 px-2 text-gray-300">{env.description}</td>
                      <td className="py-3 px-2 font-mono text-gray-500 text-xs">{env.example}</td>
                      <td className="py-3 px-2">
                        {env.required ? (
                          <span className="text-xs text-red-400 border border-red-400/30 bg-red-400/10 px-2 py-0.5 rounded">
                            Required
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 border border-slate-700 bg-slate-800/50 px-2 py-0.5 rounded">
                            Optional
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Deploy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow>Quick Deploy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Vercel (Recommended)</h4>
                <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1 mb-3">
                  <div><span className="text-cyan-400">$</span> cd web</div>
                  <div><span className="text-cyan-400">$</span> npm install</div>
                  <div><span className="text-cyan-400">$</span> npm run build</div>
                  <div><span className="text-cyan-400">$</span> vercel deploy</div>
                </div>
                <Button variant="glow" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Deploy to Vercel
                </Button>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Local Development</h4>
                <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1 mb-3">
                  <div><span className="text-cyan-400">$</span> cd web</div>
                  <div><span className="text-cyan-400">$</span> cp ../.env.example .env.local</div>
                  <div><span className="text-cyan-400">$</span> npm install</div>
                  <div><span className="text-cyan-400">$</span> npm run dev</div>
                </div>
                <Link
                  href="https://github.com/SMSDAO/CyberAi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-3 py-1.5 text-sm rounded-lg font-semibold transition-all duration-200 bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* External Docs Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-gray-400 mb-4">Looking for more detailed documentation?</p>
        <Link
          href="https://github.com/SMSDAO/CyberAi/tree/main/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-2.5 text-base rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          View Full Docs on GitHub
        </Link>
      </motion.div>
    </div>
  );
}
