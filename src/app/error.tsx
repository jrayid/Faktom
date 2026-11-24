"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" tabIndex={-1}>
      <section className="inner-hero">
        <div className="container inner-hero-content">
          <p className="eyebrow"><span className="eyebrow-line" /> Temporary error</p>
          <h1>Something went<br /><em>wrong.</em></h1>
          <p className="inner-hero-lede">This page could not be loaded just now. Please try again.</p>
          <button className="button button-amber" type="button" onClick={() => reset()}>Try again</button>
        </div>
      </section>
    </main>
  );
}
