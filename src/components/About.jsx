import React from "react";

export default function About() {
  const stats = [
    { value: "3+", label: "Years of Coding" },
    { value: "10+", label: "Projects Built" },
    { value: "1337", label: "UM6P Student" },
  ];

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--section-alt)" }}
    >
      <div className="bg-dots" />

      <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-5">
        <div className="text-center mb-14">
          <p className="section-label">Get to know me</p>
          <h2 className="gradient-heading text-3xl sm:text-4xl">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Text — 3 cols */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-[color:var(--muted-text)] leading-relaxed text-lg">
              I am a software engineering student at{" "}
              <span className="text-white font-semibold">1337 UM6P</span> with a
              strong focus on DevOps, cloud engineering, and automation.
            </p>
            <p className="text-[color:var(--muted-text)] leading-relaxed text-lg">
              As the founder of{" "}
              <span className="text-[color:var(--cyan)] font-semibold">ZeroOps</span>,
              I lead initiatives that help students explore modern infrastructure
              practices, containerized deployments, and CI/CD workflows.
            </p>
            <p className="text-[color:var(--muted-text)] leading-relaxed text-lg">
              My hands-on experience includes building multi-container architectures
              with Docker Compose, deploying applications on Kubernetes clusters,
              managing secrets and environment variables securely, and automating
              Linux server provisioning with Ansible.
            </p>
            <p className="text-[color:var(--muted-text)] leading-relaxed text-lg">
              I enjoy creating scalable, maintainable, and secure systems, mentoring
              others, and exploring innovative DevOps solutions. I'm currently
              seeking internship opportunities where I can apply my skills to
              real-world infrastructure challenges.
            </p>
          </div>

          {/* Stats — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {stats.map((s, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <p className="font-display text-3xl font-bold gradient-heading mb-1">
                  {s.value}
                </p>
                <p className="text-sm text-[color:var(--muted-text)] tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}