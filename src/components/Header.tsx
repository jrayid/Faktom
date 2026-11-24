"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const isCurrent = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Fakom International Services Ltd home" onClick={close}>
          <span className="brand-symbol">F<span>.</span></span>
          <span className="brand-name">FAKOM<span>INTERNATIONAL SERVICES LTD</span></span>
        </Link>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <span className="sr-only">{open ? "Close" : "Open"} menu</span><span /><span />
        </button>
        <nav id="primary-nav" className={open ? "nav nav-open" : "nav"} aria-label="Primary navigation">
          <Link href="/services" aria-current={isCurrent("/services") ? "page" : undefined} onClick={close}>Services</Link>
          <Link href="/grid-maintenance" aria-current={isCurrent("/grid-maintenance") ? "page" : undefined} onClick={close}>Grid maintenance</Link>
          <Link href="/projects" aria-current={isCurrent("/projects") ? "page" : undefined} onClick={close}>Projects</Link>
          <Link href="/team" aria-current={isCurrent("/team") ? "page" : undefined} onClick={close}>Team</Link>
          <Link href="/coverage" aria-current={isCurrent("/coverage") ? "page" : undefined} onClick={close}>Coverage</Link>
          <Link href="/about" aria-current={isCurrent("/about") ? "page" : undefined} onClick={close}>About</Link>
          <Link className="nav-contact" href="/contact" aria-current={isCurrent("/contact") ? "page" : undefined} onClick={close}>Get in touch <span aria-hidden="true">&#8594;</span></Link>
        </nav>
      </div>
    </header>
  );
}
