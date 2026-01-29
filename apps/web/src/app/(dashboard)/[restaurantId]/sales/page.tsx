"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSales } from "@/lib/hooks/useSales";
import { Badge } from "@/components/ui/badge";

export default function SalesPage({ params }: { params: { restaurantId: string } }) {
  const { data: sales, isLoading, error } = useSales(params.restaurantId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading sales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Error loading sales: {error.message}</p>
      </div>
    );
  }

  const totalRevenue = sales?.reduce((sum, sale) => sum + Number(sale.totalPrice), 0) || 0;
  const totalQuantity = sales?.reduce((sum, sale) => sum + sale.quantity, 0) || 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales</h1>
        <Button>Record Sale</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">${totalRevenue.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Sales</CardDescription>
            <CardTitle className="text-3xl">{sales?.length || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Items Sold</CardDescription>
            <CardTitle className="text-3xl">{totalQuantity}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
          <CardDescription>
            {sales?.length || 0} sale record(s) in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!sales || sales.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No sales records yet</p>
              <Button>Record Your First Sale</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sales.map((sale) => {
                const saleDate = new Date(sale.soldAt);
                return (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {sale.menuItem?.name || 'Unknown Item'}
                        </h3>
                        <Badge variant="secondary">x{sale.quantity}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {saleDate.toLocaleDateString()} at {saleDate.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${Number(sale.totalPrice).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        ${(Number(sale.totalPrice) / sale.quantity).toFixed(2)} each
                      </p>
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
