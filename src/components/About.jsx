import React from "react";
import { useLang } from "../LanguageContext";

export default function About() {
  const { t } = useLang();

  const stats = [
    { value: "3+", label: t.about.stat1 },
    { value: "10+", label: t.about.stat2 },
    { value: "1337", label: t.about.stat3 },
  ];

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--section-alt)", transition: "background 0.3s ease" }}
    >
      <div className="bg-dots" />

      <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-5">
        <div className="text-center mb-14">
          <p className="section-label">{t.about.label}</p>
          <h2 className="gradient-heading text-3xl sm:text-4xl">{t.about.heading}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-5">
            <p className="leading-relaxed text-lg" style={{ color: "var(--muted-text)" }}>
              {t.about.p1}{" "}
              <span style={{ color: "var(--white-text)", fontWeight: 600 }}>{t.about.p1school}</span>{" "}
              {t.about.p1end}
            </p>
            <p className="leading-relaxed text-lg" style={{ color: "var(--muted-text)" }}>
              {t.about.p2start}{" "}
              <span style={{ color: "var(--cyan)", fontWeight: 600 }}>ZeroOps</span>
              {t.about.p2end}
            </p>
            <p className="leading-relaxed text-lg" style={{ color: "var(--muted-text)" }}>
              {t.about.p3}
            </p>
            <p className="leading-relaxed text-lg" style={{ color: "var(--muted-text)" }}>
              {t.about.p4}
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            {stats.map((s, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <p className="font-display text-3xl font-bold gradient-heading mb-1">{s.value}</p>
                <p className="text-sm tracking-wide" style={{ color: "var(--muted-text)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}