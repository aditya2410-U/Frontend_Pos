import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";
import { useCreateUser } from "@/api/queries/useUsers";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/common/@atoms/spinner";
import { useRoles, useOutlets } from "@/api/queries/useMetadata";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";
import { ArrowLeft } from "lucide-react";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  roleId: string;
  outletId: string;
}

export default function CreateUser() {
  const { t } = useTranslation();
  const { mutate: createUser, isPending } = useCreateUser();
  const { data: roles } = useRoles();
  const { data: outlets } = useOutlets();
  const navigate = useNavigate();

  const form = useForm<CreateUserFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleId: "",
      outletId: "",
    },
  });

  const fields: FormFieldConfig<CreateUserFormData>[] = useMemo(
    () => [
      {
        name: "name",
        type: "text",
        label: t("forms.fields.fullName"),
        placeholder: t("forms.placeholders.fullName"),
        validations: { required: true },
      },
      {
        name: "email",
        type: "email",
        label: t("forms.fields.email"),
        placeholder: t("forms.placeholders.email"),
        validations: { required: true },
      },
      {
        name: "password",
        type: "text",
        label: t("forms.fields.password"),
        placeholder: t("forms.placeholders.password"),
        validations: { required: true, minLength: 6 },
      },
      {
        name: "roleId",
        type: "select",
        label: `${t("forms.fields.role")} ${t("forms.labels.optional")}`,
        placeholder: t("forms.placeholders.selectRole"),
        options:
          roles?.map((role) => ({
            value: role.id,
            label: role.name,
          })) || [],
      },
      {
        name: "outletId",
        type: "select",
        label: `${t("forms.fields.outlet")} ${t("forms.labels.optional")}`,
        placeholder: t("forms.placeholders.selectOutlet"),
        options:
          outlets?.map((outlet) => ({
            value: outlet.id,
            label: outlet.name,
          })) || [],
      },
    ],
    [roles, outlets, t]
  );

  const onSubmit = (data: CreateUserFormData) => {
    createUser(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        ...(data.roleId && { roleId: data.roleId }),
        ...(data.outletId && { outletId: data.outletId }),
      },
      {
        onSuccess: () => navigate("/users"),
      }
    );
  };

  return (
    <div className="max-w-xl p-4">
      {/* Back button */}
      <button
        onClick={() => navigate("/users")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to users
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("users.createNew")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the details below to create a new user.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-card border border-border/60 rounded-xl p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormBuilder
              fields={fields}
              control={form.control}
              getValues={form.getValues}
            />

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate("/users")}
                className="flex-1"
              >
                {t("common.cancel")}
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner className="size-4" />
                    {t("common.creating")}
                  </>
                ) : (
                  t("users.createButton")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
