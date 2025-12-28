import { useRoles } from "@/api/queries/useRoles";
import { Button } from "@/common/@atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { Spinner } from "@/common/@atoms/spinner";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/common/@atoms/table";

export default function RoleList() {
    const { data: roles, isLoading, isError } = useRoles();
    const navigate = useNavigate();

    if (isLoading) return <div className="flex justify-center p-8"><Spinner /></div>;
    if (isError) return <div className="text-red-500 p-8">Failed to load roles.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
                <Button onClick={() => navigate("/roles/new")}>
                    <Plus className="mr-2 size-4" />
                    Create Role
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Roles</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Role Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Permissions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles?.map((role, index: number) => (
                                <TableRow key={role.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{role.name}</TableCell>
                                    <TableCell>{role.description || "-"}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {role?.permissions?.map((p) => (
                                                <span key={p.permission.id} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                    {p.permission.key}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(!roles || roles.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No roles found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
