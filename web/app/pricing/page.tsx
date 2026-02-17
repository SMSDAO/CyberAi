"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const pricingTiers = [
  {
    name: "Free",
    icon: Zap,
    price: "$0",
    period: "forever",
    description: "Perfect for individual developers getting started",
    features: [
      "5 smart contract audits per month",
      "Basic vulnerability scanning",
      "Community support",
      "Public audit reports",
      "GitHub integration",
    ],
    cta: "Get Started",
    popular: false,
    priceId: null,
  },
  {
    name: "Pro",
    icon: Rocket,
    price: "$49",
    period: "per month",
    description: "For professional developers and small teams",
    features: [
      "Unlimited smart contract audits",
      "Advanced AI-powered analysis",
      "Priority support (24h response)",
      "Private audit reports",
      "CI/CD integration",
      "Custom security rules",
      "API access",
      "50 CYB tokens monthly",
    ],
    cta: "Start Free Trial",
    popular: true,
    priceId: "price_pro_monthly",
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "$299",
    period: "per month",
    description: "For organizations requiring comprehensive security",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee (99.9% uptime)",
      "White-label reports",
      "Team collaboration tools",
      "Advanced analytics",
      "Compliance certifications",
      "500 CYB tokens monthly",
      "Early access to new features",
    ],
    cta: "Contact Sales",
    popular: false,
    priceId: "price_enterprise_monthly",
  },
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and cryptocurrency payments through our secure Stripe integration.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "What are CYB tokens?",
    answer: "CYB tokens are our platform's native utility tokens that can be used for governance voting, premium features, and future airdrops.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, Pro and Enterprise plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens if I exceed my audit limit?",
    answer: "On the Free plan, you'll be prompted to upgrade. Pro and Enterprise plans have unlimited audits.",
  },
];

export default function PricingPage() {
  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) {
      // Free plan - just redirect to signup/dashboard
      window.location.href = "/dashboard";
      return;
    }

    // In production, this would call your Stripe checkout API
    console.log("Initiating checkout for:", priceId);
    alert("Stripe checkout would be initiated here. This is a demo.");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 glow-text-cyan">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Choose the plan that fits your security needs. All plans include core features.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </span>
              </div>
            )}
            <Card
              glow={tier.popular}
              className={`h-full flex flex-col ${
                tier.popular ? "border-2 border-cyan-500" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <tier.icon
                    className={`w-12 h-12 ${
                      tier.popular ? "text-cyan-400" : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold glow-text-cyan">{tier.price}</span>
                  <span className="text-gray-400 ml-2">/ {tier.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{tier.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.popular ? "glow" : "ghost"}
                  className="w-full"
                  size="lg"
                  onClick={() => handleCheckout(tier.priceId)}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Features Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow className="text-center">All Plans Include</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400 text-sm">
                  Real-time analysis and instant vulnerability detection
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-bold text-white mb-2">Enterprise Grade</h3>
                <p className="text-gray-400 text-sm">
                  Bank-level security and compliance standards
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-bold text-white mb-2">Continuous Updates</h3>
                <p className="text-gray-400 text-sm">
                  Regular updates with the latest security patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-8 glow-text-cyan">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} glow={false}>
              <CardContent className="p-6">
                <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
