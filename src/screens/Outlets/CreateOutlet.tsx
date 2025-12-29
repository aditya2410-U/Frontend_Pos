import { useMemo } from "react";
import { useForm } from "react-hook-form";
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
        label: "Outlet Name",
        placeholder: "Main Branch",
        validations: { required: true },
      },
      {
        name: "address",
        type: "text",
        label: "Address",
        placeholder: "123 Market St",
      },
    ],
    []
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
        <h1 className="text-3xl font-bold tracking-tight">Create New Outlet</h1>
        <Button variant="outlined" onClick={() => navigate("/outlets")}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Outlet Details</CardTitle>
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
                    <Spinner className="mr-2 size-4" /> Creating...
                  </>
                ) : (
                  "Create Outlet"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
