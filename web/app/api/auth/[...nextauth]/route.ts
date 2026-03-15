import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authOptions, isOAuthConfigured } from "@/lib/auth";

function missingOAuthHandler() {
  return NextResponse.json(
    {
      error:
        "OAuth provider not configured. Set GITHUB_ID and GITHUB_SECRET environment variables.",
    },
    { status: 503 }
  );
}

const nextAuthHandler = isOAuthConfigured ? NextAuth(authOptions) : null;

export function GET(req: Request, ctx: { params: Promise<{ nextauth: string[] }> }) {
  if (!nextAuthHandler) return missingOAuthHandler();
  return (nextAuthHandler as (req: Request, ctx: unknown) => Response)(req, ctx);
}

export function POST(req: Request, ctx: { params: Promise<{ nextauth: string[] }> }) {
  if (!nextAuthHandler) return missingOAuthHandler();
  return (nextAuthHandler as (req: Request, ctx: unknown) => Response)(req, ctx);
}
