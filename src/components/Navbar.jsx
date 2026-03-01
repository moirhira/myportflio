import React from "react";
import { useTheme } from "../ThemeContext";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { dark, toggle } = useTheme();

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
          Mohamed<span style={{ color: "var(--light-text)" }}>.</span>
        </a>

        {/* Desktop Links + Toggle */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium tracking-wider transition-colors duration-200 rounded-lg"
              style={{ color: "var(--muted-text)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--light-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-text)")}
            >
              {l.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className={`theme-toggle ml-3 ${!dark ? "is-light" : ""}`}
            aria-label="Toggle dark/light mode"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="sr-only">{dark ? "Light mode" : "Dark mode"}</span>
          </button>
          <span className="ml-2 text-sm" style={{ color: "var(--muted-text)" }}>
            {dark ? (
              <i className="fas fa-moon" />
            ) : (
              <i className="fas fa-sun" />
            )}
          </span>
        </div>

        {/* Mobile: Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className={`theme-toggle ${!dark ? "is-light" : ""}`}
            aria-label="Toggle dark/light mode"
          />
          <span className="text-sm" style={{ color: "var(--muted-text)" }}>
            {dark ? <i className="fas fa-moon" /> : <i className="fas fa-sun" />}
          </span>
          <button
            onClick={() => setOpen(!open)}
            className="text-xl p-2"
            style={{ color: "var(--light-text)" }}
            aria-label="Toggle menu"
          >
            <i className={`fas ${open ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 mx-auto w-11/12 max-w-1600 px-5 pb-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium tracking-wider transition-colors duration-200 rounded-lg"
              style={{ color: "var(--muted-text)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}