"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePurchases } from "@/lib/hooks/usePurchases";

export default function PurchasesPage({ params }: { params: { restaurantId: string } }) {
  const { data: purchases, isLoading, error } = usePurchases(params.restaurantId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading purchases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Error loading purchases: {error.message}</p>
      </div>
    );
  }

  const totalSpent = purchases?.reduce((sum, purchase) => sum + Number(purchase.totalAmount), 0) || 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Purchases</h1>
        <Button>Record Purchase</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Purchases</CardDescription>
            <CardTitle className="text-3xl">{purchases?.length || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Spent</CardDescription>
            <CardTitle className="text-3xl">${totalSpent.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>
            {purchases?.length || 0} purchase(s) recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!purchases || purchases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No purchases yet</p>
              <Button>Record Your First Purchase</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {purchases.map((purchase) => {
                const purchaseDate = new Date(purchase.purchasedAt);
                return (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{purchase.supplier}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{purchaseDate.toLocaleDateString()}</span>
                        {purchase.invoiceNo && (
                          <>
                            <span>•</span>
                            <span>Invoice: {purchase.invoiceNo}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{purchase.items?.length || 0} item(s)</span>
                      </div>
                      {purchase.notes && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {purchase.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${Number(purchase.totalAmount).toFixed(2)}</p>
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
