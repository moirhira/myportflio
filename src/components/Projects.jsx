import React, { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/projects.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        if (mounted) setError(err.message || "Failed to load projects");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  return (
    <section
      id="projects"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--section-alt)" }}
    >
      <div className="bg-dots" />

      <div className="relative z-10 mx-auto w-11/12 max-w-1600 px-5">
        <div className="text-center mb-6">
          <p className="section-label">My portfolio</p>
          <h2 className="gradient-heading text-3xl sm:text-4xl mb-4">Recent Work</h2>
          <p className="text-[color:var(--muted-text)] max-w-2xl mx-auto leading-relaxed">
            I love turning theory into practice. My projects showcase real DevOps solutions
            I've built — from containerized web applications to fully automated deployment
            pipelines.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="flex items-center gap-3 text-[color:var(--muted-text)]">
              <i className="fas fa-spinner fa-spin" />
              <span>Loading projects…</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center py-16">
            <p className="text-red-400 text-sm">Error: {error}</p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="flex justify-center py-16">
            <p className="text-sm text-[color:var(--muted-text)]">No projects found.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
            {projects.map((project) => (
              <article key={project.id} className="project-card-custom flex flex-col">
                <div className="project-image bg-[#0d0524]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52 md:h-48 lg:h-52 object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[color:var(--cyan)] text-xs font-semibold uppercase tracking-widest mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[color:var(--muted-text)] text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(124,58,237,0.1)] text-sm text-[color:var(--light-text)] hover:bg-[rgba(124,58,237,0.2)] hover:text-white transition-all duration-200"
                        aria-label={`${project.title} GitHub`}
                      >
                        <i className="fab fa-github" />
                        Code
                      </a>
                    )}
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(34,211,238,0.08)] text-sm text-[color:var(--cyan)] hover:bg-[rgba(34,211,238,0.15)] transition-all duration-200"
                        aria-label={`${project.title} Live`}
                      >
                        <i className="fas fa-external-link-alt" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}