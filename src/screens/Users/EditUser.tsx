import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { useUpdateUser, useUser } from "@/api/queries/useUsers";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/common/@atoms/spinner";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";

interface EditUserFormData {
  name: string;
  email: string;
  isActive: boolean;
}

export default function EditUser() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch user data
  const { data: user, isLoading: isUserLoading } = useUser(id || "");
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const form = useForm<EditUserFormData>({
    defaultValues: {
      name: "",
      email: "",
      isActive: true,
    },
  });

  // Populate form when user data is loaded
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      });
    }
  }, [user, form]);

  const fields: FormFieldConfig<EditUserFormData>[] = useMemo(
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
        name: "isActive",
        type: "switch",
        label: t("forms.fields.activeStatus"),
      },
    ],
    [t]
  );

  const onSubmit = (data: EditUserFormData) => {
    if (!id) return;

    updateUser(
      {
        id,
        data: { name: data.name, email: data.email, isActive: data.isActive },
      },
      {
        onSuccess: () => navigate("/users"),
      }
    );
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("users.edit")}</h1>
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

              <Button type="submit" className="w-full" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Spinner className="mr-2 size-4" /> {t("common.updating")}
                  </>
                ) : (
                  t("users.updateButton")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
