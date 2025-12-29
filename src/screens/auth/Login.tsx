import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/common/@atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/@atoms/card";
import { useLogin } from "@/api/queries/useAuth";
import { Spinner } from "@/common/@atoms/spinner";
import { StoreIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Form } from "@/common/@atoms/form";
import { FormBuilder } from "@/common/FormBuilder";
import type { FormFieldConfig } from "@/common/FormBuilder";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { t } = useTranslation();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const fields: FormFieldConfig<LoginFormData>[] = useMemo(
    () => [
      {
        name: "email",
        type: "email",
        label: t("auth.email"),
        placeholder: t("auth.emailPlaceholder"),
        validations: { required: true },
      },
      {
        name: "password",
        type: "text",
        label: t("auth.password"),
        validations: { required: true },
      },
    ],
    [t]
  );

  const onSubmit = (data: LoginFormData) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-80 rounded-full bg-chart-3/20  blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 size-80 rounded-full bg-chart-2/20 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-chart-4/20 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Login Card with glassmorphism */}
      <Card className="w-full max-w-md relative backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="size-12 rounded-xl bg-linear-to-br from-chart-1 to-chart-2 flex items-center justify-center shadow-lg">
              <StoreIcon color="white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {t("auth.welcomeBack")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("auth.enterCredentials")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <FormBuilder
                  fields={fields}
                  control={form.control}
                  getValues={form.getValues}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Spinner className="mr-2 size-4" />
                      {t("auth.signingIn")}
                    </>
                  ) : (
                    t("auth.signIn")
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
