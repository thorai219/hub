export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar will go here */}
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white dark:bg-slate-950 border-r">
          <div className="p-6">
            <h2 className="font-bold text-lg">Dashboard</h2>
            {/* Navigation will go here */}
          </div>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
