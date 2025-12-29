import { useFormContext } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "./types";
import {
  TextField,
  SelectField,
  MultiSelectField,
  CheckboxField,
  SwitchField,
  RadioField,
  DateField,
  UrlField,
} from "./fields";

interface FormBuilderProps<TFieldValues extends FieldValues = FieldValues> {
  field: FormFieldConfig<TFieldValues>;
  control: Control<TFieldValues>;
  getValues?: (name: Path<TFieldValues>) => any;
  onChangeCapture?: (value: any) => void;
}

function FormBuilderField<TFieldValues extends FieldValues = FieldValues>({
  field,
  control,
  getValues,
  onChangeCapture,
}: FormBuilderProps<TFieldValues>) {
  const { type } = field;

  const renderFieldByType = () => {
    const commonProps = {
      field: {
        ...field,
        onChangeCapture,
      },
      control,
      getValues,
    };

    switch (type) {
      case "text":
      case "number":
      case "amount":
      case "email":
      case "textarea":
      case "long_text":
      case "longText":
      case "percentage":
        return <TextField {...commonProps} />;

      case "select":
      case "single_select":
      case "country_single_select":
      case "state_single_select":
      case "payment_terms":
        return <SelectField {...commonProps} />;

      case "multi_select":
      case "multiselect":
        return <MultiSelectField {...commonProps} />;

      case "checkbox":
        return <CheckboxField {...commonProps} />;

      case "switch":
        return <SwitchField {...commonProps} />;

      case "radio":
        return <RadioField {...commonProps} />;

      case "date":
      case "date_only":
        return <DateField {...commonProps} />;

      case "url":
        return <UrlField {...commonProps} />;

      // TODO: Implement these field types
      case "html":
      case "date_time_picker":
      case "separate_date_time_picker":
      case "phone":
      case "phone_e164":
      case "single_file":
      case "multi_file":
      case "tags_select":
        console.warn(`Field type "${type}" is not yet implemented`);
        return null;

      default:
        console.warn(`Unknown field type: ${type}`);
        return null;
    }
  };

  return <>{renderFieldByType()}</>;
}

export function FormBuilder<TFieldValues extends FieldValues = FieldValues>({
  fields,
  control,
  getValues,
  className,
}: {
  fields: FormFieldConfig<TFieldValues>[];
  control: Control<TFieldValues>;
  getValues?: (name: Path<TFieldValues>) => any;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {fields.map((field) => (
        <FormBuilderField
          key={String(field.name)}
          field={field}
          control={control}
          getValues={getValues}
        />
      ))}
    </div>
  );
}

// Hook version for use within FormProvider
export function useFormBuilder<TFieldValues extends FieldValues = FieldValues>(
  fields: FormFieldConfig<TFieldValues>[]
) {
  const { control, getValues } = useFormContext<TFieldValues>();

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <FormBuilderField
          key={String(field.name)}
          field={field}
          control={control}
          getValues={getValues}
        />
      ))}
    </div>
  );
}

export default FormBuilder;
