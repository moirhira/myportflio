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

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="projects"
      className="py-20 bg-[color:var(--darker-bg)] scroll-mt-[80px]"
    >
      <div className="mx-auto w-11/12 max-w-1600 px-5">
        <h2 className="gradient-heading text-3xl mb-4 text-center">Recent Work</h2>
        <p className="text-center mb-8 opacity-90">A collection of projects I've worked on</p>

        {loading && (
          <div className="w-full flex items-center justify-center py-16">
            <p className="text-sm opacity-80">Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="w-full flex items-center justify-center py-16">
            <p className="text-sm text-red-400">Error loading projects: {error}</p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="w-full flex items-center justify-center py-16">
            <p className="text-sm opacity-80">No projects found.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {projects.map((project) => (
              <article key={project.id} className="project-card-custom flex flex-col overflow-hidden">
                <div className="project-image bg-[#181028] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 md:h-48 lg:h-56 object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="project-info p-6 flex flex-col flex-1">
                  <span className="text-[color:var(--primary-color)] text-sm font-medium mb-2 tracking-wide">
                    {project.category}
                  </span>
                  <h3 className="text-white text-xl mb-3">{project.title}</h3>
                  <p className="text-[color:var(--light-text)] opacity-90 mb-4 flex-1">{project.description}</p>

                  <div className="project-links mt-4 flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-[#181028] px-3.5 py-2 rounded-full text-lg hover:text-[color:var(--accent-text)] transition-colors"
                        aria-label={`${project.title} GitHub`}
                      >
                        <i className="fab fa-github" />
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-[#181028] px-3.5 py-2  rounded-full text-lg hover:text-[color:var(--accent-text)] transition-colors"
                        aria-label={`${project.title} Live demo`}
                      >
                        <i className=" fas fa-external-link-alt" />
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