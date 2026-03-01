import React from "react";
import { useLang } from "../LanguageContext";

export default function ZeroOps() {
    const { t } = useLang();

    const highlights = [
        { icon: "fas fa-chalkboard-teacher", title: t.zeroops.h1title, desc: t.zeroops.h1desc },
        { icon: "fas fa-users", title: t.zeroops.h2title, desc: t.zeroops.h2desc },
        { icon: "fas fa-project-diagram", title: t.zeroops.h3title, desc: t.zeroops.h3desc },
    ];

    return (
        <section
            id="zeroops"
            className="relative py-28 overflow-hidden"
            style={{ background: "var(--darker-bg)", transition: "background 0.3s ease" }}
        >
            <div
                className="glow-orb animate-pulse-slow"
                style={{ width: 400, height: 400, top: "10%", left: "-8%", background: "var(--primary)" }}
            />

            <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-5">
                <div className="text-center mb-14">
                    <p className="section-label">{t.zeroops.label}</p>
                    <h2 className="gradient-heading text-3xl sm:text-4xl mb-4">{t.zeroops.heading}</h2>
                    <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted-text)" }}>
                        {t.zeroops.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {highlights.map((h, i) => (
                        <div key={i} className="glass-card zeroops-glow p-7 text-center">
                            <div
                                className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center text-2xl"
                                style={{ background: "var(--social-bg)", border: "1px solid var(--social-border)", color: "var(--cyan)" }}
                            >
                                <i className={h.icon} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--white-text)" }}>{h.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-text)" }}>{h.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
