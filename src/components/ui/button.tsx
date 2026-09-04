import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-card px-5 min-h-[48px] " +
  "text-[16px] font-semibold leading-none no-underline select-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  // Gold is allowed on exactly one primary button per viewport.
  primary: "btn-gold",
  secondary: "btn-glass",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(base, variants[variant], className)} {...props} />
  ),
);
Button.displayName = "Button";

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  to: string;
}

/** Internal links (react-router) or external (http/https) with the same look. */
export function ButtonLink({ className, variant = "primary", to, ...props }: ButtonLinkProps) {
  const cls = cn(base, variants[variant], className);
  if (/^https?:/.test(to)) {
    return <a href={to} className={cls} target="_blank" rel="noopener noreferrer" {...props} />;
  }
  return <Link to={to} className={cls} {...props} />;
}
