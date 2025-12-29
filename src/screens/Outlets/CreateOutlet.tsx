import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/common/@atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { useCreateOutlet } from "@/api/queries/useOutlets";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/common/@atoms/spinner";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";

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
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("outlets.createNew")}
        </h1>
        <Button variant="outlined" onClick={() => navigate("/outlets")}>
          {t("common.cancel")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("outlets.details")}</CardTitle>
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
                  t("outlets.createButton")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
