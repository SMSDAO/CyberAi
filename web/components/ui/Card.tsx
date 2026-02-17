import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  children: ReactNode;
}

export default function Card({ glow = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 backdrop-filter backdrop-blur-lg",
        glow
          ? "glow-card"
          : "bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  glow?: boolean;
}

export function CardTitle({ className, children, glow = false, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-2xl font-bold",
        glow && "glow-text-cyan",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
