import React from "react";

const categories = [
    {
        title: "Containerization & Orchestration",
        icon: "fas fa-cubes",
        skills: [
            { name: "Docker", icon: "devicon-docker-plain" },
            { name: "Kubernetes", icon: "devicon-kubernetes-plain" },
            { name: "Docker Compose", icon: "devicon-docker-plain" },
        ],
    },
    {
        title: "Automation & Configuration",
        icon: "fas fa-cogs",
        skills: [
            { name: "Ansible", icon: "devicon-ansible-plain" },
            { name: "Bash", icon: "devicon-bash-plain" },
            { name: "CI/CD", icon: "fas fa-infinity" },
        ],
    },
    {
        title: "Infrastructure & Networking",
        icon: "fas fa-server",
        skills: [
            { name: "Linux", icon: "devicon-linux-plain" },
            { name: "Nginx", icon: "devicon-nginx-original" },
            { name: "MariaDB", icon: "devicon-mysql-plain" },
            { name: "Networking", icon: "fas fa-network-wired" },
        ],
    },
    {
        title: "Cloud & DevOps Practices",
        icon: "fas fa-cloud",
        skills: [
            { name: "Infra Automation", icon: "fas fa-robot" },
            { name: "Monitoring", icon: "fas fa-chart-line" },
            { name: "Git", icon: "devicon-git-plain" },
            { name: "GitHub Actions", icon: "devicon-github-original" },
        ],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="relative py-28 overflow-hidden" style={{ background: "var(--darker-bg)" }}>
            <div className="bg-dots" />

            <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-5">
                <div className="text-center mb-14">
                    <p className="section-label">What I work with</p>
                    <h2 className="gradient-heading text-3xl sm:text-4xl">Skills & Expertise</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <div key={i} className="glass-card p-6 flex flex-col">
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="skill-icon">
                                    <i className={cat.icon} />
                                </div>
                                <h3 className="text-white font-semibold text-sm leading-tight">
                                    {cat.title}
                                </h3>
                            </div>

                            {/* Skill list */}
                            <div className="flex flex-col gap-3 flex-1">
                                {cat.skills.map((skill, j) => (
                                    <div
                                        key={j}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[rgba(124,58,237,0.06)] hover:bg-[rgba(124,58,237,0.14)] transition-colors duration-200"
                                    >
                                        <i className={`${skill.icon} text-lg text-[color:var(--primary-light)]`} />
                                        <span className="text-sm text-[color:var(--light-text)]">
                                            {skill.name}
                                        </span>
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
