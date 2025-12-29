import { useState } from "react";
import type { Control, FieldValues } from "react-hook-form";
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
import { Checkbox } from "@/common/@atoms/checkbox";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "../types";

interface MultiSelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
}

export function MultiSelectField<
  TFieldValues extends FieldValues = FieldValues,
>({ field, control }: MultiSelectFieldProps<TFieldValues>) {
  const {
    name,
    label,
    placeholder,
    defaultValue,
    validations,
    options,
    style,
    className,
  } = field;

  const fieldOptions = options || field.configuration?.options || [];
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue || []}
      rules={{
        required: validations?.required ? "This field is required" : false,
        validate: (value) => {
          if (validations?.required && (!value || value.length === 0)) {
            return "At least one option must be selected";
          }
          return true;
        },
      }}
      render={({ field: formField }) => {
        const selectedValues: string[] = Array.isArray(formField.value)
          ? formField.value.map((v: any) => String(v))
          : [];
        const selectedLabels = fieldOptions
          .filter((opt) => selectedValues.includes(String(opt.value)))
          .map((opt) => opt.label);

        const toggleValue = (value: string) => {
          const currentValues = selectedValues;
          const newValues = currentValues.includes(value)
            ? currentValues.filter((v: string) => v !== value)
            : [...currentValues, value];
          formField.onChange(newValues);
        };

        return (
          <FormItem className={cn("w-full", className)} style={style}>
            {label && <FormLabel>{label}</FormLabel>}
            <Select open={open} onOpenChange={setOpen}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder || "Select options"}>
                    {selectedLabels.length > 0
                      ? `${selectedLabels.length} selected`
                      : placeholder || "Select options"}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {fieldOptions.map((option) => {
                  const isSelected = selectedValues.includes(
                    String(option.value)
                  );
                  return (
                    <SelectItem
                      key={String(option.value)}
                      value={String(option.value)}
                      onSelect={(e) => {
                        e.preventDefault();
                        toggleValue(String(option.value));
                      }}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox checked={isSelected} />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
