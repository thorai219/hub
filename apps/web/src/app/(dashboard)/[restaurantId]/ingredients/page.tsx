import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IngredientForm } from "@/components/forms/domain";

export default function IngredientsPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  return (
    <div style={{ maxWidth: "100rem", margin: "auto" }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ingredients</h1>
        <Button>Add Ingredient</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ingredient Catalog</CardTitle>
          <CardDescription>Manage your ingredients and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <IngredientForm />
        </CardContent>
      </Card>
    </div>
  );
}
