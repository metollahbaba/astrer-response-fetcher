
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white";
}

export function Loader({ 
  size = "md", 
  color = "primary", 
  className, 
  ...props 
}: LoaderProps) {
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center",
        {
          "w-5 h-5": size === "sm",
          "w-8 h-8": size === "md",
          "w-12 h-12": size === "lg",
        },
        className
      )} 
      {...props}
    >
      <div 
        className={cn(
          "absolute w-full h-full border-2 rounded-full animate-spin-slow",
          {
            "border-primary/30 border-t-primary": color === "primary",
            "border-white/30 border-t-white": color === "white",
          }
        )} 
      />
      <div 
        className={cn(
          "absolute w-2/3 h-2/3 border-2 rounded-full animate-spin-slow",
          {
            "border-primary/40 border-b-primary": color === "primary",
            "border-white/40 border-b-white": color === "white",
          },
          "animation-delay-[0.2s]"
        )} 
      />
    </div>
  );
}

export default Loader;
