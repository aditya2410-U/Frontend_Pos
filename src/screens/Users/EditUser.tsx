import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";
import { useUpdateUser, useUser } from "@/api/queries/useUsers";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/common/@atoms/spinner";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";
import { ArrowLeft } from "lucide-react";

interface EditUserFormData {
  name: string;
  email: string;
  isActive: boolean;
}

export default function EditUser() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, isLoading: isUserLoading } = useUser(id || "");
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const form = useForm<EditUserFormData>({
    defaultValues: {
      name: "",
      email: "",
      isActive: true,
    },
  });

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
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
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
          {t("users.edit")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update the user details below.
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
              <Button type="submit" className="flex-1" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Spinner className="size-4" />
                    {t("common.updating")}
                  </>
                ) : (
                  t("users.updateButton")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
