'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIngredients, useCreateIngredient } from '@/lib/hooks/useIngredients';

export default function IngredientsPage({ params }: { params: { restaurantId: string } }) {
  const { data: ingredients, isLoading, error } = useIngredients(params.restaurantId);
  const createIngredient = useCreateIngredient(params.restaurantId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading ingredients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Error loading ingredients: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ingredients</h1>
        <Button>Add Ingredient</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ingredient Catalog</CardTitle>
          <CardDescription>
            {ingredients?.length || 0} ingredient(s) in your catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!ingredients || ingredients.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No ingredients yet</p>
              <Button>Add Your First Ingredient</Button>
            </div>
          ) : (
            <div className="space-y-2">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div>
                    <h3 className="font-medium">{ingredient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ingredient.category} • {ingredient.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${Number(ingredient.pricePerUnit).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">per {ingredient.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
