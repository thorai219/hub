import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Costing SaaS',
  description: 'Restaurant food costing and inventory management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
