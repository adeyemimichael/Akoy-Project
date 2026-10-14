import React from "react";
import logoImage from "../assets/logo.jpeg";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-16 w-16",
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoImage}
        alt="AKOY 360 Limited, integrated business and services"
        className={`${sizeClasses[size]} rounded-md bg-white object-contain`}
      />
    </div>
  );
};
