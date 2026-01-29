"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInventory } from "@/lib/hooks/useInventory";

export default function InventoryPage({ params }: { params: { restaurantId: string } }) {
  const { data: inventory, isLoading, error } = useInventory(params.restaurantId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Error loading inventory: {error.message}</p>
      </div>
    );
  }

  const totalValue = inventory?.reduce((sum, count) => sum + Number(count.value), 0) || 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Button>Record Count</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Items Counted</CardDescription>
            <CardTitle className="text-3xl">{inventory?.length || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Inventory Value</CardDescription>
            <CardTitle className="text-3xl">${totalValue.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Counts</CardTitle>
          <CardDescription>
            {inventory?.length || 0} ingredient(s) counted
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!inventory || inventory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No inventory counts yet</p>
              <Button>Record Your First Count</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {inventory.map((count) => {
                const countDate = new Date(count.countedAt);
                return (
                  <div
                    key={count.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {count.ingredient?.name || 'Unknown Ingredient'}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          {count.quantity} {count.ingredient?.unit}
                        </span>
                        <span>•</span>
                        <span>{countDate.toLocaleDateString()}</span>
                        {count.countedBy && (
                          <>
                            <span>•</span>
                            <span>By: {count.countedBy}</span>
                          </>
                        )}
                      </div>
                      {count.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {count.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${Number(count.value).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">value</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
