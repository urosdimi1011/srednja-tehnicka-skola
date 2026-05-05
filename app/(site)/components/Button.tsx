import Link from "next/link";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "light";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: "_blank" | "_self";
  rel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-crimson-700 hover:bg-crimson-800 text-white shadow-sm",
  outline: "border border-crimson-700 text-crimson-700 hover:bg-crimson-50",
  ghost: "text-crimson-700 hover:bg-crimson-50",
  light: "bg-white text-crimson-700 hover:bg-stone-100 shadow-md",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

const baseClasses =
  "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-crimron-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  target,
  rel,
}: ButtonProps) {
  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {IconLeft && (
        <IconLeft size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
      )}
      {children}
      {IconRight && (
        <IconRight size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
      )}
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel");
    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClassName}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
