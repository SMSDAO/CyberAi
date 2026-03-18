"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Activity,
  Settings,
  FileText,
  AlertTriangle,
  TrendingUp,
  Database,
} from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const systemStats = [
  { label: "Total Users", value: "1,248", icon: Users, color: "text-cyan-400" },
  { label: "Active Sessions", value: "342", icon: Activity, color: "text-green-400" },
  { label: "API Requests / hr", value: "18.4K", icon: TrendingUp, color: "text-purple-400" },
  { label: "DB Connections", value: "24", icon: Database, color: "text-yellow-400" },
];

const recentAuditLogs = [
  { id: 1, action: "User role updated", user: "alice@cyberai.io", role: "Developer", time: "1 min ago" },
  { id: 2, action: "New user registered", user: "bob@cyberai.io", role: "User", time: "5 min ago" },
  { id: 3, action: "Config updated", user: "admin@cyberai.io", role: "Admin", time: "12 min ago" },
  { id: 4, action: "API key generated", user: "charlie@cyberai.io", role: "Developer", time: "30 min ago" },
];

const managedUsers = [
  { id: 1, name: "Alice Chen", email: "alice@cyberai.io", role: "Developer", status: "Active" },
  { id: 2, name: "Bob Nakamura", email: "bob@cyberai.io", role: "User", status: "Active" },
  { id: 3, name: "Charlie Smith", email: "charlie@cyberai.io", role: "Auditor", status: "Active" },
  { id: 4, name: "Diana Park", email: "diana@cyberai.io", role: "User", status: "Inactive" },
];

const roleColors: Record<string, string> = {
  Admin: "text-red-400 bg-red-400/10 border-red-400/30",
  Developer: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  Auditor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  User: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
            <Button variant="glow" onClick={() => router.push("/")}>
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
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl md:text-5xl font-bold glow-text-cyan">Admin Panel</h1>
        </div>
        <p className="text-gray-400 text-lg">System management and control center</p>
      </motion.div>

      {/* System Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {systemStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card glow>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* User Management */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card glow>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle glow>User Management</CardTitle>
                <Button variant="glow" size="sm">
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {managedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                  >
                    <div>
                      <p className="font-semibold text-white text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded border ${roleColors[user.role] ?? "text-gray-400"}`}
                      >
                        {user.role}
                      </span>
                      <span
                        className={`text-xs ${
                          user.status === "Active" ? "text-green-400" : "text-gray-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audit Logs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card glow>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <CardTitle glow>Audit Logs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/20"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{log.action}</p>
                        <p className="text-xs text-gray-400">{log.user}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded border ${roleColors[log.role] ?? "text-gray-400"}`}
                        >
                          {log.role}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Config */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card glow>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              <CardTitle glow>Configuration Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Rate Limiting", value: "1000 req/min", status: "enabled" },
                { label: "Maintenance Mode", value: "Off", status: "disabled" },
                { label: "Debug Logging", value: "Off", status: "disabled" },
                { label: "CSRF Protection", value: "Enabled", status: "enabled" },
                { label: "2FA Enforcement", value: "Optional", status: "partial" },
                { label: "Audit Logging", value: "All Events", status: "enabled" },
              ].map((config) => (
                <div
                  key={config.label}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{config.label}</p>
                    <p className="text-xs text-gray-400">{config.value}</p>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      config.status === "enabled"
                        ? "bg-green-400"
                        : config.status === "partial"
                        ? "bg-yellow-400"
                        : "bg-gray-600"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="glow" size="sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
              <Button variant="ghost" size="sm">
                Reset Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
