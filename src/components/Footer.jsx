import React from "react";

export default function Footer() {
  return (
    <footer className="relative py-10" style={{ background: "var(--darker-bg)" }}>
      {/* Top divider */}
      <div className="section-divider mb-10" />

      <div className="mx-auto w-11/12 max-w-1600 px-5 flex flex-col items-center gap-6">
        {/* Tagline */}
        <p className="text-sm text-[color:var(--muted-text)] italic text-center">
          "Always exploring new DevOps challenges and cloud technologies."
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://x.com/med_igher"
            className="w-10 h-10 rounded-full bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.15)] flex items-center justify-center text-[color:var(--muted-text)] hover:text-white hover:bg-[rgba(124,58,237,0.2)] transition-all duration-200"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/moirhira"
            className="w-10 h-10 rounded-full bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.15)] flex items-center justify-center text-[color:var(--muted-text)] hover:text-white hover:bg-[rgba(124,58,237,0.2)] transition-all duration-200"
            aria-label="GitHub"
          >
            <i className="fab fa-github" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/mohamed-irhirallah-70690125b/"
            className="w-10 h-10 rounded-full bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.15)] flex items-center justify-center text-[color:var(--muted-text)] hover:text-white hover:bg-[rgba(124,58,237,0.2)] transition-all duration-200"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[color:var(--muted-text)] opacity-60">
          &copy; {new Date().getFullYear()} Mohamed Irhirallah. All rights reserved.
        </p>
      </div>
    </footer>
  );
}