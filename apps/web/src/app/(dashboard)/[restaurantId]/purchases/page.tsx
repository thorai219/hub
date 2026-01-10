import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PurchasesPage({ params }: { params: { restaurantId: string } }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Purchases</h1>
        <Button>Record Purchase</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Track your ingredient purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Purchase list coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
