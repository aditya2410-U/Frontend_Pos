import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/common/@atoms/Button";
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
        placeholder: "••••••••",
        validations: { required: true },
      },
    ],
    [t]
  );

  const onSubmit = (data: LoginFormData) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* Subtle background gradient - Attio style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--chart-4) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-[400px] mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <StoreIcon className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              {t("sidebar.posSystem")}
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border/60 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              {t("auth.welcomeBack")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("auth.enterCredentials")}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormBuilder
                fields={fields}
                control={form.control}
                getValues={form.getValues}
              />

              <Button
                type="submit"
                className="w-full h-11 text-sm font-medium"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    {t("auth.signingIn")}
                  </>
                ) : (
                  t("auth.signIn")
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
