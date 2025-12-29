import type { Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/@atoms/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/@atoms/form";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "../types";

interface SelectFieldProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
  getValues?: (name: Path<TFieldValues>) => any;
}

export function SelectField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
  getValues,
}: SelectFieldProps<TFieldValues>) {
  const {
    name,
    label,
    placeholder,
    defaultValue,
    validations,
    disabled,
    options,
    style,
    className,
  } = field;

  const fieldOptions = options || field.configuration?.options || [];
  const fieldDefaultValue =
    defaultValue ?? (getValues ? getValues(name) : undefined);

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={fieldDefaultValue}
      rules={{
        required: validations?.required ? "This field is required" : false,
      }}
      render={({ field: formField }) => (
        <FormItem className={cn("w-full", className)} style={style}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={formField.onChange}
            value={formField.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder || "Select an option"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {fieldOptions.map((option) => (
                <SelectItem
                  key={String(option.value)}
                  value={String(option.value)}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
