import React, { useState } from "react";
import type { Control, FieldValues } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/@atoms/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/@atoms/form";
import { Checkbox } from "@/common/@atoms/checkbox";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon, XIcon } from "lucide-react";
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
    disabled,
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

        const toggleValue = (value: string) => {
          const currentValues = selectedValues;
          const newValues = currentValues.includes(value)
            ? currentValues.filter((v: string) => v !== value)
            : [...currentValues, value];
          formField.onChange(newValues);
        };

        const removeValue = (value: string, e: React.MouseEvent) => {
          e.stopPropagation();
          const newValues = selectedValues.filter((v: string) => v !== value);
          formField.onChange(newValues);
        };

        const selectedOptions = fieldOptions.filter((opt) =>
          selectedValues.includes(String(opt.value))
        );

        return (
          <FormItem className={cn("w-full", className)} style={style}>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <div
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "flex items-center w-full min-h-9 px-3 py-1.5 border border-input rounded-md overflow-scroll bg-transparent text-sm shadow-xs transition-[color,box-shadow] cursor-pointer",
                      "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                      disabled && "cursor-not-allowed opacity-50",
                      !selectedValues.length && "text-muted-foreground"
                    )}
                  >
                    {selectedOptions.length > 0 ? (
                      <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                        {selectedOptions.map((option) => (
                          <span
                            key={String(option.value)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium whitespace-nowrap shrink-0"
                          >
                            {option.label}
                            <button
                              type="button"
                              onClick={(e) =>
                                removeValue(String(option.value), e)
                              }
                              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                              disabled={disabled}
                            >
                              <XIcon className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="flex-1">
                        {placeholder || "Select options"}
                      </span>
                    )}
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-1"
                align="start"
              >
                <div className="max-h-[300px] overflow-y-auto">
                  {fieldOptions.map((option) => {
                    const isSelected = selectedValues.includes(
                      String(option.value)
                    );
                    return (
                      <div
                        key={String(option.value)}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer hover:bg-accent transition-colors",
                          isSelected && "bg-accent"
                        )}
                        onClick={() => toggleValue(String(option.value))}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() =>
                            toggleValue(String(option.value))
                          }
                          className="pointer-events-none"
                        />
                        <span className="text-sm flex-1">{option.label}</span>
                        {isSelected && (
                          <CheckIcon className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
