import React from "react";

export default function Hero() {
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
      style={{ background: "linear-gradient(160deg, #0f0a1a 0%, #080510 40%, #0d0524 100%)" }}
    >
      {/* Background decorations */}
      <div className="bg-dots" />
      <div
        className="glow-orb animate-pulse-slow"
        style={{ width: 500, height: 500, top: "-10%", right: "-5%", background: "#7c3aed" }}
      />
      <div
        className="glow-orb animate-pulse-slow"
        style={{ width: 350, height: 350, bottom: "5%", left: "-5%", background: "#22d3ee", animationDelay: "2s" }}
      />

      <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <p className="section-label animate-fadeUp">DevOps Engineer</p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fadeUp-d1">
              Hi, I'm{" "}
              <span className="gradient-heading">Mohamed</span>
            </h1>

            <h2 className="text-lg sm:text-xl text-[color:var(--muted-text)] mb-6 animate-fadeUp-d2 leading-relaxed">
              DevOps enthusiast & founder of{" "}
              <span className="text-[color:var(--cyan)] font-semibold">ZeroOps</span>{" "}
              — the DevOps club at 1337 UM6P.
            </h2>

            <p className="text-[color:var(--muted-text)] mb-8 animate-fadeUp-d3 leading-relaxed">
              I design and deploy automated, scalable, and secure infrastructures
              using Docker, Kubernetes, Ansible, and CI/CD pipelines. Currently
              seeking a DevOps internship to build production-ready systems.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fadeUp-d4">
              <a
                href="media/myresume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <i className="fas fa-file-alt" />
                My Resume
              </a>
              <a href="#contact" className="btn-outline">
                <i className="fas fa-paper-plane" />
                Get in Touch
              </a>
            </div>
          </div>

          {/* Terminal */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fadeUp-d2">
            <div className="terminal-block w-full max-w-md animate-float">
              <div className="terminal-header">
                <span className="terminal-dot" style={{ background: "#ff5f57" }} />
                <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
                <span className="terminal-dot" style={{ background: "#28c840" }} />
                <span className="ml-3 text-xs text-[color:var(--muted-text)]">
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
                <div
                  className="terminal-line mt-2"
                  style={{ animationDelay: "3.3s" }}
                >
                  <span className="terminal-prompt">~/devops $</span>
                  <span className="animate-blink ml-1 text-[color:var(--cyan)]">▎</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}