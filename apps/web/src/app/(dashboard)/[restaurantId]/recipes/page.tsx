"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRecipes } from "@/lib/hooks/useRecipes";
import { Badge } from "@/components/ui/badge";

export default function RecipesPage({ params }: { params: { restaurantId: string } }) {
  const { data: recipes, isLoading, error } = useRecipes(params.restaurantId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Error loading recipes: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <Button>Create Recipe</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recipe Management</CardTitle>
          <CardDescription>
            {recipes?.length || 0} recipe(s) in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!recipes || recipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No recipes yet</p>
              <Button>Create Your First Recipe</Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    {recipe.description && (
                      <CardDescription className="line-clamp-2">
                        {recipe.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-muted-foreground">Servings: {recipe.servings}</p>
                        <p className="text-muted-foreground">
                          {recipe.ingredients?.length || 0} ingredient(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${Number(recipe.totalCost).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">total cost</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
