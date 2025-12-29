import type { Control, FieldValues } from "react-hook-form";
import { Checkbox } from "@/common/@atoms/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/@atoms/form";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "../types";

interface CheckboxFieldProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
}

export function CheckboxField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
}: CheckboxFieldProps<TFieldValues>) {
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
            return "This field must be checked";
          }
          return true;
        },
      }}
      render={({ field: formField }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center space-x-3 space-y-0",
            className
          )}
          style={style}
        >
          <FormControl>
            <Checkbox
              checked={formField.value}
              onCheckedChange={formField.onChange}
              disabled={disabled}
            />
          </FormControl>
          {label && (
            <FormLabel className="!mt-0 cursor-pointer">{label}</FormLabel>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
