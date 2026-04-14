import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBehaviorTracker } from "@/hooks/useBehaviorTracker";

export default function TasksPage() {
  useBehaviorTracker("/tasks");
  const [goal, setGoal] = useState("");
  const generate = trpc.tasks.generate.useMutation();
  const tasks = trpc.tasks.mine.useQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generate.mutateAsync({ goal });
    setGoal("");
    tasks.refetch();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white space-y-4">
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader><CardTitle>Task Generator</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Finish project in 2 weeks" required />
            <Button type="submit" disabled={generate.isPending}>{generate.isPending ? "Generating..." : "Generate"}</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader><CardTitle>My Generated Plans</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {tasks.data?.map((item) => (
            <div key={item.id} className="border border-slate-700 rounded p-3">
              <p className="font-semibold">{item.input}</p>
              <pre className="text-sm whitespace-pre-wrap mt-2">{item.result}</pre>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
