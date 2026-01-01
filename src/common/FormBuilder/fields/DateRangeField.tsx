import React from "react";
import type { Control, FieldValues } from "react-hook-form";
import { RangeCalendar } from "@heroui/calendar";
import { Button, ButtonGroup, Radio, RadioGroup } from "@heroui/react";
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

// DateRange type for HeroUI RangeCalendar
type DateRange = {
  start: CalendarDate;
  end: CalendarDate;
};
import { useLocale } from "@react-aria/i18n";

interface DateRangeFieldProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
}

export function DateRangeField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
}: DateRangeFieldProps<TFieldValues>) {
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
  const [precision, setPrecision] = React.useState("exact_dates");

  const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;
    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
            "cursor-pointer rounded-full border-2 border-default-200/60",
            "data-[selected=true]:border-primary"
          ),
          label: "text-tiny text-default-500",
          labelWrapper: "px-1 m-0",
          wrapper: "hidden",
        }}
      >
        {children}
      </Radio>
    );
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue || null}
      rules={{
        required: validations?.required ? "This field is required" : false,
      }}
      render={({ field: formField }) => {
        const getDateRangeValue = (): DateRange | null => {
          if (!formField.value) return null;
          try {
            // Handle object with start and end
            if (
              typeof formField.value === "object" &&
              formField.value.start &&
              formField.value.end
            ) {
              const startStr = String(formField.value.start).split("T")[0];
              const endStr = String(formField.value.end).split("T")[0];
              const start = parseDate(startStr);
              const end = parseDate(endStr);
              return { start, end };
            }
            // Handle array [start, end]
            if (
              Array.isArray(formField.value) &&
              formField.value.length === 2
            ) {
              const startStr = String(formField.value[0]).split("T")[0];
              const endStr = String(formField.value[1]).split("T")[0];
              const start = parseDate(startStr);
              const end = parseDate(endStr);
              return { start, end };
            }
            return null;
          } catch {
            return null;
          }
        };

        const rangeValue = getDateRangeValue();
        const now = today(getLocalTimeZone());
        const nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
        const nextMonth = startOfMonth(now.add({ months: 1 }));

        const handleRangeChange = (range: DateRange | null) => {
          if (!range || !range.start || !range.end) {
            formField.onChange(null);
            return;
          }

          // Store as object with ISO strings
          formField.onChange({
            start: range.start.toString(),
            end: range.end.toString(),
          });
        };

        const handlePreset = (preset: string) => {
          const todayDate = today(getLocalTimeZone());
          let start: CalendarDate;
          let end: CalendarDate;

          switch (preset) {
            case "1_day":
              start = todayDate;
              end = todayDate;
              break;
            case "2_days":
              start = todayDate;
              end = todayDate.add({ days: 1 });
              break;
            case "3_days":
              start = todayDate;
              end = todayDate.add({ days: 2 });
              break;
            case "7_days":
              start = todayDate;
              end = todayDate.add({ days: 6 });
              break;
            case "14_days":
              start = todayDate;
              end = todayDate.add({ days: 13 });
              break;
            case "exact_dates":
            default:
              return; // Don't change range for exact dates
          }

          handleRangeChange({ start, end });
        };

        const formatRange = () => {
          if (!rangeValue) return placeholder || "Select date range";
          return `${rangeValue.start.toString()} - ${rangeValue.end.toString()}`;
        };

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
                      !rangeValue && "text-muted-foreground"
                    )}
                    disabled={disabled}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="truncate">{formatRange()}</span>
                  </ShadcnButton>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <RangeCalendar
                  aria-label="Date range picker"
                  bottomContent={
                    <RadioGroup
                      aria-label="Date precision"
                      classNames={{
                        base: "w-full pb-2",
                        wrapper:
                          "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[280px] overflow-x-scroll",
                      }}
                      value={precision}
                      onValueChange={(value) => {
                        setPrecision(value);
                        handlePreset(value);
                      }}
                      orientation="horizontal"
                    >
                      <CustomRadio value="exact_dates">Exact dates</CustomRadio>
                      <CustomRadio value="1_day">1 day</CustomRadio>
                      <CustomRadio value="2_days">2 days</CustomRadio>
                      <CustomRadio value="3_days">3 days</CustomRadio>
                      <CustomRadio value="7_days">7 days</CustomRadio>
                      <CustomRadio value="14_days">14 days</CustomRadio>
                    </RadioGroup>
                  }
                  classNames={{
                    content: "w-full",
                  }}
                  focusedValue={rangeValue?.start || now}
                  nextButtonProps={{
                    variant: "bordered",
                  }}
                  prevButtonProps={{
                    variant: "bordered",
                  }}
                  topContent={
                    <ButtonGroup
                      fullWidth
                      className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
                      radius="full"
                      size="sm"
                      variant="bordered"
                    >
                      <Button
                        onPress={() => {
                          handleRangeChange({ start: now, end: now });
                        }}
                      >
                        Today
                      </Button>
                      <Button
                        onPress={() => {
                          const weekEnd = nextWeek.add({ days: 6 });
                          handleRangeChange({ start: nextWeek, end: weekEnd });
                        }}
                      >
                        Next week
                      </Button>
                      <Button
                        onPress={() => {
                          const monthStart = startOfMonth(nextMonth);
                          const nextMonthStart = startOfMonth(
                            nextMonth.add({ months: 1 })
                          );
                          const monthEnd = nextMonthStart.subtract({ days: 1 });
                          handleRangeChange({
                            start: monthStart,
                            end: monthEnd,
                          });
                        }}
                      >
                        Next month
                      </Button>
                    </ButtonGroup>
                  }
                  value={rangeValue}
                  onChange={handleRangeChange}
                  onFocusChange={(date) => {
                    if (date && rangeValue) {
                      // Update focused value but keep range
                      const newRange: DateRange = {
                        start: rangeValue.start,
                        end: rangeValue.end,
                      };
                      handleRangeChange(newRange);
                    }
                  }}
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
