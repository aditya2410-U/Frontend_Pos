import type { Control, FieldValues } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/common/@atoms/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/@atoms/form";
import { Label } from "@/common/@atoms/label";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "../types";

interface RadioFieldProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
}

export function RadioField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
}: RadioFieldProps<TFieldValues>) {
  const {
    name,
    label,
    defaultValue,
    validations,
    disabled,
    options,
    style,
    className,
  } = field;

  const fieldOptions = options || field.configuration?.options || [];

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: validations?.required ? "This field is required" : false,
      }}
      render={({ field: formField }) => (
        <FormItem className={cn("w-full", className)} style={style}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              value={formField.value}
              onValueChange={formField.onChange}
              disabled={disabled}
              className="space-y-3"
            >
              {fieldOptions.map((option) => (
                <div
                  key={String(option.value)}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={String(option.value)}
                    id={`${name}-${option.value}`}
                  />
                  <Label
                    htmlFor={`${name}-${option.value}`}
                    className="font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
