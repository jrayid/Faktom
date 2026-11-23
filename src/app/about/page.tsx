import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Fakom International Services Ltd",
  description: "Learn about Fakom International Services Ltd, an electrical design, erection and installation company operating in Nigeria since 2005.",
};

export default function AboutPage() {
  return <main id="main"><section className="inner-hero"><div className="container inner-hero-content"><p className="eyebrow"><span className="eyebrow-line"/> About Fakom</p><h1>Electrical solutions<br/><em>for a connected Nigeria.</em></h1><p className="inner-hero-lede">Fakom International Services Ltd is an electrical design, erection and installation company incorporated in Nigeria. Operating since 2005, we work with public and private sector organisations.</p></div></section>
    <section className="section about-purpose"><div className="container purpose-grid"><article><p className="eyebrow">Our mission</p><h2>To provide world-class electrical services to assist Nigeria in the quest to join the most advanced economies in the world.</h2></article><article><p className="eyebrow">Our vision</p><h2>To emerge a key player in Nigeria for global competitiveness by providing standard services and developing local capacity in electrical engineering solutions.</h2></article></div></section>
    <section className="about-context"><div className="container context-grid"><div><p className="eyebrow eyebrow-light">The environment</p><h2>Bridging a<br/><em>capacity gap.</em></h2></div><div><p>Nigeria faces a shortage in electricity supply and limited local capacity in parts of the electrical engineering sector. These conditions make reliable infrastructure and skilled field delivery important.</p><p>Fakom aims to help bridge this gap through electrical design, erection, installation and maintenance work, while contributing to local capacity in electrical engineering solutions.</p></div></div></section>
    <section className="section about-cta"><div className="container cta-inner"><div><p className="eyebrow">Since 2005</p><h2>Let’s build the<br/><em>next connection.</em></h2></div><a className="button button-amber" href="mailto:fakomintlservicesltd@gmail.com?subject=Enquiry">Talk to our team <span aria-hidden="true">↗</span></a></div></section>
  </main>;
}
