"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Palette, Globe } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useState } from "react";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "localization", label: "Localization", icon: Globe },
];

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [activeSection, setActiveSection] = useState("profile");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [auditAlerts, setAuditAlerts] = useState(true);
  const [newsletterNotifs, setNewsletterNotifs] = useState(false);

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
            <p className="text-gray-400 mb-4">Please sign in to manage settings.</p>
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
          <Settings className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl md:text-5xl font-bold glow-text-cyan">Settings</h1>
        </div>
        <p className="text-gray-400 text-lg">Manage your account preferences</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card glow>
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                      : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </Card>
        </motion.div>

        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          {activeSection === "profile" && (
            <Card glow>
              <CardHeader>
                <CardTitle glow>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                      {session.user?.name?.[0] ?? "U"}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{session.user?.name ?? "User"}</p>
                      <p className="text-gray-400 text-sm">{session.user?.email ?? ""}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                      <input
                        type="text"
                        defaultValue={session.user?.name ?? ""}
                        className="w-full px-4 py-2 bg-slate-900/60 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={session.user?.email ?? ""}
                        className="w-full px-4 py-2 bg-slate-900/60 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>
                  <Button variant="glow" size="md">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "notifications" && (
            <Card glow>
              <CardHeader>
                <CardTitle glow>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Email Notifications", desc: "Receive important updates via email", value: emailNotifs, set: setEmailNotifs },
                    { label: "Audit Alerts", desc: "Get notified when audits complete", value: auditAlerts, set: setAuditAlerts },
                    { label: "Newsletter", desc: "Weekly platform updates and news", value: newsletterNotifs, set: setNewsletterNotifs },
                  ].map((notif) => (
                    <div
                      key={notif.label}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-900/40 border border-slate-800"
                    >
                      <div>
                        <p className="text-white font-semibold">{notif.label}</p>
                        <p className="text-sm text-gray-400">{notif.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => notif.set(!notif.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notif.value ? "bg-cyan-500" : "bg-slate-700"
                        }`}
                        role="switch"
                        aria-checked={notif.value}
                        aria-label={`Toggle ${notif.label}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notif.value ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                  <Button variant="glow" size="md">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "security" && (
            <Card glow>
              <CardHeader>
                <CardTitle glow>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800">
                    <p className="text-white font-semibold mb-1">Authentication Method</p>
                    <p className="text-sm text-gray-400 mb-3">
                      Currently signed in via GitHub OAuth
                    </p>
                    <Button variant="ghost" size="sm">
                      Manage OAuth Apps
                    </Button>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800">
                    <p className="text-white font-semibold mb-1">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400 mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="glow" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800">
                    <p className="text-white font-semibold mb-1">Active Sessions</p>
                    <p className="text-sm text-gray-400 mb-3">1 active session</p>
                    <Button variant="ghost" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-400/10">
                      Revoke All Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(activeSection === "appearance" || activeSection === "localization") && (
            <Card glow>
              <CardHeader>
                <CardTitle glow>
                  {activeSection === "appearance" ? "Appearance" : "Localization"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  {activeSection === "appearance"
                    ? "Theme customization coming soon. Currently using the Neo-Glow dark theme."
                    : "Language and region settings coming soon."}
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
