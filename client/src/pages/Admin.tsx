import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [, navigate] = useLocation();
  return (
    <div className="p-6 max-w-3xl mx-auto text-white space-y-3">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p>Moderate payments, subscriptions, and system operations.</p>
      <Button onClick={() => navigate("/admin/payments")}>Manage Payments</Button>
    </div>
  );
}
