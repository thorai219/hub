"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const restaurantNavItems: NavItem[] = [
  { label: "Dashboard", href: "" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Recipes", href: "/recipes" },
  { label: "Menu Items", href: "/menu-items" },
  { label: "Purchases", href: "/purchases" },
  { label: "Inventory", href: "/inventory" },
  { label: "Sales", href: "/sales" },
  { label: "Reports", href: "/reports" },
];

export function Sidebar() {
  const params = useParams();
  const pathname = usePathname();
  const restaurantId = params?.restaurantId as string | undefined;

  // If no restaurant selected, show restaurant selection nav
  if (!restaurantId) {
    return (
      <aside className="w-64 min-h-screen bg-background border-r">
        <div className="p-6">
          <h2 className="font-bold text-xl mb-6">Food Costing</h2>
          <nav className="space-y-2">
            <Link
              href="/restaurants"
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/restaurants"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              My Restaurants
            </Link>
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 min-h-screen bg-background border-r">
      <div className="p-6">
        <Link href="/restaurants" className="block mb-6">
          <h2 className="font-bold text-xl">Food Costing</h2>
          <p className="text-xs text-muted-foreground">Restaurant Dashboard</p>
        </Link>

        <nav className="space-y-1">
          {restaurantNavItems.map((item) => {
            const href = `/${restaurantId}${item.href}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t">
          <Link
            href="/restaurants"
            className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            ← Switch Restaurant
          </Link>
        </div>
      </div>
    </aside>
  );
}
