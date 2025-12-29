# FormBuilder Component

A flexible, type-safe form builder component built with React Hook Form and shadcn/ui components. It supports multiple field types and automatically handles validation.

## Features

- ✅ Type-safe with TypeScript
- ✅ Built on React Hook Form
- ✅ Uses shadcn/ui components
- ✅ Supports multiple field types
- ✅ Automatic validation
- ✅ Theme-aware (adapts to your theme)

## Supported Field Types

- `text` - Text input
- `number` - Number input
- `amount` - Amount input (number)
- `email` - Email input with validation
- `textarea` - Multi-line text input
- `long_text` / `longText` - Long text input
- `percentage` - Percentage input with % icon
- `select` / `single_select` - Single select dropdown
- `multi_select` / `multiselect` - Multi-select dropdown
- `checkbox` - Checkbox field
- `switch` - Toggle switch
- `radio` - Radio button group
- `date` / `date_only` - Date picker
- `url` - URL input with validation

## Usage

### Basic Example

```tsx
import { useForm } from "react-hook-form";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";

interface FormData {
  name: string;
  email: string;
  age: number;
  country: string;
}

function MyForm() {
  const { control, handleSubmit, getValues } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      country: "",
    },
  });

  const fields: FormFieldConfig<FormData>[] = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      validations: { required: true },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      validations: { required: true, email: true },
    },
    {
      name: "age",
      type: "number",
      label: "Age",
      validations: { required: true, min: 18, max: 100 },
    },
    {
      name: "country",
      type: "select",
      label: "Country",
      options: [
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
      ],
      validations: { required: true },
    },
  ];

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form control={control}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBuilder fields={fields} control={control} getValues={getValues} />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}
```

### Using with FormProvider

```tsx
import { useForm, FormProvider } from "react-hook-form";
import { FormBuilder, useFormBuilder } from "@/common/FormBuilder";

function MyForm() {
  const methods = useForm<FormData>();

  const fields: FormFieldConfig<FormData>[] = [
    // ... field definitions
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormBuilder
          fields={fields}
          control={methods.control}
          getValues={methods.getValues}
        />
      </form>
    </FormProvider>
  );
}
```

## Field Configuration

### Common Properties

- `name` - Field name (must match form data key)
- `type` - Field type (see supported types above)
- `label` - Field label
- `placeholder` - Placeholder text
- `defaultValue` - Default value
- `disabled` - Disable the field
- `autoFocus` - Auto-focus the field
- `validations` - Validation rules
- `options` - Options for select/radio fields
- `style` - Custom CSS styles
- `className` - Custom CSS classes

### Validation Options

```tsx
validations: {
  required: true,           // Field is required
  min: 0,                  // Minimum value (for numbers)
  max: 100,                // Maximum value (for numbers)
  minLength: 3,            // Minimum length (for text)
  maxLength: 100,          // Maximum length (for text)
  pattern: /^[A-Z]+$/,    // Regex pattern
  email: true,             // Email validation
  url: true,               // URL validation
}
```

### Select Field Options

```tsx
{
  name: "country",
  type: "select",
  options: [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ],
}
```

### Multi-Select Field

```tsx
{
  name: "tags",
  type: "multi_select",
  options: [
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
  ],
  validations: { required: true },
}
```

## Folder Structure

```
src/common/FormBuilder/
├── FormBuilder.tsx       # Main component
├── types.ts              # TypeScript types
├── index.ts              # Exports
├── fields/
│   ├── TextField.tsx
│   ├── SelectField.tsx
│   ├── MultiSelectField.tsx
│   ├── CheckboxField.tsx
│   ├── SwitchField.tsx
│   ├── RadioField.tsx
│   ├── DateField.tsx
│   ├── UrlField.tsx
│   └── index.ts
└── README.md
```

## Notes

- The FormBuilder requires a `control` prop from `useForm()` hook
- All fields are automatically integrated with React Hook Form
- Validation messages are displayed automatically
- Fields adapt to your theme (light/dark mode and color themes)
