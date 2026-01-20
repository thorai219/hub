"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  InputField,
  SelectField,
  NumberField,
} from "@/components/forms/fields";
import type { IngredientUnit, IngredientCategory } from "@repo/types";

const UNITS: IngredientUnit[] = [
  "LBS",
  "OZ",
  "KG",
  "G",
  "GALLON",
  "LITER",
  "ML",
  "COUNT",
  "CUP",
  "TBSP",
  "TSP",
];
const CATEGORIES: IngredientCategory[] = [
  "PROTEIN",
  "PRODUCE",
  "PANTRY",
  "SAUCE",
  "DAIRY",
  "SPICE",
  "OTHER",
];

const ingredientSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  unit: z.enum(UNITS as [IngredientUnit, ...IngredientUnit[]], {
    message: "Please select a unit",
  }),
  pricePerUnit: z
    .number({ message: "Price is required" })
    .positive({ message: "Price must be positive" }),
  category: z.enum(
    CATEGORIES as [IngredientCategory, ...IngredientCategory[]],
    { message: "Please select a category" },
  ),
  supplier: z.string().optional(),
});

type IngredientFormData = z.infer<typeof ingredientSchema>;

interface IngredientFormProps {
  defaultValues?: Partial<IngredientFormData>;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function IngredientForm({
  defaultValues,
  onCancel,
  isLoading = false,
  submitLabel = "Save Ingredient",
}: IngredientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IngredientFormData>({
    resolver: zodResolver(ingredientSchema),
    defaultValues,
  });

  const handleIngredientFormSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(handleIngredientFormSubmit)}
      className="space-y-4"
    >
      <InputField
        label="Ingredient Name"
        placeholder="e.g., Chicken Breast"
        required
        error={errors.name?.message}
        disabled={isLoading}
        {...register("name")}
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Unit"
          options={UNITS}
          placeholder="Select unit"
          required
          error={errors.unit?.message}
          disabled={isLoading}
          {...register("unit")}
        />

        <NumberField
          label="Price per Unit"
          prefix="$"
          placeholder="0.00"
          required
          error={errors.pricePerUnit?.message}
          disabled={isLoading}
          {...register("pricePerUnit", { valueAsNumber: true })}
        />
      </div>

      <SelectField
        label="Category"
        options={CATEGORIES}
        placeholder="Select category"
        required
        error={errors.category?.message}
        disabled={isLoading}
        {...register("category")}
      />

      <InputField
        label="Supplier"
        placeholder="e.g., Sysco (optional)"
        error={errors.supplier?.message}
        disabled={isLoading}
        {...register("supplier")}
      />

      <div className="flex gap-3 justify-end pt-u4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
