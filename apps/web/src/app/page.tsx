import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            🍜 Food Costing SaaS
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Professional restaurant food costing and inventory management
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 Ingredients
                <Badge>Ready</Badge>
              </CardTitle>
              <CardDescription>
                Track ingredient costs and suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Manage your ingredient catalog with real-time pricing and
                supplier information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                👨‍🍳 Recipes
                <Badge>Ready</Badge>
              </CardTitle>
              <CardDescription>Build and cost your recipes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Create recipes with ingredient lists and calculate accurate
                per-serving costs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🍽️ Menu Items
                <Badge>Ready</Badge>
              </CardTitle>
              <CardDescription>Manage your menu pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Link menu items to recipes and track food cost percentages in
                real-time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Reports
                <Badge>Ready</Badge>
              </CardTitle>
              <CardDescription>Analyze your costs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate comprehensive food cost reports and profitability
                analysis.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>All Features</CardTitle>
            <CardDescription>
              Complete restaurant management solution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span>Recipe management & costing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span>Ingredient tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span>Purchase order management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span>Inventory counts</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span>Sales tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span>Food cost reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span>Multi-restaurant support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">✓</Badge>
                  <span>Real-time analytics</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
