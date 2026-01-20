"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputField,
  NumberField,
  TextareaField,
  CheckboxField,
} from "@/components/forms/fields";
import { Button } from "@/components/ui/button";

const menuItemSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  description: z.string(),
  pricePerUnit: z
    .number({ message: "Price is required" })
    .positive({ message: "Price must be positive" }),
  isActive: z.boolean(),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

interface MenufitemFormProps {
  defaultValues?: Partial<MenuItemFormData>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function MenuItemForm({
  defaultValues,
  isLoading = false,
}: MenufitemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues,
  });

  const handleMenuItemFormSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(handleMenuItemFormSubmit)}
      className="space-y-4"
    >
      <InputField
        label="Menu Name"
        required
        error={errors.name?.message}
        disabled={isLoading}
        {...register("name")}
      />
      <NumberField
        label="Menu Price"
        required
        error={errors.pricePerUnit?.message}
        {...register("pricePerUnit")}
      />
      <TextareaField
        label="Menu Description"
        error={errors.description?.message}
        disabled={isLoading}
        {...register("description")}
      />
      <CheckboxField label="Menu available" defaultChecked />
      <div className="flex gap-3 pt-u4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => {}}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
