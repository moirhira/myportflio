import React from "react";

export default function Footer() {
  return (
    <footer className="relative py-10" style={{ background: "var(--darker-bg)", transition: "background 0.3s ease" }}>
      {/* Top divider */}
      <div className="section-divider mb-10" />

      <div className="mx-auto w-11/12 max-w-1600 px-5 flex flex-col items-center gap-6">
        {/* Tagline */}
        <p className="text-sm italic text-center" style={{ color: "var(--muted-text)" }}>
          "Always exploring new DevOps challenges and cloud technologies."
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://x.com/med_igher"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: "var(--social-bg)", border: "1px solid var(--social-border)", color: "var(--muted-text)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--social-hover)"; e.currentTarget.style.color = "var(--white-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--social-bg)"; e.currentTarget.style.color = "var(--muted-text)"; }}
            aria-label="Twitter"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/moirhira"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: "var(--social-bg)", border: "1px solid var(--social-border)", color: "var(--muted-text)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--social-hover)"; e.currentTarget.style.color = "var(--white-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--social-bg)"; e.currentTarget.style.color = "var(--muted-text)"; }}
            aria-label="GitHub"
          >
            <i className="fab fa-github" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/mohamed-irhirallah-70690125b/"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: "var(--social-bg)", border: "1px solid var(--social-border)", color: "var(--muted-text)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--social-hover)"; e.currentTarget.style.color = "var(--white-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--social-bg)"; e.currentTarget.style.color = "var(--muted-text)"; }}
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs opacity-60" style={{ color: "var(--muted-text)" }}>
          &copy; {new Date().getFullYear()} Mohamed Irhirallah. All rights reserved.
        </p>
      </div>
    </footer>
  );
}