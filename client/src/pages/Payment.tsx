import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function PaymentPage() {
  const [amount, setAmount] = useState(15);
  const [method, setMethod] = useState<"Instapay" | "Mobile Wallet">("Instapay");
  const [referenceNote, setReferenceNote] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const submit = trpc.payments.submit.useMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit.mutateAsync({ amount, method, referenceNote, screenshotUrl: screenshotUrl || undefined });
    alert("Payment submitted and pending admin approval.");
    setReferenceNote("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white space-y-4">
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader><CardTitle>Payment Instructions</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Send payment to the number above via Instapay or Wallet.</p>
          <p><strong>Phone:</strong> 01210708572</p>
          <p><strong>WhatsApp:</strong> 01210708572</p>
          <p><strong>Email:</strong> hiddennarratives.contact@gmail.com</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader><CardTitle>Submit Payment Proof</CardTitle></CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={onSubmit}>
            <Input type="number" min={1} value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" required />
            <select value={method} onChange={(e) => setMethod(e.target.value as any)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2">
              <option>Instapay</option>
              <option>Mobile Wallet</option>
            </select>
            <Textarea value={referenceNote} onChange={(e) => setReferenceNote(e.target.value)} placeholder="Reference note" required />
            <Input value={screenshotUrl} onChange={(e) => setScreenshotUrl(e.target.value)} placeholder="Screenshot URL (optional)" />
            <Button type="submit" disabled={submit.isPending}>{submit.isPending ? "Submitting..." : "Submit Payment"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
