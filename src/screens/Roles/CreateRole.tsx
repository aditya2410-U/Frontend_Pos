import { useState } from "react";
import { Button } from "@/common/@atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { Input } from "@/common/@atoms/input";
import { Label } from "@/common/@atoms/label";
import { Textarea } from "@/common/@atoms/textarea";
import { useCreateRole } from "@/api/queries/useRoles";
import { usePermissions } from "@/api/queries/usePermissions";
import { Spinner } from "@/common/@atoms/spinner";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/common/@atoms/checkbox";

export default function CreateRole() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    const { mutate: createRole, isPending } = useCreateRole();
    const { data: permissions, isLoading: isLoadingPermissions } = usePermissions();
    const navigate = useNavigate();

    const handlePermissionChange = (permKey: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permKey)
                ? prev.filter(p => p !== permKey)
                : [...prev, permKey]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createRole({ name, description, permissions: selectedPermissions });
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Create New Role</h1>
                <Button variant="outlined" onClick={() => navigate("/roles")}>
                    Cancel
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Role Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Role Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Store Manager"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what this role can do..."
                            />
                        </div>

                        <div className="grid gap-4">
                            <Label>Permissions</Label>
                            {isLoadingPermissions ? (
                                <div className="flex justify-center p-4">
                                    <Spinner />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
                                    {permissions?.map((perm) => (
                                        <div key={perm.key} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={perm.key}
                                                checked={selectedPermissions.includes(perm.key)}
                                                onCheckedChange={() => handlePermissionChange(perm.key)}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor={perm.key}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {perm.key}
                                                </label>
                                                {perm.description && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {perm.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? <><Spinner className="mr-2 size-4" /> Creating...</> : "Create Role"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
