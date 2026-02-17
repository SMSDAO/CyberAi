# CyberAi Web Platform

Production-ready web interface for the CyberAi smart contract security platform.

## 🌟 Features

- **NEO Glow Design**: Futuristic dark theme with digital glow effects and animations
- **GitHub Authentication**: Secure OAuth integration with NextAuth.js
- **User Dashboard**: Track levels, XP, CYB tokens, and airdrop eligibility
- **Subscription Management**: Stripe-powered payment processing
- **NFT Minting**: Platform NFT collection with special benefits
- **Bonus System**: Comprehensive rewards and referral programs
- **Responsive Design**: Mobile-first, works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or higher
- npm or yarn
- GitHub OAuth app (for authentication)
- Stripe account (for payments)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your credentials
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=CyberAi

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# GitHub OAuth (create at https://github.com/settings/developers)
GITHUB_ID=your-github-oauth-app-id
GITHUB_SECRET=your-github-oauth-app-secret

# Stripe (get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
web/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # User dashboard
│   ├── pricing/           # Pricing page
│   ├── bonuses/           # Bonus rewards
│   ├── nft/               # NFT minting
│   ├── guides/            # Documentation
│   └── api/               # API routes
│       ├── auth/          # NextAuth
│       └── stripe/        # Stripe integration
├── components/            # React components
│   ├── ui/               # UI primitives (Button, Card)
│   └── layout/           # Layout components (Header, Footer)
├── lib/                  # Utilities and helpers
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎨 Design System

### Theme

The platform uses a custom NEO glow theme with:
- Dark background (#0a0a0f)
- Cyan primary (#00ffff)
- Purple secondary (#8b5cf6)
- Accent green (#00ff88)
- Digital grid pattern background
- Animated gradient effects
- Glow text and borders

### Components

**UI Components:**
- `Button`: Multiple variants (default, primary, ghost, glow)
- `Card`: Reusable card with optional glow effect
- `CardHeader`, `CardTitle`, `CardContent`: Card sub-components

**Layout Components:**
- `Header`: Responsive navigation with auth
- `Footer`: Site footer with links
- `Providers`: Authentication and session provider

## 🔐 Authentication

Uses NextAuth.js with GitHub OAuth provider:

```typescript
// Sign in
import { signIn } from "next-auth/react";
signIn("github");

// Sign out
import { signOut } from "next-auth/react";
signOut();

// Get session
import { useSession } from "next-auth/react";
const { data: session } = useSession();
```

## 💳 Stripe Integration

### Checkout Flow

1. User selects a pricing plan
2. Frontend calls `/api/stripe/checkout` with priceId
3. Redirects to Stripe Checkout
4. User completes payment
5. Webhook handles subscription creation
6. User redirected to dashboard

### Webhook Setup

```bash
# Test webhooks locally with Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables

Configure these in your Vercel project settings or `.env.production`:

- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GITHUB_ID` / `GITHUB_SECRET`: GitHub OAuth credentials
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret

## 🧪 Testing

```bash
# Run type check
npm run build

# Lint code
npm run lint
```

## 📄 License

Apache 2.0 - See [LICENSE](../LICENSE) for details.

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 🔗 Links

- [Main Repository](https://github.com/SMSDAO/CyberAi)
- [Documentation](../docs/)
- [Security Policy](../SECURITY.md)

---

Built with ❤️ for Hakaton 2026
