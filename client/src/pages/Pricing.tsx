import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const plans = [
  { name: "Free", credits: 20, desc: "Limited usage" },
  { name: "Pro", credits: 300, desc: "For creators and researchers" },
  { name: "Premium", credits: 5000, desc: "High-volume / near-unlimited" },
];

export default function PricingPage() {
  const [, navigate] = useLocation();

  return (
    <div className="p-6 max-w-5xl mx-auto text-white grid md:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <Card key={plan.name} className="bg-slate-900 border-slate-700">
          <CardHeader><CardTitle>{plan.name}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p>{plan.desc}</p>
            <p className="text-amber-400">{plan.credits} credits</p>
            <Button onClick={() => navigate(`/payment?plan=${plan.name.toLowerCase()}`)} className="w-full">Select Plan</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
