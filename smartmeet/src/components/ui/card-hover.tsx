
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardHoverProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
}

export function CardHover({ className, children, ...props }: CardHoverProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md hover:border-primary/50 cursor-pointer",
        className
      )} 
      {...props}
    >
      {children}
    </Card>
  );
}

CardHover.Header = CardHeader;
CardHover.Title = CardTitle;
CardHover.Description = CardDescription;
CardHover.Content = CardContent;
CardHover.Footer = CardFooter;
