import { useState } from "react";
import { Button } from "@/common/@atoms/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/@atoms/card";
import { Input } from "@/common/@atoms/input";
import { Label } from "@/common/@atoms/label";
import { useCreateOutlet } from "@/api/queries/useOutlets";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/common/@atoms/spinner";

export default function CreateOutlet() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const { mutate: createOutlet, isPending } = useCreateOutlet();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createOutlet(
            { name, address },
            {
                onSuccess: () => navigate("/outlets")
            }
        );
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Create New Outlet</h1>
                <Button variant="outlined" onClick={() => navigate("/outlets")}>
                    Cancel
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Outlet Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Outlet Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Main Branch"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="123 Market St"
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? <><Spinner className="mr-2 size-4" /> Creating...</> : "Create Outlet"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
