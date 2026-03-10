"use client";

import { motion } from "framer-motion";
import { Gift, Users, Trophy, Zap, Star, TrendingUp } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const bonusPrograms = [
  {
    icon: Gift,
    title: "Referral Bonus",
    reward: "100 CYB per referral",
    description: "Invite friends and earn tokens when they complete their first audit",
    action: "Get Referral Link",
    colorClass: "bg-cyan-500/20",
    iconColorClass: "text-cyan-400",
  },
  {
    icon: Trophy,
    title: "Achievement Rewards",
    reward: "Up to 1,000 CYB",
    description: "Complete milestones and unlock special achievement bonuses",
    action: "View Achievements",
    colorClass: "bg-purple-500/20",
    iconColorClass: "text-purple-400",
  },
  {
    icon: Users,
    title: "DAO Participation",
    reward: "50 CYB per vote",
    description: "Participate in governance and earn rewards for active voting",
    action: "Join DAO",
    colorClass: "bg-green-500/20",
    iconColorClass: "text-green-400",
  },
  {
    icon: Star,
    title: "Quality Bonus",
    reward: "2x multiplier",
    description: "High-quality audits receive double rewards and recognition",
    action: "Learn More",
    colorClass: "bg-yellow-500/20",
    iconColorClass: "text-yellow-400",
  },
  {
    icon: TrendingUp,
    title: "Streak Bonus",
    reward: "+25% bonus",
    description: "Daily login streaks grant increasing token multipliers",
    action: "Start Streak",
    colorClass: "bg-blue-500/20",
    iconColorClass: "text-blue-400",
  },
  {
    icon: Zap,
    title: "Early Adopter",
    reward: "500 CYB",
    description: "Limited time bonus for early platform adopters",
    action: "Claim Now",
    colorClass: "bg-orange-500/20",
    iconColorClass: "text-orange-400",
  },
];

const claimableRewards = [
  { name: "Weekly Login Bonus", amount: 50, expires: "2 days" },
  { name: "First Audit Complete", amount: 200, expires: "Never" },
  { name: "Community Contributor", amount: 150, expires: "5 days" },
];

export default function BonusesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-text-cyan">
          Earn Bonus Rewards
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Maximize your earnings with our comprehensive bonus system
        </p>
      </motion.div>

      {/* Claimable Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow>Ready to Claim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {claimableRewards.map((reward, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-900/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{reward.name}</h3>
                    <p className="text-sm text-gray-400">
                      Expires: {reward.expires}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold glow-text-accent">
                      +{reward.amount} CYB
                    </span>
                    <Button variant="glow" size="sm">
                      Claim
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Total Claimable:</span>
                <span className="text-3xl font-bold glow-text-cyan">
                  {claimableRewards.reduce((sum, r) => sum + r.amount, 0)} CYB
                </span>
              </div>
              <Button variant="glow" className="w-full mt-4" size="lg">
                Claim All Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bonus Programs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {bonusPrograms.map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card glow className="h-full">
              <CardHeader>
                <div className={`w-16 h-16 rounded-lg ${program.colorClass} flex items-center justify-center mb-4`}>
                  <program.icon className={`w-8 h-8 ${program.iconColorClass}`} />
                </div>
                <CardTitle glow>{program.title}</CardTitle>
                <div className="text-2xl font-bold glow-text-accent mb-2">
                  {program.reward}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">{program.description}</p>
                <Button variant="ghost" className="w-full">
                  {program.action}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bonus Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow className="text-center">Loyalty Tiers</CardTitle>
            <p className="text-center text-gray-400 mt-2">
              Progress through tiers to unlock increasing bonus multipliers
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { tier: "Bronze", multiplier: "1.0x", min: 0 },
                { tier: "Silver", multiplier: "1.25x", min: 1000 },
                { tier: "Gold", multiplier: "1.5x", min: 5000 },
                { tier: "Platinum", multiplier: "2.0x", min: 10000 },
              ].map((tier, index) => (
                <div
                  key={tier.tier}
                  className={`text-center p-6 rounded-lg border ${
                    index === 0
                      ? "bg-orange-500/10 border-orange-500/50"
                      : "bg-slate-900/40 border-slate-800"
                  }`}
                >
                  <Trophy
                    className={`w-12 h-12 mx-auto mb-3 ${
                      index === 0 ? "text-orange-400" : "text-gray-600"
                    }`}
                  />
                  <h3 className="font-bold text-white mb-1">{tier.tier}</h3>
                  <p className="text-2xl font-bold glow-text-cyan mb-2">
                    {tier.multiplier}
                  </p>
                  <p className="text-sm text-gray-400">{tier.min}+ CYB earned</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
