
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarStatusProps extends React.ComponentProps<typeof Avatar> {
  src: string;
  alt: string;
  fallback: string;
  status: "online" | "offline" | "busy" | "away";
  size?: "sm" | "md" | "lg";
}

export function AvatarStatus({
  src,
  alt,
  fallback,
  status,
  size = "md",
  className,
  ...props
}: AvatarStatusProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };
  
  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  const statusSizes = {
    sm: "h-2 w-2 right-0 bottom-0",
    md: "h-3 w-3 right-0 bottom-0",
    lg: "h-4 w-4 right-0 bottom-0",
  };

  return (
    <div className="relative inline-block">
      <Avatar className={cn(sizeClasses[size], className)} {...props}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <span 
        className={cn(
          "absolute rounded-full border-2 border-white",
          statusClasses[status],
          statusSizes[size]
        )}
      />
    </div>
  );
}
