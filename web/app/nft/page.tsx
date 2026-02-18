"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap } from "lucide-react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const nftCollections = [
  {
    id: 1,
    name: "Cyber Guardian",
    description: "Elite security auditor NFT with special platform privileges",
    price: "500 CYB",
    supply: "1000",
    remaining: "247",
    image: "🛡️",
    benefits: [
      "10% bonus on all audits",
      "Priority support access",
      "Exclusive DAO voting power",
      "Early access to features",
    ],
  },
  {
    id: 2,
    name: "Code Sentinel",
    description: "Advanced AI-powered security analyst badge",
    price: "300 CYB",
    supply: "2500",
    remaining: "892",
    image: "🤖",
    benefits: [
      "5% bonus on all audits",
      "Custom profile badge",
      "Advanced analytics access",
    ],
  },
  {
    id: 3,
    name: "Bug Hunter",
    description: "Recognition NFT for vulnerability discoverers",
    price: "150 CYB",
    supply: "5000",
    remaining: "3421",
    image: "🔍",
    benefits: [
      "3% bonus on vulnerability reports",
      "Special community role",
      "Leaderboard highlight",
    ],
  },
];

export default function NFTPage() {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [mintAmount, setMintAmount] = useState(1);

  const handleMint = (nftId: number) => {
    console.log("Minting NFT:", nftId, "Amount:", mintAmount);
    alert(`Minting ${mintAmount} NFT(s). This is a demo - blockchain integration would happen here.`);
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
          Mint Platform NFTs
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Collect exclusive NFTs and unlock special benefits on the platform
        </p>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <Card glow className="cyber-gradient">
          <CardContent className="p-8 text-center">
            <Sparkles className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 glow-text-cyan">
              Limited Edition Collections
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Each NFT provides unique benefits, boosts your earnings, and grants special access to platform features.
              All NFTs are minted on the blockchain and stored in your wallet.
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <p className="text-3xl font-bold glow-text-cyan">8,500</p>
                <p className="text-gray-400">Total Supply</p>
              </div>
              <div>
                <p className="text-3xl font-bold glow-text-accent">4,560</p>
                <p className="text-gray-400">Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-400">3,940</p>
                <p className="text-gray-400">Minted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* NFT Collections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {nftCollections.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              glow
              className="h-full cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedNFT(nft.id)}
            >
              <CardHeader>
                <div className="text-8xl text-center mb-4">{nft.image}</div>
                <CardTitle glow>{nft.name}</CardTitle>
                <p className="text-gray-400 text-sm mt-2">{nft.description}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Price:</span>
                    <span className="font-bold glow-text-cyan">{nft.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Supply:</span>
                    <span className="text-white">{nft.supply}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Remaining:</span>
                    <span className="text-green-400">{nft.remaining}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(1 - parseInt(nft.remaining) / parseInt(nft.supply)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-white mb-2 text-sm">Benefits:</h4>
                  <ul className="space-y-1">
                    {nft.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start">
                        <Zap className="w-3 h-3 text-cyan-400 mr-1 mt-1 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={selectedNFT === nft.id ? mintAmount : 1}
                      onChange={(e) => {
                        setSelectedNFT(nft.id);
                        setMintAmount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)));
                      }}
                      className="w-20 px-3 py-2 bg-slate-900 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    />
                    <Button
                      variant="glow"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMint(nft.id);
                      }}
                    >
                      Mint Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card glow>
          <CardHeader>
            <CardTitle glow className="text-center">How NFT Minting Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="font-bold text-white mb-2">1. Choose Your NFT</h3>
                <p className="text-gray-400 text-sm">
                  Select from our exclusive collections and review the benefits
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-bold text-white mb-2">2. Pay with CYB</h3>
                <p className="text-gray-400 text-sm">
                  Use your earned CYB tokens to mint your NFT
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-bold text-white mb-2">3. Enjoy Benefits</h3>
                <p className="text-gray-400 text-sm">
                  Instantly unlock special perks and bonuses on the platform
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
