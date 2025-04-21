
import React from "react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Rating({
  value,
  max = 5,
  onChange,
  readOnly = false,
  className,
  size = "md",
}: RatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const containerClasses = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
  };

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center", 
        containerClasses[size],
        readOnly ? "" : "cursor-pointer",
        className
      )}
    >
      {[...Array(max)].map((_, index) => (
        <svg
          key={index}
          className={cn(
            sizeClasses[size],
            "fill-current",
            index < value ? "text-yellow-400" : "text-gray-300",
            !readOnly && "hover:scale-110 transition-transform duration-200"
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={() => handleClick(index)}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
