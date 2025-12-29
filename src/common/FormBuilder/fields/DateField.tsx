import type { Control, FieldValues } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/common/@atoms/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/@atoms/popover";
import { Button } from "@/common/@atoms/Button";
import { CalendarIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/@atoms/form";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "../types";

interface DateFieldProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
}

export function DateField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
}: DateFieldProps<TFieldValues>) {
  const {
    name,
    label,
    placeholder,
    defaultValue,
    validations,
    disabled,
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
      }}
      render={({ field: formField }) => (
        <FormItem className={cn("w-full", className)} style={style}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outlined"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formField.value && "text-muted-foreground"
                  )}
                  disabled={disabled}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formField.value ? (
                    format(new Date(formField.value), "PPP")
                  ) : (
                    <span>{placeholder || "Pick a date"}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  formField.value ? new Date(formField.value) : undefined
                }
                onSelect={(date) => {
                  formField.onChange(date ? date.toISOString() : null);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
