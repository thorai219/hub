"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRestaurants, useCreateRestaurant } from "@/lib/hooks/useRestaurants";
import { InputField } from "@/components/forms/fields";
import { useForm } from "react-hook-form";

export default function RestaurantsPage() {
  const { data: restaurants, isLoading } = useRestaurants();
  const createRestaurant = useCreateRestaurant();
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    await createRestaurant.mutateAsync(data);
    setShowForm(false);
    reset();
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading restaurants...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Restaurants</h1>
        {!showForm && <Button onClick={() => setShowForm(true)}>Add Restaurant</Button>}
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>New Restaurant</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField label="Name" required {...register("name")} />
              <InputField label="Address" {...register("address")} />
              <InputField label="Phone" {...register("phone")} />
              <InputField label="Cuisine Type" {...register("cuisineType")} />
              <div className="flex gap-2">
                <Button type="submit">Create</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {!restaurants || restaurants.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">No restaurants yet</p>
            <Button onClick={() => setShowForm(true)}>Add Your First Restaurant</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Link key={restaurant.id} href={`/${restaurant.id}`}>
              <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle>{restaurant.name}</CardTitle>
                  {restaurant.cuisineType && (
                    <CardDescription>{restaurant.cuisineType}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {restaurant.address && (
                    <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                  )}
                  {restaurant.phone && (
                    <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
