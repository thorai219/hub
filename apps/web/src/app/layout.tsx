import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Costing SaaS",
  description: "Restaurant food costing and inventory management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased max-w-7xl m-auto">
        {children}
      </body>
    </html>
  );
}
