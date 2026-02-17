import Link from "next/link";
import { Github, Twitter, MessageCircle, Zap } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "NFT Mint", href: "/nft" },
  ],
  Resources: [
    { label: "Documentation", href: "/guides" },
    { label: "Guides", href: "/guides" },
    { label: "API Reference", href: "/guides#api" },
    { label: "Support", href: "#support" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/PRIVACY.md" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Security", href: "/SECURITY.md" },
    { label: "Governance", href: "/GOVERNANCE.md" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/SMSDAO/CyberAi", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/cyberai", label: "Twitter" },
  { icon: MessageCircle, href: "#discord", label: "Discord" },
];

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/30 bg-slate-950/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <Zap className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span className="text-xl font-bold glow-text-cyan">CyberAi</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered security platform for blockchain development.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} CyberAi. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Built with ❤️ for Hackathon 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
