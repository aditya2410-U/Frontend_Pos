import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/common/@atoms/input";
import { Textarea } from "@/common/@atoms/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/@atoms/form";
import { InputGroup } from "@/common/@atoms/input-group";
import { Percent } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "../types";

interface TextFieldProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
}

export function TextField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
}: TextFieldProps<TFieldValues>) {
  const {
    name,
    label,
    placeholder,
    defaultValue,
    validations,
    disabled,
    autoFocus,
    style,
    className,
    type,
  } = field;

  const isTextarea =
    type === "textarea" || type === "long_text" || type === "longText";
  const isPercentage = type === "percentage";
  const inputType =
    type === "number" || type === "amount" || type === "percentage"
      ? "number"
      : type === "email"
        ? "email"
        : "text";

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: validations?.required ? "This field is required" : false,
        minLength: validations?.minLength
          ? {
              value: validations.minLength,
              message: `Minimum length is ${validations.minLength}`,
            }
          : undefined,
        maxLength: validations?.maxLength
          ? {
              value: validations.maxLength,
              message: `Maximum length is ${validations.maxLength}`,
            }
          : undefined,
        min: validations?.min
          ? {
              value: validations.min,
              message: `Minimum value is ${validations.min}`,
            }
          : undefined,
        max: validations?.max
          ? {
              value: validations.max,
              message: `Maximum value is ${validations.max}`,
            }
          : undefined,
        pattern: validations?.pattern
          ? {
              value: validations.pattern,
              message: "Invalid format",
            }
          : undefined,
        validate: (value) => {
          if (validations?.email && type === "email") {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email";
          }
          if (validations?.url && type === "url") {
            try {
              new URL(value);
              return true;
            } catch {
              return "Invalid URL";
            }
          }
          return true;
        },
      }}
      render={({ field: formField }) => (
        <FormItem className={cn("w-full", className)} style={style}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isTextarea ? (
              <Textarea
                {...formField}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                rows={4}
              />
            ) : isPercentage ? (
              <InputGroup className="w-full">
                <Input
                  {...formField}
                  type={inputType}
                  placeholder={placeholder}
                  disabled={disabled}
                  autoFocus={autoFocus}
                  className="pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </div>
              </InputGroup>
            ) : (
              <Input
                {...formField}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
