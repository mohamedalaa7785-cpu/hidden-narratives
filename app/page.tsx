import Link from "next/link"

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="heroCinematic">
        <div className="heroOverlay" />
        <div className="heroContent">
          <h1 className="heroTitle">
            <span>Hidden</span> Narratives
          </h1>
          <p className="heroSubtitle">
            Deep historical analysis. Power structures. Lost civilizations.
          </p>

          <Link href="/episodes" className="heroButton">
            Explore Episodes
          </Link>
        </div>
      </section>

      {/* PLATFORM SECTION */}
      <section className="platformSection">
        <h2 className="sectionTitle">Latest Analyses</h2>

        <div className="cinemaGrid">
          {[1,2,3,4,5,6].map((item) => (
            <Link key={item} href="/episodes" className="cinemaCard">
              <div className="cardGlow"></div>
              <h3>Civilization Collapse Pattern</h3>
              <p>Power cycles, structural decay and strategic erosion in empires.</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
