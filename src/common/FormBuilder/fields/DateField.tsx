import React from "react";
import type { Control, FieldValues } from "react-hook-form";
import { Calendar } from "@heroui/calendar";
import { Button, ButtonGroup } from "@heroui/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/@atoms/popover";
import { Button as ShadcnButton } from "@/common/@atoms/Button";
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
import {
  today,
  getLocalTimeZone,
  startOfWeek,
  startOfMonth,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

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

  const { locale } = useLocale();
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: validations?.required ? "This field is required" : false,
      }}
      render={({ field: formField }) => {
        const getDateValue = (): CalendarDate | null => {
          if (!formField.value) return null;
          try {
            // Check if it's already a CalendarDate-like object
            if (
              formField.value &&
              typeof formField.value === "object" &&
              "year" in formField.value &&
              "month" in formField.value &&
              "day" in formField.value
            ) {
              return formField.value as CalendarDate;
            }
            // Try to parse ISO string or date string
            const dateStr = String(formField.value);
            // Handle ISO date strings (YYYY-MM-DD or full ISO)
            const dateOnly = dateStr.split("T")[0];
            return parseDate(dateOnly);
          } catch {
            return null;
          }
        };

        const dateValue = getDateValue() || today(getLocalTimeZone());

        const handleDateChange = (date: CalendarDate) => {
          // Store as ISO string (YYYY-MM-DD format)
          formField.onChange(date.toString());
        };

        const now = today(getLocalTimeZone());
        const nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
        const nextMonth = startOfMonth(now.add({ months: 1 }));

        return (
          <FormItem className={cn("w-full", className)} style={style}>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <ShadcnButton
                    variant="outlined"
                    type="button"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formField.value && "text-muted-foreground"
                    )}
                    disabled={disabled}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formField.value ? (
                      <span>{formField.value}</span>
                    ) : (
                      <span>{placeholder || "Pick a date"}</span>
                    )}
                  </ShadcnButton>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  aria-label="Date picker"
                  topContent={
                    <ButtonGroup
                      fullWidth
                      className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
                      radius="full"
                      size="sm"
                      variant="bordered"
                    >
                      <Button onPress={() => handleDateChange(now)}>
                        Today
                      </Button>
                      <Button onPress={() => handleDateChange(nextWeek)}>
                        Next week
                      </Button>
                      <Button onPress={() => handleDateChange(nextMonth)}>
                        Next month
                      </Button>
                    </ButtonGroup>
                  }
                  classNames={{
                    content: "w-full",
                  }}
                  focusedValue={dateValue}
                  nextButtonProps={{
                    variant: "bordered",
                  }}
                  prevButtonProps={{
                    variant: "bordered",
                  }}
                  value={dateValue}
                  onChange={handleDateChange}
                  onFocusChange={handleDateChange}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
