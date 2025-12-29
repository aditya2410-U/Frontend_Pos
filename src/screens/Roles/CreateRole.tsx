import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { Label } from "@/common/@atoms/label";
import { useCreateRole } from "@/api/queries/useRoles";
import { usePermissions } from "@/api/queries/usePermissions";
import { Spinner } from "@/common/@atoms/spinner";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/common/@atoms/checkbox";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";

interface CreateRoleFormData {
  name: string;
  description: string;
  permissions: string[];
}

export default function CreateRole() {
  const { t } = useTranslation();
  const { mutate: createRole, isPending } = useCreateRole();
  const { data: permissions, isLoading: isLoadingPermissions } =
    usePermissions();
  const navigate = useNavigate();

  const form = useForm<CreateRoleFormData>({
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  const selectedPermissions = form.watch("permissions");

  const fields: FormFieldConfig<CreateRoleFormData>[] = useMemo(
    () => [
      {
        name: "name",
        type: "text",
        label: t("forms.fields.name"),
        placeholder: t("forms.placeholders.roleName"),
        validations: { required: true },
      },
      {
        name: "description",
        type: "textarea",
        label: t("forms.fields.description"),
        placeholder: t("forms.placeholders.description"),
      },
    ],
    [t]
  );

  const handlePermissionChange = (permKey: string) => {
    const current = form.getValues("permissions");
    const updated = current.includes(permKey)
      ? current.filter((p) => p !== permKey)
      : [...current, permKey];
    form.setValue("permissions", updated);
  };

  const onSubmit = (data: CreateRoleFormData) => {
    createRole({
      name: data.name,
      description: data.description,
      permissions: data.permissions,
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("roles.createNew")}
        </h1>
        <Button variant="outlined" onClick={() => navigate("/roles")}>
          {t("common.cancel")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("roles.details")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormBuilder
                fields={fields}
                control={form.control}
                getValues={form.getValues}
              />

              <div className="grid gap-4">
                <Label>{t("forms.fields.permissions")}</Label>
                {isLoadingPermissions ? (
                  <div className="flex justify-center p-4">
                    <Spinner />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
                    {permissions?.map((perm) => (
                      <div
                        key={perm.key}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={perm.key}
                          checked={selectedPermissions.includes(perm.key)}
                          onCheckedChange={() =>
                            handlePermissionChange(perm.key)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={perm.key}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {perm.key}
                          </label>
                          {perm.description && (
                            <p className="text-xs text-muted-foreground">
                              {perm.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner className="mr-2 size-4" /> {t("common.creating")}
                  </>
                ) : (
                  t("roles.createButton")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
