import { useOutlets, useDeleteOutlet } from "@/api/queries/useOutlets";
import { Button } from "@/common/@atoms/Button";
import { PageHeader } from "@/common/@atoms/PageHeader";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@/common/@atoms/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/@atoms/alert-dialog";
import { DataTable } from "@/common/DataTable";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useMemo, useState } from "react";
import type { Outlet } from "@/api/schemas/outlet";
import {
  OUTLET_COLUMNS,
  processColumns,
  type ExtendedColDef,
} from "@/lib/tableColumns";

export default function OutletList() {
  const { t } = useTranslation();
  const { data: outlets, isLoading, isError } = useOutlets();
  const { mutate: deleteOutlet } = useDeleteOutlet();
  const navigate = useNavigate();
  const [outletToDelete, setOutletToDelete] = useState<Outlet | null>(null);

  const columnDefs = useMemo<ColDef<Outlet>[]>(
    () =>
      processColumns<Outlet>([
        ...OUTLET_COLUMNS,
        {
          headerName: "Status",
          field: "isActive",
          flex: 1,
          hideFilter: true,
          dtype: "badge_status",
        },
        {
          headerName: "Actions",
          field: "id",
          flex: 0.8,
          isSortable: false,
          hideFilter: true,
          cellRenderer: (params: ICellRendererParams<Outlet>) => {
            const outlet = params.data;
            if (!outlet) return null;
            return (
              <div className="flex items-center justify-end h-full">
                <Button
                  variant="text"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => setOutletToDelete(outlet)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          },
          cellStyle: { display: "flex", justifyContent: "flex-end" },
        },
      ] as ExtendedColDef<Outlet>[]),
    []
  );

  if (isLoading)
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  if (isError)
    return <div className="text-red-500 p-8">Failed to load outlets.</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("outlets.title")}
        description={t("outlets.manageSubtitle")}
        action={{
          label: t("outlets.create"),
          icon: Plus,
          onClick: () => navigate("/outlets/new"),
        }}
      />

      <DataTable<Outlet>
        rowData={outlets || []}
        columnDefs={columnDefs}
        height="70vh"
        containerStyle={{ height: "70vh" }}
        floatingFilter
        noRowsOverlayText="No outlets found. Create one to get started."
        getRowId={(params) => params.data.id}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!outletToDelete}
        onOpenChange={() => setOutletToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Outlet?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the outlet{" "}
              <span className="font-medium text-foreground">
                {outletToDelete?.name}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (outletToDelete) {
                  deleteOutlet(outletToDelete.id);
                  setOutletToDelete(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
