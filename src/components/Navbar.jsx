import React from "react";
import { useTheme } from "../ThemeContext";
import { useLang } from "../LanguageContext";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { dark, toggle } = useTheme();
  const { lang, t, toggleLang } = useLang();

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#zeroops", label: t.nav.zeroops },
    { href: "#contact", label: t.nav.contact },
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

        {/* Desktop Links + Controls */}
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

          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="ml-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--glass-border)",
              color: "var(--accent-text)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--social-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--glass)"; }}
            aria-label="Switch language"
            title={lang === "en" ? "Passer en français" : "Switch to English"}
          >
            {lang === "en" ? "FR" : "EN"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className={`theme-toggle ml-2 ${!dark ? "is-light" : ""}`}
            aria-label="Toggle dark/light mode"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="sr-only">{dark ? "Light mode" : "Dark mode"}</span>
          </button>
          <span className="ml-1 text-sm" style={{ color: "var(--muted-text)" }}>
            {dark ? <i className="fas fa-moon" /> : <i className="fas fa-sun" />}
          </span>
        </div>

        {/* Mobile: Controls + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1 rounded-full text-xs font-bold tracking-wider"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--glass-border)",
              color: "var(--accent-text)",
            }}
            aria-label="Switch language"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
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