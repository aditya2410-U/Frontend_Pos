import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import styles from "./button.module.css";

export type ButtonVariant = "default" | "outlined" | "text" | "dashed";
export type ButtonType = "error" | "info" | "success" | "warning";

export interface ButtonProps extends Omit<
  React.ComponentProps<"button">,
  "type"
> {
  variant?: ButtonVariant;
  buttonType?: ButtonType;
  size?: "sm" | "md" | "lg" | "xl" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
}

function Button({
  className,
  variant = "default",
  buttonType,
  size = "md",
  asChild = false,
  icon,
  iconPosition = "left",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const variantClass = styles[`variant-${variant}`];
  const sizeClass = styles[`size-${size}`];

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-type={buttonType}
      data-size={size}
      type={type}
      className={cn(styles.button, variantClass, sizeClass, className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="size-5 flex items-center justify-center">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="size-5 flex items-center justify-center">{icon}</span>
          )}
        </>
      )}
    </Comp>
  );
}

// Helper function for backward compatibility
export function buttonVariants(options?: {
  variant?: ButtonVariant;
  size?: string;
}) {
  const variant = options?.variant || "default";
  const size = options?.size || "default";

  return cn(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`]
  );
}

export { Button };
