import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home",     label: "Home" },
    { href: "#about",    label: "About" },
    { href: "#skills",   label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#zeroops",  label: "ZeroOps" },
    { href: "#contact",  label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 navbar-backdrop py-4">
      <div className="mx-auto w-11/12 max-w-1600 px-5 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="font-display text-xl font-bold tracking-wide gradient-heading"
        >
          Mohamed<span className="text-white">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium tracking-wider text-[color:var(--muted-text)] hover:text-white transition-colors duration-200 rounded-lg hover:bg-[rgba(124,58,237,0.1)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-xl p-2"
          aria-label="Toggle menu"
        >
          <i className={`fas ${open ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 mx-auto w-11/12 max-w-1600 px-5 pb-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium tracking-wider text-[color:var(--muted-text)] hover:text-white transition-colors duration-200 rounded-lg hover:bg-[rgba(124,58,237,0.1)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}