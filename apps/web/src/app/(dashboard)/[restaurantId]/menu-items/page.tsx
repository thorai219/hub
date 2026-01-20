import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItemForm } from "@/components/forms/domain";

export default function MenuItemsPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Items</h1>
        <Button size="sm">Add Menu Item</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Menu Management</CardTitle>
          <CardDescription>
            Manage your menu pricing and food cost %
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MenuItemForm />
        </CardContent>
      </Card>
    </div>
  );
}
