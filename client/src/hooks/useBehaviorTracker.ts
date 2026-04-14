import { useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";

export function useBehaviorTracker(page: string) {
  const track = trpc.behavior.track.useMutation();
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const onUnload = () => {
      const timeSpent = Math.floor((Date.now() - startedAt.current) / 1000);
      track.mutate({ page, timeSpent, interaction: "page_exit" });
    };

    const onScroll = () => {
      track.mutate({ page, timeSpent: 0, interaction: "scroll" });
    };

    const onClick = () => {
      track.mutate({ page, timeSpent: 0, interaction: "click" });
    };

    window.addEventListener("beforeunload", onUnload);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("click", onClick);

    return () => {
      onUnload();
      window.removeEventListener("beforeunload", onUnload);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, [page]);
}
