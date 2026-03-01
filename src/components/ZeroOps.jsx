import React from "react";

export default function ZeroOps() {
    const highlights = [
        { icon: "fas fa-chalkboard-teacher", title: "Workshops", desc: "Hands-on sessions on Docker, Kubernetes, CI/CD, and cloud tools." },
        { icon: "fas fa-users", title: "Mentoring", desc: "Guiding peers through real-world infrastructure challenges." },
        { icon: "fas fa-project-diagram", title: "Hands-on Projects", desc: "Collaborative projects building production-grade DevOps pipelines." },
    ];

    return (
        <section
            id="zeroops"
            className="relative py-28 overflow-hidden"
            style={{ background: "var(--darker-bg)" }}
        >
            {/* Accent glow */}
            <div
                className="glow-orb animate-pulse-slow"
                style={{ width: 400, height: 400, top: "10%", left: "-8%", background: "#7c3aed" }}
            />

            <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-5">
                <div className="text-center mb-14">
                    <p className="section-label">Leadership</p>
                    <h2 className="gradient-heading text-3xl sm:text-4xl mb-4">
                        Founder of ZeroOps
                    </h2>
                    <p className="text-[color:var(--muted-text)] max-w-2xl mx-auto leading-relaxed">
                        ZeroOps is the DevOps club at 1337 UM6P. I founded it to bridge the gap
                        between theoretical learning and real-world infrastructure experience —
                        empowering students with practical DevOps knowledge.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {highlights.map((h, i) => (
                        <div key={i} className="glass-card zeroops-glow p-7 text-center">
                            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center text-2xl text-[color:var(--cyan)]">
                                <i className={h.icon} />
                            </div>
                            <h3 className="text-white text-lg font-semibold mb-2">{h.title}</h3>
                            <p className="text-[color:var(--muted-text)] text-sm leading-relaxed">
                                {h.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
