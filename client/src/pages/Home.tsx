import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, Compass, Mail, Menu, PlayCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageSEO, seoBaseUrl } from "@/lib/seoHead";
import { trpc } from "@/lib/trpc";

const primaryNav = [
  { label: "Home", path: "/" },
  { label: "Episodes", path: "/episodes" },
  { label: "Videos", path: "/videos" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Premium", path: "/premium" },
  { label: "Support", path: "/support" },
];

const legalNav = [
  { label: "Privacy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
  { label: "Disclaimer", path: "/disclaimer" },
];

const featuredEpisodes = [
  {
    title: "The Deep Political Structure of Ancient Egypt",
    summary:
      "A close reading of temples, taxation records, and royal propaganda to explain how ritual authority translated into practical control over labor, grain, and military loyalty.",
  },
  {
    title: "Trade Routes That Rewired Medieval Power",
    summary:
      "An editorial analysis of how caravan finance, port monopolies, and legal institutions helped merchant cities outperform larger empires in strategic influence.",
  },
  {
    title: "How Empires Manufacture Historical Memory",
    summary:
      "A comparative episode on monuments, school texts, and archival silence—showing how states choose what a nation remembers and what it forgets.",
  },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMsg, setSubscribeMsg] = useState<string | null>(null);
  const { data: episodes, isLoading: episodesLoading } = trpc.episodes.list.useQuery();

  usePageSEO({
    title: "Hidden Narratives | Editorial History Platform",
    description:
      "Original editorial history analysis, long-form episodes, and video essays on institutions, power structures, and civilizational change.",
    path: "/",
    keywords: ["historical analysis", "podcast episodes", "hidden narratives", "civilizations", "editorial history"],
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Hidden Narratives",
      url: `${seoBaseUrl}/`,
      inLanguage: ["en", "ar"],
      description:
        "Independent editorial platform for historical analysis, documentary-style episodes, and educational videos.",
      potentialAction: {
        "@type": "SearchAction",
        target: `${seoBaseUrl}/episodes?search={query}`,
        "query-input": "required name=query",
      },
    },
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    setSubscribeMsg(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, language: "en" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Subscription failed");
      setNewsletterEmail("");
      setSubscribeMsg(data.message || "Subscription confirmed.");
    } catch (error: any) {
      setSubscribeMsg(error.message || "Could not subscribe right now.");
    } finally {
      setSubscribing(false);
    }
  };

  const latestEpisodes = useMemo(() => (episodes ?? []).slice(0, 3), [episodes]);
  const categories = useMemo(() => {
    const values = new Set<string>();
    for (const ep of episodes ?? []) {
      if (ep.category) values.add(ep.category);
    }
    return Array.from(values).slice(0, 6);
  }, [episodes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-amber-900/30 bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="text-left text-2xl font-bold tracking-tight text-amber-500"
          >
            Hidden Narratives
          </button>

          <div className="hidden items-center gap-3 text-sm md:flex md:text-base">
            {primaryNav.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="rounded-md px-2 py-1 text-gray-200 transition hover:bg-amber-500/10 hover:text-amber-400"
              >
                {item.label}
              </button>
            ))}
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" aria-label="Open navigation menu">
                <Menu className="h-6 w-6 text-amber-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="h-full w-[88%] border-slate-700 bg-slate-950 text-white">
              <SheetHeader className="border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-xl text-amber-400">Menu</SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>
              <div className="flex h-full flex-col px-2 pb-6">
                <div className="mt-4 space-y-2">
                  {primaryNav.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-md px-4 py-3 text-left text-base text-slate-100 transition hover:bg-amber-500/10 hover:text-amber-300"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="mt-auto border-t border-slate-800 pt-4 text-xs text-slate-400">© 2026 Hidden Narratives</div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <header className="px-4 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
          <section>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-800/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Compass className="h-4 w-4" /> Historical journalism for curious readers
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Hidden Narratives investigates the forces behind history, not just the headlines.
            </h1>
            <p className="mb-5 max-w-3xl text-lg leading-relaxed text-slate-300">
              We publish original essays, podcast episodes, and documentary-style video breakdowns that trace
              how institutions, trade systems, belief frameworks, and elite networks shaped major historical
              outcomes. Instead of repeating textbook summaries, we focus on contested evidence, long-term
              patterns, and the political choices that changed entire societies.
            </p>
            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-slate-300">
              Each piece is written in an editorial voice: readable for general audiences, but grounded in
              serious historical method. If you care about why civilizations rose, how narratives are constructed,
              and what old power struggles still teach us, this archive is built for you.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => navigate("/episodes")}
                className="bg-amber-600 px-6 py-5 text-base font-bold text-black hover:bg-amber-700"
              >
                <BookOpen className="mr-2 h-4 w-4" /> Explore Episodes
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/videos")}
                className="border-amber-600 px-6 py-5 text-base font-bold text-amber-300 hover:bg-amber-800/10"
              >
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Video Essays
              </Button>
            </div>
          </section>

          <Card className="border-amber-900/40 bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-300">Why this site is different</CardTitle>
              <CardDescription className="text-slate-300">
                Hidden Narratives is built around depth, not clickbait.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-200">
              <p>
                We connect episodes to archival context, competing interpretations, and modern relevance so
                readers can see where historical claims come from and why they matter.
              </p>
              <p>
                We avoid generic listicles and recycled AI-style summaries. Instead, we publish themed series
                and long-form analysis that reward repeat visits and serious reading.
              </p>
              <p>
                New readers can start with the featured section below, then follow topic pathways through
                episodes, videos, and background pages.
              </p>
            </CardContent>
          </Card>
        </div>
      </header>

      <main>
        <section className="border-y border-amber-900/30 bg-slate-900/40 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-amber-300 md:text-4xl">Featured episodes</h2>
                <p className="mt-2 max-w-3xl text-slate-300">
                  Start here for original analysis with clear historical framing and practical context.
                </p>
              </div>
              <Button
                onClick={() => navigate("/episodes")}
                variant="outline"
                className="border-amber-700 text-amber-300 hover:bg-amber-800/10"
              >
                View all episodes
              </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {featuredEpisodes.map((episode) => (
                <Card key={episode.title} className="h-full border-amber-900/40 bg-slate-950/70">
                  <CardHeader>
                    <CardTitle className="text-xl text-amber-300">{episode.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="leading-relaxed text-slate-300">{episode.summary}</p>
                    <button
                      onClick={() => navigate("/episodes")}
                      className="font-semibold text-amber-400 transition hover:text-amber-300"
                    >
                      Read episode analysis →
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-amber-300 md:text-4xl">Latest episodes</h2>
                <p className="mt-2 max-w-3xl text-slate-300">Freshly published editorial breakdowns from the archive.</p>
              </div>
              <Button onClick={() => navigate("/episodes")} variant="outline" className="border-amber-700 text-amber-300 hover:bg-amber-800/10">
                Browse archive
              </Button>
            </div>
            {episodesLoading ? (
              <div className="grid gap-5 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Card key={idx} className="border-amber-900/40 bg-slate-950/70 p-6">
                    <Skeleton className="mb-4 h-6 w-3/4 bg-slate-700" />
                    <Skeleton className="mb-2 h-4 w-full bg-slate-800" />
                    <Skeleton className="mb-2 h-4 w-full bg-slate-800" />
                    <Skeleton className="h-4 w-2/3 bg-slate-800" />
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-3">
                {latestEpisodes.map((episode: any) => (
                  <Card key={episode.slug} className="h-full border-amber-900/40 bg-slate-950/70">
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-xl text-amber-300">{episode.titleEn}</CardTitle>
                      <CardDescription className="text-slate-400">{episode.category ?? "history"}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="line-clamp-4 leading-relaxed text-slate-300">{episode.descriptionEn}</p>
                      <button onClick={() => navigate(`/episodes/${episode.slug}`)} className="font-semibold text-amber-400 transition hover:text-amber-300">Read full episode →</button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="border-y border-amber-900/30 bg-slate-900/30 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-amber-300 md:text-4xl">Categories</h2>
            <p className="mt-2 max-w-3xl text-slate-300">Explore episodes by thematic lens.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button key={category} onClick={() => navigate("/episodes")} className="rounded-full border border-amber-700/50 bg-amber-900/10 px-4 py-2 text-sm font-semibold capitalize text-amber-200 hover:bg-amber-700/20">
                  {category}
                </button>
              ))}
              {!categories.length && <p className="text-slate-400">Categories will appear as new episodes are published.</p>}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-8 rounded-xl border border-amber-900/30 bg-slate-900/50 p-6 md:grid-cols-[1fr,auto] md:items-center md:p-10">
            <div>
              <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Follow the archive as it grows</h2>
              <p className="max-w-2xl text-slate-300">
                Join our weekly dispatch for upcoming episodes, behind-the-scenes research notes, and curated
                reading lists that help you go deeper than each published piece.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full flex-col gap-3 md:w-[320px]">
              <Input
                type="email"
                value={newsletterEmail}
                required
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-amber-900/40 bg-slate-950 text-white"
              />
              <Button type="submit" disabled={subscribing} className="bg-amber-600 font-bold text-black hover:bg-amber-700">
                <Mail className="mr-2 h-4 w-4" /> {subscribing ? "Subscribing..." : "Subscribe"}
              </Button>
              {subscribeMsg && <p className="text-xs text-slate-300">{subscribeMsg}</p>}
            </form>
          </div>
        </section>

        <section className="px-4 pb-16 md:pb-24">
          <div className="mx-auto max-w-5xl rounded-xl border border-amber-900/30 bg-slate-900/50 p-8 text-center">
            <h2 className="text-3xl font-bold text-amber-300 md:text-4xl">Ready to explore?</h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-300">
              Move from broad history to source-aware analysis in a few clicks. Browse episodes by theme,
              watch companion videos, and use our legal and editorial pages to understand how the project works.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button onClick={() => navigate("/episodes")} className="bg-amber-600 font-bold text-black hover:bg-amber-700">
                Go to Episodes
              </Button>
              <Button onClick={() => navigate("/about")} variant="outline" className="border-amber-700 text-amber-300 hover:bg-amber-800/10">
                About Hidden Narratives
              </Button>
            </div>
          </div>
        </section>
      </main>

      <section className="px-4 pb-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-amber-900/30 bg-slate-900/50 p-5">
            <h3 className="text-lg font-semibold text-amber-300">Premium research PDFs</h3>
            <p className="mt-2 text-sm text-slate-300">Access paid reports with dense timelines, source notes, and concise strategic summaries.</p>
            <button onClick={() => navigate('/premium')} className="mt-3 text-sm font-semibold text-amber-400 hover:text-amber-300">Explore premium reports →</button>
          </div>
          <div className="rounded-xl border border-amber-900/30 bg-slate-900/50 p-5">
            <h3 className="text-lg font-semibold text-amber-300">Sponsorships</h3>
            <p className="mt-2 text-sm text-slate-300">Sponsor a themed historical series and reach an audience interested in deep research.</p>
            <button onClick={() => navigate('/contact')} className="mt-3 text-sm font-semibold text-amber-400 hover:text-amber-300">Request sponsorship deck →</button>
          </div>
          <div className="rounded-xl border border-amber-900/30 bg-slate-900/50 p-5">
            <h3 className="text-lg font-semibold text-amber-300">Support independent work</h3>
            <p className="mt-2 text-sm text-slate-300">Help fund archival research, translation, and production through direct support.</p>
            <button onClick={() => navigate('/support')} className="mt-3 text-sm font-semibold text-amber-400 hover:text-amber-300">Support Hidden Narratives →</button>
          </div>
        </div>
      </section>

      <footer className="border-t border-amber-900/30 bg-black px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold text-amber-400">Hidden Narratives</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Original editorial history content focused on power, institutions, and long-term civilizational change.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-amber-400">Browse</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {primaryNav.map((item) => (
                <li key={item.path}>
                  <button onClick={() => navigate(item.path)} className="transition hover:text-amber-300">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-amber-400">Policies</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {legalNav.map((item) => (
                <li key={item.path}>
                  <button onClick={() => navigate(item.path)} className="transition hover:text-amber-300">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">© 2026 Hidden Narratives. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
