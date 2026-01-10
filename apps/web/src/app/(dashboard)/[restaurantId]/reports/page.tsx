import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage({ params }: { params: { restaurantId: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Food Cost Report</CardTitle>
            <CardDescription>Analyze your food cost percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Report coming soon...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Analysis</CardTitle>
            <CardDescription>Top selling items and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Report coming soon...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Value</CardTitle>
            <CardDescription>Current stock valuation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Report coming soon...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profitability</CardTitle>
            <CardDescription>Menu item profitability analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Report coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
