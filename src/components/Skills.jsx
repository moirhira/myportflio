import React from "react";
import { useLang } from "../LanguageContext";

export default function Skills() {
  const { t } = useLang();

  const categories = [
    {
      title: t.skills.cat1,
      icon: "fas fa-cubes",
      skills: [
        { name: "Docker",         icon: "devicon-docker-plain" },
        { name: "Kubernetes",     icon: "devicon-kubernetes-plain" },
        { name: "Docker Compose", icon: "devicon-docker-plain" },
      ],
    },
    {
      title: t.skills.cat2,
      icon: "fas fa-cogs",
      skills: [
        { name: "Ansible",    icon: "devicon-ansible-plain" },
        { name: "Bash",       icon: "devicon-bash-plain" },
        { name: "CI/CD",      icon: "fas fa-infinity" },
      ],
    },
    {
      title: t.skills.cat3,
      icon: "fas fa-server",
      skills: [
        { name: "Linux",              icon: "devicon-linux-plain" },
        { name: "Nginx",              icon: "devicon-nginx-original" },
        { name: "MariaDB",            icon: "devicon-mysql-plain" },
        { name: t.skills.networking,   icon: "fas fa-network-wired" },
      ],
    },
    {
      title: t.skills.cat4,
      icon: "fas fa-cloud",
      skills: [
        { name: t.skills.infraAuto,    icon: "fas fa-robot" },
        { name: t.skills.monitoring,   icon: "fas fa-chart-line" },
        { name: "Git",                 icon: "devicon-git-plain" },
        { name: "GitHub Actions",      icon: "devicon-github-original" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--darker-bg)", transition: "background 0.3s ease" }}
    >
      <div className="bg-dots" />

      <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-5">
        <div className="text-center mb-14">
          <p className="section-label">{t.skills.label}</p>
          <h2 className="gradient-heading text-3xl sm:text-4xl">{t.skills.heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="glass-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="skill-icon">
                  <i className={cat.icon} />
                </div>
                <h3 className="font-semibold text-sm leading-tight" style={{ color: "var(--white-text)" }}>
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {cat.skills.map((skill, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200"
                    style={{ background: "var(--skill-bg)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--skill-hover-bg)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--skill-bg)")}
                  >
                    <i className={`${skill.icon} text-lg`} style={{ color: "var(--primary-light)" }} />
                    <span className="text-sm" style={{ color: "var(--light-text)" }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
