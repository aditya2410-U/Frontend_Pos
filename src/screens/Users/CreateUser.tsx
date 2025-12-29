import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { useCreateUser } from "@/api/queries/useUsers";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/common/@atoms/spinner";
import { useRoles, useOutlets } from "@/api/queries/useMetadata";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";

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
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("users.createNew")}
        </h1>
        <Button variant="outlined" onClick={() => navigate("/users")}>
          {t("common.cancel")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("users.details")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormBuilder
                fields={fields}
                control={form.control}
                getValues={form.getValues}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner className="mr-2 size-4" /> {t("common.creating")}
                  </>
                ) : (
                  t("users.createButton")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
