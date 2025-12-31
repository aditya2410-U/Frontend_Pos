import { useRoles } from "@/api/queries/useRoles";
import { PageHeader } from "@/common/@atoms/PageHeader";
import { SkeletonTable } from "@/common/DataTable/SkeletonTable";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DataTable } from "@/common/DataTable";
import type { ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";
import type { Role } from "@/api/schemas/role";
import {
  ROLE_COLUMNS,
  processColumns,
  type ExtendedColDef,
} from "@/lib/tableColumns";

export default function RoleList() {
  const { t } = useTranslation();
  const { data: roles, isLoading, isError } = useRoles();
  const navigate = useNavigate();

  const columnDefs = useMemo(
    () =>
      processColumns<Role>([
        ...ROLE_COLUMNS,
        {
          headerName: "Permissions",
          field: "permissions",
          flex: 2,
          highlighted: true,
          filter: false,
          cellRenderer: (params: ICellRendererParams<Role>) => {
            const role = params.data;
            if (!role?.permissions || role.permissions.length === 0)
              return null;
            return (
              <div className="flex gap-1 py-1 overflow-x-auto scrollbar-none overflow-y-hidden bg-transparent scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent">
                {role.permissions.map((p) => (
                  <span
                    key={p.permission.id}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-nowrap flex-shrink-0"
                  >
                    {p.permission.key}
                  </span>
                ))}
              </div>
            );
          },
        },
      ] as ExtendedColDef<Role>[]),
    []
  );

  if (isError)
    return <div className="text-red-500 p-8">Failed to load roles.</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("roles.title")}
        description={t("roles.manageSubtitle")}
        action={{
          label: t("roles.create"),
          icon: Plus,
          onClick: () => navigate("/roles/new"),
        }}
      />

      {isLoading ? (
        <SkeletonTable columnCount={10} rowCount={10} />
      ) : (
        <DataTable<Role>
          rowData={roles || []}
          columnDefs={columnDefs}
          height={400}
          floatingFilter
          noRowsOverlayText="No roles found."
          getRowId={(params) => params.data.id}
        />
      )}
    </div>
  );
}
