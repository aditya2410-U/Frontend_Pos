import { Button } from "@/common/@atoms/Button";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
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

export default function UserList() {
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
        ...USER_COLUMNS,
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
          headerName: "Actions",
          field: "id",
          flex: 1,
          isSortable: false,
          hideFilter: true,
          cellRenderer: (params: ICellRendererParams<User>) => {
            const user = params.data;
            if (!user) return null;
            return (
              <div className="flex items-center justify-end gap-2 h-full">
                <Button
                  variant="outlined"
                  size="icon"
                  onClick={() => navigate(`/users/${user.id}/edit`)}
                >
                  <PencilIcon className="size-4" />
                </Button>
                <Button
                  variant="outlined"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => setUserToDelete(user)}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
            );
          },
          cellStyle: { display: "flex", justifyContent: "flex-end" },
        },
      ] as ExtendedColDef<User>[]),
    [navigate]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Button onClick={() => navigate("/users/new")}>
          <PlusIcon className="mr-2 size-4" />
          Create User
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user
              <span className="font-medium text-foreground">
                {" "}
                {userToDelete?.name}{" "}
              </span>
              and remove their data from our servers.
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
