import type { Control, FieldValues, Path } from "react-hook-form";

export type FieldType =
  | "text"
  | "number"
  | "amount"
  | "email"
  | "textarea"
  | "long_text"
  | "longText"
  | "html"
  | "select"
  | "single_select"
  | "country_single_select"
  | "state_single_select"
  | "multi_select"
  | "multiselect"
  | "checkbox"
  | "switch"
  | "radio"
  | "date"
  | "date_only"
  | "date_time_picker"
  | "separate_date_time_picker"
  | "phone"
  | "phone_e164"
  | "url"
  | "percentage"
  | "single_file"
  | "multi_file"
  | "tags_select"
  | "payment_terms";

export interface FieldOption {
  value: string | number;
  label: string;
}

export interface FieldValidations {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
}

export interface FormFieldConfig<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  type: FieldType;
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  options?: FieldOption[];
  validations?: FieldValidations;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  className?: string;
  configuration?: {
    options?: FieldOption[];
    [key: string]: any;
  };
  // For dynamic attributes
  is_dynamic_attribute?: boolean;
  has_dynamic_attrs?: boolean;
  attribute_id?: string;
  // For form context
  control?: Control<TFieldValues>;
  getValues?: (name: Path<TFieldValues>) => any;
  onChangeCapture?: (value: any) => void;
}

export interface FormBuilderProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  fields: FormFieldConfig<TFieldValues>[];
  control: Control<TFieldValues>;
  getValues?: (name: Path<TFieldValues>) => any;
  className?: string;
}
