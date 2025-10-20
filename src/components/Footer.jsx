import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[color:var(--darker-bg)] border-t border-[rgba(255,255,255,0.05)] py-7">
      <div className="mx-auto w-11/12 max-w-1600 px-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm opacity-70 mb-2 md:mb-0">&copy; 2025 Mohamed. All rights reserved.</p>

        <div className="social-icons flex items-center gap-6">
          <a target="_blank"   rel="noreferrer" href="https://x.com/med_igher" className="text-xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a target="_blank"   rel="noreferrer" href="https://github.com/moirhira" className="text-xl">
            <i className="fab fa-github"></i>
          </a>
          <a target="_blank"   rel="noreferrer" href="https://www.linkedin.com/in/mohamed-irhirallah-70690125b/" className="text-xl">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}