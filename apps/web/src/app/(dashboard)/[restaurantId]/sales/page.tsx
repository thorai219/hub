import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SalesPage({ params }: { params: { restaurantId: string } }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales</h1>
        <Button>Record Sale</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
          <CardDescription>Track daily sales data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Sales tracking coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
