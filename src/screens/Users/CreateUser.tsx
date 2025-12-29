import { useMemo } from "react";
import { useForm } from "react-hook-form";
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
        label: "Full Name",
        placeholder: "John Doe",
        validations: { required: true },
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "john@example.com",
        validations: { required: true },
      },
      {
        name: "password",
        type: "text",
        label: "Password",
        placeholder: "••••••••",
        validations: { required: true, minLength: 6 },
      },
      {
        name: "roleId",
        type: "select",
        label: "Role (Optional)",
        placeholder: "Select Role",
        options:
          roles?.map((role) => ({
            value: role.id,
            label: role.name,
          })) || [],
      },
      {
        name: "outletId",
        type: "select",
        label: "Outlet (Optional)",
        placeholder: "Select Outlet",
        options:
          outlets?.map((outlet) => ({
            value: outlet.id,
            label: outlet.name,
          })) || [],
      },
    ],
    [roles, outlets]
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
        <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
        <Button variant="outlined" onClick={() => navigate("/users")}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
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
                  "Create User"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
