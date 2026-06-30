"use client";

interface GaLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string;
  params?: Record<string, string>;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GaLink({ event, params, onClick, ...props }: GaLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.gtag?.("event", event, params ?? {});
    onClick?.(e);
  };
  return <a {...props} onClick={handleClick} />;
}
