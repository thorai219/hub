"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { InputField, SelectField, NumberField, TextareaField } from "../fields";
import type { Ingredient } from "@repo/types";

const recipeIngredientSchema = z.object({
  ingredientId: z.string({ message: "Please select an ingredient" }).min(1),
  quantity: z
    .number({ message: "Quantity is required" })
    .positive({ message: "Quantity must be positive" }),
});

const recipeSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  description: z.string().optional(),
  servings: z
    .number({ message: "Servings is required" })
    .int()
    .positive({ message: "Servings must be a positive number" }),
  ingredients: z
    .array(recipeIngredientSchema)
    .min(1, { message: "At least one ingredient is required" }),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  defaultValues?: Partial<RecipeFormData>;
  availableIngredients: Ingredient[];
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function RecipeForm({
  defaultValues,
  availableIngredients,
  onCancel,
  isLoading = false,
  submitLabel = "Save Recipe",
}: RecipeFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      servings: 1,
      ingredients: [{ ingredientId: "", quantity: 0 }],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const ingredientOptions = availableIngredients.map((ing) => ({
    value: ing.id,
    label: `${ing.name} (${ing.unit})`,
  }));

  const handleRecipeformSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(handleRecipeformSubmit)} className="space-y-6">
      <div className="space-y-4">
        <InputField
          label="Recipe Name"
          placeholder="e.g., House Burger"
          required
          error={errors.name?.message}
          disabled={isLoading}
          {...register("name")}
        />

        <TextareaField
          label="Description"
          placeholder="Brief description of the recipe (optional)"
          error={errors.description?.message}
          disabled={isLoading}
          {...register("description")}
        />

        <NumberField
          label="Number of Servings"
          placeholder="1"
          required
          error={errors.servings?.message}
          disabled={isLoading}
          {...register("servings", { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Ingredients</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ ingredientId: "", quantity: 0 })}
            disabled={isLoading}
          >
            + Add Ingredient
          </Button>
        </div>

        {errors.ingredients?.root && (
          <p className="text-sm text-destructive">
            {errors.ingredients.root.message}
          </p>
        )}

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-start">
              <div className="flex-1">
                <SelectField
                  label={index === 0 ? "Ingredient" : ""}
                  options={ingredientOptions}
                  placeholder="Select ingredient"
                  required
                  error={errors.ingredients?.[index]?.ingredientId?.message}
                  disabled={isLoading}
                  {...register(`ingredients.${index}.ingredientId`)}
                />
              </div>

              <div className="w-32">
                <NumberField
                  label={index === 0 ? "Quantity" : ""}
                  placeholder="0"
                  required
                  error={errors.ingredients?.[index]?.quantity?.message}
                  disabled={isLoading}
                  {...register(`ingredients.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="pt-8">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={isLoading || fields.length === 1}
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
