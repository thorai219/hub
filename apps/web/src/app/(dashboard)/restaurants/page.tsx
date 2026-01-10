import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RestaurantsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Restaurants</h1>
      <Card>
        <CardHeader>
          <CardTitle>Restaurants</CardTitle>
          <CardDescription>Manage your restaurants</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Restaurant list coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
