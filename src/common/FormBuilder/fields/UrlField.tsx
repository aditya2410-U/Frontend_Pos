import type { Control, FieldValues } from "react-hook-form";
import { Input } from "@/common/@atoms/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/@atoms/form";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "../types";

interface UrlFieldProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
}

export function UrlField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
}: UrlFieldProps<TFieldValues>) {
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
  } = field;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: validations?.required ? "This field is required" : false,
        pattern: {
          value: /^https?:\/\/.+/,
          message:
            "Please enter a valid URL (starting with http:// or https://)",
        },
      }}
      render={({ field: formField }) => (
        <FormItem className={cn("w-full", className)} style={style}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...formField}
              type="url"
              placeholder={placeholder || "https://example.com"}
              disabled={disabled}
              autoFocus={autoFocus}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
