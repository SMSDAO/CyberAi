"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Code2,
  Activity,
  Terminal,
  Layers,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const apiEndpoints = [
  { method: "GET", path: "/api/auth/session", status: 200, latency: "12ms", uptime: "99.9%" },
  { method: "POST", path: "/api/stripe/checkout", status: 200, latency: "145ms", uptime: "99.7%" },
  { method: "POST", path: "/api/stripe/webhook", status: 200, latency: "38ms", uptime: "100%" },
  { method: "GET", path: "/api/health", status: 200, latency: "5ms", uptime: "100%" },
];

const logEntries = [
  { level: "INFO", message: "Server started on port 3000", time: "10:00:01" },
  { level: "INFO", message: "Connected to database", time: "10:00:01" },
  { level: "WARN", message: "Rate limit approaching for IP 192.168.1.1", time: "10:02:34" },
  { level: "INFO", message: "Stripe webhook received: checkout.session.completed", time: "10:05:12" },
  { level: "ERROR", message: "Failed to fetch contract ABI: timeout", time: "10:07:45" },
  { level: "INFO", message: "Cache cleared successfully", time: "10:10:00" },
];

const deployments = [
  { env: "Production", status: "healthy", version: "v1.0.0", updated: "2 hours ago" },
  { env: "Staging", status: "healthy", version: "v1.0.1-rc1", updated: "30 min ago" },
  { env: "Development", status: "building", version: "HEAD", updated: "5 min ago" },
];

const methodColors: Record<string, string> = {
  GET: "text-green-400 bg-green-400/10",
  POST: "text-blue-400 bg-blue-400/10",
  PUT: "text-yellow-400 bg-yellow-400/10",
  DELETE: "text-red-400 bg-red-400/10",
};

const levelColors: Record<string, string> = {
  INFO: "text-cyan-400",
  WARN: "text-yellow-400",
  ERROR: "text-red-400",
  DEBUG: "text-gray-400",
};

export default function DeveloperPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl glow-text-cyan">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card glow className="max-w-md mx-4">
          <CardHeader>
            <CardTitle glow>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Please sign in to access this panel.
            </p>
            <Button variant="glow" onClick={() => (window.location.href = "/")}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Code2 className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl md:text-5xl font-bold glow-text-purple">Developer Console</h1>
        </div>
        <p className="text-gray-400 text-lg">API monitoring, logs, and deployment diagnostics</p>
      </motion.div>

      {/* API Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card glow>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <CardTitle className="glow-text-purple">API Endpoints</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/20 text-gray-400">
                    <th className="text-left py-3 px-2">Method</th>
                    <th className="text-left py-3 px-2">Path</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Latency</th>
                    <th className="text-left py-3 px-2">Uptime</th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints.map((ep, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-800 hover:bg-purple-500/5 transition-colors"
                    >
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded ${methodColors[ep.method] ?? "text-gray-400"}`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-mono text-gray-300">{ep.path}</td>
                      <td className="py-3 px-2">
                        <span className="text-green-400 font-mono">{ep.status}</span>
                      </td>
                      <td className="py-3 px-2 text-purple-400 font-mono">{ep.latency}</td>
                      <td className="py-3 px-2 text-green-400">{ep.uptime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Log Viewer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card glow>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <CardTitle className="glow-text-purple">Log Viewer</CardTitle>
                </div>
                <Button variant="ghost" size="sm" aria-label="Refresh logs">
                  <RefreshCw className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-black/40 rounded-lg p-4 font-mono text-xs space-y-2 max-h-64 overflow-y-auto">
                {logEntries.map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-gray-500">{log.time}</span>
                    <span className={`font-bold w-12 shrink-0 ${levelColors[log.level] ?? "text-gray-400"}`}>
                      {log.level}
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deployment Diagnostics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card glow>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <CardTitle className="glow-text-purple">Deployment Diagnostics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deployments.map((dep, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                  >
                    <div>
                      <p className="font-semibold text-white">{dep.env}</p>
                      <p className="text-xs text-gray-400 font-mono">{dep.version}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        {dep.status === "healthy" ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : dep.status === "building" ? (
                          <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span
                          className={`text-xs capitalize ${
                            dep.status === "healthy"
                              ? "text-green-400"
                              : dep.status === "building"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {dep.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{dep.updated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Environment Variables */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card glow>
          <CardHeader>
            <CardTitle className="glow-text-purple">Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { key: "NEXTAUTH_URL", set: true },
                { key: "NEXTAUTH_SECRET", set: true },
                { key: "GITHUB_ID", set: true },
                { key: "GITHUB_SECRET", set: true },
                { key: "STRIPE_SECRET_KEY", set: false },
                { key: "STRIPE_WEBHOOK_SECRET", set: false },
                { key: "NEXT_PUBLIC_APP_URL", set: true },
                { key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", set: false },
              ].map((env) => (
                <div
                  key={env.key}
                  className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-slate-800 font-mono text-xs"
                >
                  <span className="text-gray-300">{env.key}</span>
                  {env.set ? (
                    <span className="text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Set
                    </span>
                  ) : (
                    <span className="text-yellow-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Not set
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
