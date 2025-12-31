import { PageHeader } from "@/common/@atoms/PageHeader";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsers, useUpdateUser, useDeleteUser } from "@/api/queries/useUsers";
import { Spinner } from "@/common/@atoms/spinner";
import type { User } from "@/api/schemas/user";
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
import {
  USER_COLUMNS,
  processColumns,
  type ExtendedColDef,
} from "@/lib/tableColumns";
import { useTranslation } from "react-i18next";

export default function UserList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: users, isLoading } = useUsers();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleStatusToggle = (user: User) => {
    updateUser({
      id: user.id,
      data: { isActive: !user.isActive },
    });
  };

  const columnDefs = useMemo<ColDef<User>[]>(
    () =>
      processColumns<User>([
        ...USER_COLUMNS.map((col) => ({
          ...col,
          // Highlight the Email column as an example
          highlighted: col.field === "email",
        })),
        {
          headerName: "Status",
          field: "isActive",
          flex: 1,
          filter: "agSetColumnFilter",
          dtype: "toggle_status",
          on_toggle: handleStatusToggle,
        },
        {
          headerName: "Roles",
          field: "roles",
          flex: 1.5,
          hideFilter: true,
          highlighted: true, // Highlight this column
          cellRenderer: (params: ICellRendererParams<User>) => {
            const user = params.data;
            if (!user) return "-";
            return user.roles && user.roles.length > 0
              ? user.roles
                  .map((r: { role: { name: string } }) => r.role.name)
                  .join(", ")
              : "-";
          },
        },
        {
          headerName: "",
          field: "id",
          width: 80,
          maxWidth: 80,
          isSortable: false,
          hideFilter: true,
          cellRenderer: (params: ICellRendererParams<User>) => {
            const user = params.data;
            if (!user) return null;
            return (
              <div className="flex items-center justify-end gap-0.5 h-full opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => navigate(`/users/${user.id}/edit`)}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <PencilIcon className="size-3.5" />
                </button>
                <button
                  className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  onClick={() => setUserToDelete(user)}
                >
                  <TrashIcon className="size-3.5" />
                </button>
              </div>
            );
          },
          cellClass: "group",
        },
      ] as ExtendedColDef<User>[]),
    [navigate]
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title={t("users.title")}
        description={t("users.manageSubtitle")}
        count={users?.length || 0}
        actions={[
          {
            label: "Filter",
            icon: SlidersHorizontal,
            onClick: () => {},
            variant: "text",
            size: "sm",
          },
          {
            label: t("users.create"),
            icon: PlusIcon,
            onClick: () => navigate("/users/new"),
            size: "sm",
          },
        ]}
      />

      {/* Data Table - Clean, no wrapper border */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <DataTable<User>
          rowData={users || []}
          columnDefs={columnDefs}
          height={400}
          floatingFilter
          pagination
          paginationPageSize={10}
          noRowsOverlayText="No users found. Create one to get started."
          getRowId={(params) => params.data.id}
        />
      )}

      {/* Delete Dialog */}
      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete
              <span className="font-medium text-foreground">
                {" "}
                {userToDelete?.name}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (userToDelete) {
                  deleteUser(userToDelete.id);
                  setUserToDelete(null);
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
