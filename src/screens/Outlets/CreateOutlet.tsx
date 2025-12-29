import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";
import { useCreateOutlet } from "@/api/queries/useOutlets";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/common/@atoms/spinner";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";
import { ArrowLeft } from "lucide-react";

interface CreateOutletFormData {
  name: string;
  address: string;
}

export default function CreateOutlet() {
  const { t } = useTranslation();
  const { mutate: createOutlet, isPending } = useCreateOutlet();
  const navigate = useNavigate();

  const form = useForm<CreateOutletFormData>({
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const fields: FormFieldConfig<CreateOutletFormData>[] = useMemo(
    () => [
      {
        name: "name",
        type: "text",
        label: t("forms.fields.name"),
        placeholder: t("forms.placeholders.outletName"),
        validations: { required: true },
      },
      {
        name: "address",
        type: "text",
        label: t("forms.fields.address"),
        placeholder: t("forms.placeholders.address"),
      },
    ],
    [t]
  );

  const onSubmit = (data: CreateOutletFormData) => {
    createOutlet(
      { name: data.name, address: data.address },
      {
        onSuccess: () => navigate("/outlets"),
      }
    );
  };

  return (
    <div className="max-w-xl">
      {/* Back button */}
      <button
        onClick={() => navigate("/outlets")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to outlets
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("outlets.createNew")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the details below to create a new outlet.
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
                onClick={() => navigate("/outlets")}
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
                  t("outlets.createButton")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
