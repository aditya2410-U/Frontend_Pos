import { Button } from "@/common/@atoms/Button";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/common/@atoms/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/@atoms/card";
import { useUsers, useUpdateUser, useDeleteUser } from "@/api/queries/useUsers";
import { Spinner } from "@/common/@atoms/spinner";
import { Switch } from "@/common/@atoms/switch";
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
    AlertDialogTrigger,
} from "@/common/@atoms/alert-dialog";

export default function UserList() {
    const navigate = useNavigate();
    const { data: users, isLoading } = useUsers();
    const { mutate: updateUser } = useUpdateUser();
    const { mutate: deleteUser } = useDeleteUser();

    const handleStatusToggle = (user: User) => {
        updateUser({
            id: user.id,
            data: { isActive: !user.isActive }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <Button onClick={() => navigate("/users/new")}>
                    <PlusIcon className="mr-2 size-4" />
                    Create User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Organization Members</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <Spinner />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Roles</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No users found. Create one to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users?.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        checked={user.isActive}
                                                        onCheckedChange={() => handleStatusToggle(user)}
                                                    />
                                                    <span className="text-sm text-muted-foreground">
                                                        {user.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.roles && user.roles.length > 0
                                                    ? user.roles.map((r: any) => r.role.name).join(", ")
                                                    : "-"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outlined" size="icon" onClick={() => navigate(`/users/${user.id}/edit`)}>
                                                        <PencilIcon className="size-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outlined" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                                <TrashIcon className="size-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete the user
                                                                    <span className="font-medium text-foreground"> {user.name} </span>
                                                                    and remove their data from our servers.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                    onClick={() => deleteUser(user.id)}
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
