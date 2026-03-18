import { NextResponse } from "next/server";

const MONITORED_VARS = [
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
  "GITHUB_ID",
  "GITHUB_SECRET",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
] as const;

export function GET() {
  const status = Object.fromEntries(
    MONITORED_VARS.map((key) => [key, !!process.env[key]])
  );
  return NextResponse.json(status);
}
