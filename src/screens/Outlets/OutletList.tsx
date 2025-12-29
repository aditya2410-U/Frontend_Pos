import { useOutlets, useDeleteOutlet } from "@/api/queries/useOutlets";
import { Button } from "@/common/@atoms/button";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/@atoms/table";
import { Plus, Trash2 } from "lucide-react";
import { Spinner } from "@/common/@atoms/spinner";
import { Badge } from "@/common/@atoms/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/@atoms/alert-dialog";

export default function OutletList() {
  const { data: outlets, isLoading, isError } = useOutlets();
  const { mutate: deleteOutlet } = useDeleteOutlet();
  const navigate = useNavigate();

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Outlets</h1>
          <p className="text-muted-foreground">Manage your store outlets.</p>
        </div>
        <Button onClick={() => navigate("/outlets/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Outlet
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outlets?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-muted-foreground"
                >
                  No outlets found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              outlets?.map((outlet) => (
                <TableRow key={outlet.id}>
                  <TableCell className="font-medium">{outlet.name}</TableCell>
                  <TableCell>{outlet.address || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={outlet.isActive ? "default" : "secondary"}>
                      {outlet.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(outlet.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="default"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Outlet?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the outlet{" "}
                            <span className="font-medium text-foreground">
                              {outlet.name}
                            </span>
                            . This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => deleteOutlet(outlet.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
