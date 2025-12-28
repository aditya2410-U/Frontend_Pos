import { useEffect, useState } from "react";
import { Button } from "@/common/@atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { Input } from "@/common/@atoms/input";
import { Label } from "@/common/@atoms/label";
import { useUpdateUser, useUser } from "@/api/queries/useUsers";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/common/@atoms/spinner";
import { Switch } from "@/common/@atoms/switch";

export default function EditUser() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch user data
    const { data: user, isLoading: isUserLoading } = useUser(id || "");
    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState(true);

    // Populate form when user data is loaded
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsActive(user.isActive);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        updateUser(
            {
                id,
                data: { name, email, isActive }
            },
            {
                onSuccess: () => navigate("/users")
            }
        );
    };

    if (isUserLoading) {
        return <div className="flex justify-center p-8"><Spinner /></div>;
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
                <Button variant="outlined" onClick={() => navigate("/users")}>
                    Cancel
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isActive"
                                checked={isActive}
                                onCheckedChange={setIsActive}
                            />
                            <Label htmlFor="isActive">Active Status</Label>
                        </div>

                        <Button type="submit" className="w-full" disabled={isUpdating}>
                            {isUpdating ? <><Spinner className="mr-2 size-4" /> Updating...</> : "Update User"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
