import { useRoles } from "@/api/queries/useRoles";
import { Button } from "@/common/@atoms/Button";
import { Spinner } from "@/common/@atoms/spinner";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/common/DataTable";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";
import type { Role } from "@/api/schemas/role";
import { ROLE_COLUMNS } from "@/lib/tableColumns";

export default function RoleList() {
  const { data: roles, isLoading, isError } = useRoles();
  const navigate = useNavigate();

  const columnDefs = useMemo<ColDef<Role>[]>(
    () => [
      ...ROLE_COLUMNS,
      {
        headerName: "Permissions",
        field: "permissions",
        flex: 2,
        filter: false,
        cellRenderer: (params: ICellRendererParams<Role>) => {
          const role = params.data;
          if (!role?.permissions || role.permissions.length === 0) return null;
          return (
            <div className="flex flex-wrap gap-1 py-1">
              {role.permissions.map((p) => (
                <span
                  key={p.permission.id}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  {p.permission.key}
                </span>
              ))}
            </div>
          );
        },
        autoHeight: true,
      },
    ],
    []
  );

  if (isLoading)
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  if (isError)
    return <div className="text-red-500 p-8">Failed to load roles.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Roles & Permissions
        </h1>
        <Button onClick={() => navigate("/roles/new")}>
          <Plus className="mr-2 size-4" />
          Create Role
        </Button>
      </div>

      <DataTable<Role>
        rowData={roles || []}
        columnDefs={columnDefs}
        height={400}
        floatingFilter
        noRowsOverlayText="No roles found."
        getRowId={(params) => params.data.id}
      />
    </div>
  );
}
