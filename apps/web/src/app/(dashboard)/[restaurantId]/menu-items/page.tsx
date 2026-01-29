"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMenuItems } from "@/lib/hooks/useMenuItems";
import { Badge } from "@/components/ui/badge";

export default function MenuItemsPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const {
    data: menuItems,
    isLoading,
    error,
  } = useMenuItems(params.restaurantId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">
          Error loading menu items: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Items</h1>
        <Button>Add Menu Item</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Management</CardTitle>
          <CardDescription>
            {menuItems?.length || 0} menu item(s) in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!menuItems || menuItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No menu items yet</p>
              <Button>Add Your First Menu Item</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.isActive ? (
                        <Badge variant="default">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Recipe: {item.recipe?.name || "No recipe"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${Number(item.sellingPrice).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Food Cost: ${Number(item.foodCostPercent).toFixed(1)}%
                    </p>
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
