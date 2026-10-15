import React from "react";
import logoImage from "../assets/logo.jpeg";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
}) => {
  const sizeClasses: Record<string, string> = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src={logoImage}
        alt="AKOY 360 Limited"
        className={`${sizeClasses[size]} rounded-md bg-white object-contain flex-shrink-0`}
      />

      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-extrabold" style={{ color: "var(--brand-blue)" }}>
              AKOY
            </span>
            <span className="text-[14px] font-bold" style={{ color: "var(--brand-gold)" }}>
              360°
            </span>
          </div>

          <div className="text-xs font-semibold mt-0.5" style={{ color: "rgba(0,0,0,0.7)" }}>
            LIMITED
          </div>

          <div className="text-[11px] mt-1 text-slate-500 max-w-xs leading-tight">
            INTEGRATED BUSINESS & SERVICES. ONE VISION. 360° POSSIBILITIES.
          </div>
        </div>
      )}
    </div>
  );
};
