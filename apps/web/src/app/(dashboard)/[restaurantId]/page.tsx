import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RestaurantDashboard({ params }: { params: { restaurantId: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Food Cost %</CardTitle>
            <CardDescription>Target vs Actual</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Value</CardTitle>
            <CardDescription>Current stock</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock</CardTitle>
            <CardDescription>Items to reorder</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
