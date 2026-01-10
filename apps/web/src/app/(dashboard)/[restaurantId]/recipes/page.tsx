import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecipesPage({ params }: { params: { restaurantId: string } }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <Button>Create Recipe</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recipe Management</CardTitle>
          <CardDescription>Build and cost your recipes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Recipe list coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
