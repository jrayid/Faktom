"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header"><div className="container header-inner">
    <Link className="brand" href="/" aria-label="Fakom International Services Ltd home" onClick={close}><span className="brand-symbol">F<span>.</span></span><span className="brand-name">FAKOM<span>INTERNATIONAL SERVICES LTD</span></span></Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}><span className="sr-only">{open ? "Close" : "Open"} menu</span><span/><span/></button>
    <nav id="primary-nav" className={open ? "nav nav-open" : "nav"} aria-label="Primary navigation"><Link href="/services" onClick={close}>Services</Link><Link href="/grid-maintenance" onClick={close}>Grid maintenance</Link><Link href="/projects" onClick={close}>Projects</Link><Link href="/team" onClick={close}>Team</Link><Link href="/coverage" onClick={close}>Coverage</Link><Link href="/about" onClick={close}>About</Link><a className="nav-contact" href="mailto:fakomintlservicesltd@gmail.com?subject=Enquiry" onClick={close}>Get in touch <span aria-hidden="true">↗</span></a></nav>
  </div></header>;
}
