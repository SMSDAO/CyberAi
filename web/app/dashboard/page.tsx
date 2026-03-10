"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Trophy, Zap, Coins, TrendingUp, Award, Star } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
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
            <CardTitle glow>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Please sign in to access your dashboard
            </p>
            <Button variant="glow" onClick={() => window.location.href = "/"}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock user data - In production, fetch from API
  const userData = {
    level: 12,
    xp: 7500,
    xpToNextLevel: 10000,
    cybTokens: 2450,
    airdropEligible: true,
    airdropAmount: 500,
    totalAudits: 23,
    vulnerabilitiesFound: 147,
    rank: "Elite Auditor",
  };

  const recentActivity = [
    { id: 1, action: "Completed audit", project: "DeFi Protocol X", xp: 250, time: "2 hours ago" },
    { id: 2, action: "Found vulnerability", project: "NFT Marketplace", xp: 150, time: "5 hours ago" },
    { id: 3, action: "DAO vote participated", project: "Governance Proposal #42", xp: 50, time: "1 day ago" },
  ];

  const achievements = [
    { icon: Trophy, title: "First Audit", unlocked: true },
    { icon: Star, title: "100 Vulnerabilities", unlocked: true },
    { icon: Award, title: "Elite Status", unlocked: true },
    { icon: Zap, title: "Speed Demon", unlocked: false },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 glow-text-cyan">
          Welcome back, {session.user?.name || "Cyber Agent"}!
        </h1>
        <p className="text-gray-400 text-lg">Your security journey continues</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card glow>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Level</p>
                <p className="text-3xl font-bold glow-text-cyan">{userData.level}</p>
              </div>
              <Trophy className="w-12 h-12 text-cyan-400" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">XP Progress</span>
                <span className="text-cyan-400">{userData.xp}/{userData.xpToNextLevel}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(userData.xp / userData.xpToNextLevel) * 100}%` }}
                />
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">CYB Tokens</p>
                <p className="text-3xl font-bold glow-text-accent">{userData.cybTokens}</p>
              </div>
              <Coins className="w-12 h-12 text-green-400" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Available for claiming</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card glow>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Audits Completed</p>
                <p className="text-3xl font-bold text-purple-400">{userData.totalAudits}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-400" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">{userData.vulnerabilitiesFound} vulnerabilities found</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card glow>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Rank</p>
                <p className="text-xl font-bold text-yellow-400">{userData.rank}</p>
              </div>
              <Award className="w-12 h-12 text-yellow-400" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Top 5% of auditors</p>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Airdrop Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card glow className="h-full">
            <CardHeader>
              <CardTitle glow>CYB Token Airdrop</CardTitle>
            </CardHeader>
            <CardContent>
              {userData.airdropEligible ? (
                <div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <Zap className="w-24 h-24 text-cyan-400" />
                      <div className="absolute inset-0 blur-2xl bg-cyan-400/50" />
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <p className="text-2xl font-bold glow-text-cyan mb-2">
                      Congratulations! You're Eligible
                    </p>
                    <p className="text-4xl font-bold text-green-400 mb-2">
                      {userData.airdropAmount} CYB
                    </p>
                    <p className="text-gray-400">Ready to claim</p>
                  </div>
                  <Button variant="glow" className="w-full" size="lg">
                    Claim Airdrop
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-400 mb-4">
                    Complete more audits to become eligible for airdrops
                  </p>
                  <Button variant="ghost">Learn More</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card glow className="h-full">
            <CardHeader>
              <CardTitle glow>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start justify-between p-3 rounded-lg bg-slate-900/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1">{activity.action}</p>
                      <p className="text-sm text-gray-400 mb-1">{activity.project}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold">+{activity.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    achievement.unlocked
                      ? "bg-cyan-500/10 border-cyan-500/50 hover:border-cyan-500"
                      : "bg-slate-900/40 border-slate-800 opacity-50"
                  }`}
                >
                  <achievement.icon
                    className={`w-12 h-12 mx-auto mb-2 ${
                      achievement.unlocked ? "text-cyan-400" : "text-gray-600"
                    }`}
                  />
                  <p className="text-sm font-semibold">{achievement.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
