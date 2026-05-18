import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface CalmButtonProps extends React.ComponentProps<"button"> {
  children: ReactNode;
}

export function CalmButton({ children, className, ...props }: CalmButtonProps) {
  return (
    <Button
      {...props}
      className={`calm-button-hover transition-all duration-300 ${className || ""}`}
    >
      {children}
    </Button>
  );
}
