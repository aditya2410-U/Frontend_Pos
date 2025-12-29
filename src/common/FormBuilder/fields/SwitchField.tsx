import type { Control, FieldValues } from "react-hook-form";
import { Switch } from "@/common/@atoms/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/@atoms/form";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "../types";

interface SwitchFieldProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
}

export function SwitchField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
}: SwitchFieldProps<TFieldValues>) {
  const { name, label, defaultValue, validations, disabled, style, className } =
    field;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue || false}
      rules={{
        required: validations?.required ? "This field is required" : false,
        validate: (value) => {
          if (validations?.required && !value) {
            return "This field must be enabled";
          }
          return true;
        },
      }}
      render={({ field: formField }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between space-x-3 space-y-0",
            className
          )}
          style={style}
        >
          {label && <FormLabel className="!mt-0">{label}</FormLabel>}
          <FormControl>
            <Switch
              checked={formField.value}
              onCheckedChange={formField.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
