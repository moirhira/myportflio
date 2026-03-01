import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "./dataStore";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const categories = [...new Set(projects.map((p) => p.category))];

  const stats = [
    { icon: "fas fa-folder-open", value: projects.length, label: "Total Projects",  color: "var(--primary-light)" },
    { icon: "fas fa-tags",        value: categories.length, label: "Categories",    color: "var(--cyan)" },
    { icon: "fas fa-code-branch", value: projects.filter((p) => p.github).length, label: "With GitHub", color: "var(--pink)" },
    { icon: "fas fa-globe",       value: projects.filter((p) => p.live && p.live !== "#").length, label: "With Live Demo", color: "#22c55e" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--white-text)" }}>Dashboard</h1>
        <p className="text-sm" style={{ color: "var(--muted-text)" }}>Overview of your portfolio</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="admin-stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: "var(--glass)", color: s.color }}>
                <i className={s.icon} />
              </div>
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ color: "var(--white-text)" }}>{s.value}</p>
            <p className="text-xs" style={{ color: "var(--muted-text)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <button
          onClick={() => navigate("/admin/projects")}
          className="admin-action-card"
        >
          <i className="fas fa-plus text-2xl mb-2" style={{ color: "var(--cyan)" }} />
          <span className="font-semibold text-sm" style={{ color: "var(--white-text)" }}>Add New Project</span>
          <span className="text-xs" style={{ color: "var(--muted-text)" }}>Create a new portfolio project</span>
        </button>
        <button
          onClick={() => navigate("/admin/settings")}
          className="admin-action-card"
        >
          <i className="fas fa-download text-2xl mb-2" style={{ color: "var(--primary-light)" }} />
          <span className="font-semibold text-sm" style={{ color: "var(--white-text)" }}>Export Data</span>
          <span className="text-xs" style={{ color: "var(--muted-text)" }}>Download portfolio data as JSON</span>
        </button>
      </div>

      {/* Recent Projects */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--white-text)" }}>
          <i className="fas fa-clock-rotate-left mr-2" style={{ color: "var(--primary-light)" }} />
          Recent Projects
        </h2>
        {projects.length === 0 ? (
          <p className="text-sm py-4 text-center" style={{ color: "var(--muted-text)" }}>
            No projects yet. Add your first project!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="admin-list-item">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                       style={{ background: "var(--glass)" }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--white-text)" }}>{p.title}</p>
                    <p className="text-xs truncate" style={{ color: "var(--muted-text)" }}>{p.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/admin/projects")}
                  className="text-xs px-3 py-1 rounded-lg transition-colors"
                  style={{ background: "var(--glass)", color: "var(--accent-text)" }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
