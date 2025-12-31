import { useTranslation } from "react-i18next";

const LoaderScreen = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Professional spinner */}
        <div className="relative">
          <div
            className="size-12 rounded-full border-[3px] border-muted border-t-primary"
            style={{
              animation: "spin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite",
            }}
          />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-medium text-foreground tracking-wide">
            {t("loader.loading")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("loader.pleaseWait")}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderScreen;
