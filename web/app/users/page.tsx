"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Filter, Search } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useState } from "react";

const allUsers = [
  { id: 1, name: "Alice Chen", email: "alice@cyberai.io", role: "Developer", status: "Active", audits: 45, joined: "Jan 2024" },
  { id: 2, name: "Bob Nakamura", email: "bob@cyberai.io", role: "User", status: "Active", audits: 12, joined: "Feb 2024" },
  { id: 3, name: "Charlie Smith", email: "charlie@cyberai.io", role: "Auditor", status: "Active", audits: 89, joined: "Dec 2023" },
  { id: 4, name: "Diana Park", email: "diana@cyberai.io", role: "User", status: "Inactive", audits: 3, joined: "Mar 2024" },
  { id: 5, name: "Eve Johnson", email: "eve@cyberai.io", role: "Auditor", status: "Active", audits: 67, joined: "Nov 2023" },
  { id: 6, name: "Frank Lee", email: "frank@cyberai.io", role: "Developer", status: "Active", audits: 31, joined: "Jan 2024" },
];

const roleColors: Record<string, string> = {
  Admin: "text-red-400 bg-red-400/10 border-red-400/30",
  Developer: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  Auditor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  User: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
};

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");

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
            <CardTitle glow>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Please sign in to view users.</p>
            <Button variant="glow" onClick={() => (window.location.href = "/")}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filtered = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = allUsers.filter((u) => u.status === "Active").length;
  const inactiveCount = allUsers.filter((u) => u.status === "Inactive").length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl md:text-5xl font-bold glow-text-cyan">Users</h1>
        </div>
        <p className="text-gray-400 text-lg">Platform member directory</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card glow>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-3xl font-bold glow-text-cyan">{allUsers.length}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card glow>
            <div className="flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-3xl font-bold text-green-400">{activeCount}</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card glow>
            <div className="flex items-center gap-3">
              <UserX className="w-8 h-8 text-gray-500" />
              <div>
                <p className="text-gray-400 text-sm">Inactive</p>
                <p className="text-3xl font-bold text-gray-400">{inactiveCount}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* User Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card glow>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle glow>All Members</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    aria-label="Search users"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 text-sm bg-slate-900/60 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <Button variant="ghost" size="sm" aria-label="Filter users">
                  <Filter className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/20 text-gray-400">
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Email</th>
                    <th className="text-left py-3 px-2">Role</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Audits</th>
                    <th className="text-left py-3 px-2">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-800 hover:bg-cyan-500/5 transition-colors"
                    >
                      <td className="py-3 px-2 font-semibold text-white">{user.name}</td>
                      <td className="py-3 px-2 text-gray-400">{user.email}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded border ${roleColors[user.role] ?? "text-gray-400"}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs ${
                            user.status === "Active" ? "text-green-400" : "text-gray-500"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-cyan-400 font-mono">{user.audits}</td>
                      <td className="py-3 px-2 text-gray-400">{user.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
