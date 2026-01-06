import {
  CheckIcon,
  XIcon,
  AlertTriangleIcon,
  InfoIcon,
  Loader2Icon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      expand={false}
      visibleToasts={3}
      duration={3000}
      gap={8}
      offset={16}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:shadow-md group-[.toaster]:rounded-lg group-[.toaster]:px-4 group-[.toaster]:py-3",
          title:
            "group-[.toast]:font-medium group-[.toast]:text-[13px] group-[.toast]:text-foreground",
          description:
            "group-[.toast]:text-muted-foreground group-[.toast]:text-[12px]",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:font-medium group-[.toast]:text-xs group-[.toast]:px-3 group-[.toast]:py-1.5",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md group-[.toast]:font-medium group-[.toast]:text-xs group-[.toast]:px-3 group-[.toast]:py-1.5",
        },
      }}
      icons={{
        success: (
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            <CheckIcon className="size-3 text-white" strokeWidth={3} />
          </div>
        ),
        error: (
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500">
            <XIcon className="size-3 text-white" strokeWidth={3} />
          </div>
        ),
        warning: (
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500">
            <AlertTriangleIcon
              className="size-3 text-white"
              strokeWidth={2.5}
            />
          </div>
        ),
        info: (
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500">
            <InfoIcon className="size-3 text-white" strokeWidth={2.5} />
          </div>
        ),
        loading: (
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
