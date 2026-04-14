import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBehaviorTracker } from "@/hooks/useBehaviorTracker";

export default function DashboardPage() {
  useBehaviorTracker("/dashboard");
  const { data, isLoading } = trpc.dashboard.mine.useQuery();

  if (isLoading) return <div className="p-6 text-white">Loading dashboard...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-4 text-white">
      <Card className="bg-slate-900 border-slate-700"><CardHeader><CardTitle>My Research</CardTitle></CardHeader><CardContent>{data?.research?.length ?? 0} items</CardContent></Card>
      <Card className="bg-slate-900 border-slate-700"><CardHeader><CardTitle>My Tasks</CardTitle></CardHeader><CardContent>{data?.tasks?.length ?? 0} items</CardContent></Card>
      <Card className="bg-slate-900 border-slate-700"><CardHeader><CardTitle>Saved Stories</CardTitle></CardHeader><CardContent>{data?.savedStories?.length ?? 0} items</CardContent></Card>
      <Card className="bg-slate-900 border-slate-700"><CardHeader><CardTitle>Payment Status</CardTitle></CardHeader><CardContent>{data?.payments?.[0]?.status ?? "No payments yet"}</CardContent></Card>
      <Card className="bg-slate-900 border-slate-700 lg:col-span-2"><CardHeader><CardTitle>Subscription Plan</CardTitle></CardHeader><CardContent>Plan: {data?.subscription?.plan ?? "free"} / Credits: {data?.subscription?.credits ?? 0}</CardContent></Card>
    </div>
  );
}
