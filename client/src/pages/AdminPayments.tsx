import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPaymentsPage() {
  const { data, refetch, isLoading } = trpc.payments.adminList.useQuery();
  const decision = trpc.payments.adminDecision.useMutation();

  if (isLoading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-white space-y-4">
      <h1 className="text-3xl font-bold">Admin Payments</h1>
      {data?.map((payment) => (
        <Card key={payment.id} className="bg-slate-900 border-slate-700">
          <CardHeader><CardTitle>Payment #{payment.id}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p>Amount: {payment.amount}</p>
            <p>Method: {payment.method}</p>
            <p>Status: {payment.status}</p>
            <p>Reference: {payment.referenceNote}</p>
            <div className="flex gap-2">
              <Button onClick={async () => { await decision.mutateAsync({ paymentId: payment.id, status: "approved" }); refetch(); }}>Approve</Button>
              <Button variant="outline" onClick={async () => { await decision.mutateAsync({ paymentId: payment.id, status: "rejected" }); refetch(); }}>Reject</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
