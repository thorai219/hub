import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InventoryPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Button variant="destructive" size="lg">
          Record Count
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
          <CardDescription>Track stock levels and values</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Inventory tracking coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
