import React, { useState, useEffect } from "react";
import { useLang } from "../LanguageContext";
import { getResumeUrl } from "../admin/dataStore";

export default function Hero() {
  const { t } = useLang();
  const [resumeHref, setResumeHref] = useState("media/myresume.pdf");

  useEffect(() => {
    const fetchResumeUrl = () => {
      getResumeUrl().then((url) => {
        if (url) setResumeHref(url);
      });
    };
    fetchResumeUrl(); // fetch on mount
    // Re-fetch whenever the tab becomes visible again (e.g. returning from admin panel)
    document.addEventListener("visibilitychange", fetchResumeUrl);
    return () => document.removeEventListener("visibilitychange", fetchResumeUrl);
  }, []);


  const terminalLines = [
    { prompt: "~/devops $", command: "docker compose up -d", delay: 0 },
    { prompt: "~/devops $", command: "kubectl apply -f deployment.yaml", delay: 1 },
    { prompt: "~/devops $", command: "ansible-playbook provision.yml", delay: 2 },
    { comment: "# ✓ Infrastructure ready — all systems go 🚀", delay: 3 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--hero-bg)" }}
    >
      <div className="bg-dots" />
      <div
        className="glow-orb animate-pulse-slow"
        style={{ width: 500, height: 500, top: "-10%", right: "-5%", background: "var(--primary)" }}
      />
      <div
        className="glow-orb animate-pulse-slow"
        style={{ width: 350, height: 350, bottom: "5%", left: "-5%", background: "var(--cyan)", animationDelay: "2s" }}
      />

      <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <p className="section-label animate-fadeUp">{t.hero.label}</p>

            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fadeUp-d1"
              style={{ color: "var(--light-text)" }}
            >
              {t.hero.greeting}{" "}
              <span className="gradient-heading">{t.hero.name}</span>
            </h1>

            <h2
              className="text-lg sm:text-xl mb-6 animate-fadeUp-d2 leading-relaxed"
              style={{ color: "var(--muted-text)" }}
            >
              {t.hero.subtitle1}{" "}
              <span style={{ color: "var(--cyan)", fontWeight: 600 }}>ZeroOps</span>{" "}
              {t.hero.subtitle2}
            </h2>

            <p
              className="mb-8 animate-fadeUp-d3 leading-relaxed"
              style={{ color: "var(--muted-text)" }}
            >
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fadeUp-d4">
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <i className="fas fa-file-alt" />
                {t.hero.resumeBtn}
              </a>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline"
              >
                <i className="fas fa-paper-plane" />
                {t.hero.contactBtn}
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fadeUp-d2">
            <div className="terminal-block w-full max-w-md animate-float">
              <div className="terminal-header">
                <span className="terminal-dot" style={{ background: "#ff5f57" }} />
                <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
                <span className="terminal-dot" style={{ background: "#28c840" }} />
                <span className="ml-3 text-xs" style={{ color: "var(--muted-text)" }}>
                  terminal — zsh
                </span>
              </div>
              <div className="terminal-body">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="terminal-line mb-1"
                    style={{ animationDelay: `${0.8 + line.delay * 0.5}s` }}
                  >
                    {line.comment ? (
                      <span className="terminal-comment">{line.comment}</span>
                    ) : (
                      <>
                        <span className="terminal-prompt">{line.prompt} </span>
                        <span className="terminal-command">{line.command}</span>
                      </>
                    )}
                  </div>
                ))}
                <div className="terminal-line mt-2" style={{ animationDelay: "3.3s" }}>
                  <span className="terminal-prompt">~/devops $</span>
                  <span className="animate-blink ml-1" style={{ color: "var(--cyan)" }}>▎</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}