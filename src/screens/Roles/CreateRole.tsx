import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";
import { Label } from "@/common/@atoms/label";
import { useCreateRole } from "@/api/queries/useRoles";
import { usePermissions } from "@/api/queries/usePermissions";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/common/@atoms/checkbox";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";
import { ArrowLeft } from "lucide-react";
import { IconLoader } from "@tabler/icons-react";

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
    <div className="max-w-xl p-4">
      {/* Back button */}
      <button
        onClick={() => navigate("/roles")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to roles
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("roles.createNew")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create a new role with specific permissions.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-card border border-border/60 rounded-xl p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormBuilder
              fields={fields}
              control={form.control}
              getValues={form.getValues}
            />

            {/* Permissions Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                {t("forms.fields.permissions")}
              </Label>
              {isLoadingPermissions ? (
                <div className="flex justify-center p-6">
                  <Spinner />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 p-4 bg-muted/30 rounded-lg border border-border/60">
                  {permissions?.map((perm) => (
                    <label
                      key={perm.key}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        id={perm.key}
                        checked={selectedPermissions.includes(perm.key)}
                        onCheckedChange={() => handlePermissionChange(perm.key)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-foreground">
                          {perm.key}
                        </span>
                        {perm.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {perm.description}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate("/roles")}
                className="flex-1"
              >
                {t("common.cancel")}
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending ? (
                  <>
                    <IconLoader
                      className="mr-2 size-4 animate-spin"
                      strokeWidth={1}
                    />
                    {t("common.creating")}
                  </>
                ) : (
                  t("roles.createButton")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
