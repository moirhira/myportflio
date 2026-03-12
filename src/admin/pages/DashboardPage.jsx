import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, addProject } from "../services/dataStore";
import { supabase } from "../../services/supabase";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [dbStatus, setDbStatus] = useState("checking"); // "checking" | "ok" | "error"
  const [dbError, setDbError] = useState("");
  const [migrating, setMigrating] = useState(false);
  const [migrateMsg, setMigrateMsg] = useState(null);

  useEffect(() => {
    // Test DB connection
    supabase.from("projects").select("count", { count: "exact", head: true })
      .then(({ error }) => {
        if (error) {
          setDbStatus("error");
          setDbError(error.message);
        } else {
          setDbStatus("ok");
        }
      });

    getProjects().then(setProjects);
  }, []);

  const categories = [...new Set(projects.map((p) => p.category))];

  const stats = [
    { icon: "fas fa-folder-open", value: projects.length, label: "Total Projects", color: "var(--primary-light)" },
    { icon: "fas fa-tags", value: categories.length, label: "Categories", color: "var(--cyan)" },
    { icon: "fas fa-code-branch", value: projects.filter((p) => p.github).length, label: "With GitHub", color: "var(--pink)" },
    { icon: "fas fa-globe", value: projects.filter((p) => p.live && p.live !== "#").length, label: "With Live Demo", color: "#22c55e" },
  ];

  // Migrate old projects.json into Supabase
  const handleMigrate = async () => {
    setMigrating(true);
    setMigrateMsg(null);
    try {
      const res = await fetch("/projects.json");
      if (!res.ok) throw new Error("Could not fetch projects.json");
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setMigrateMsg({ type: "error", text: "projects.json is empty or invalid." });
        setMigrating(false);
        return;
      }
      let added = 0;
      for (const p of data) {
        // Skip projects that already exist (same title)
        const exists = projects.some((ep) => ep.title === p.title);
        if (!exists) {
          await addProject(p);
          added++;
        }
      }
      const skipped = data.length - added;
      setMigrateMsg({
        type: "success",
        text: `Migrated ${added} project${added !== 1 ? "s" : ""} to database.${skipped > 0 ? ` (${skipped} already existed, skipped)` : ""}`,
      });
      // Reload projects
      getProjects().then(setProjects);
    } catch (err) {
      setMigrateMsg({ type: "error", text: err.message });
    }
    setMigrating(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--white-text)" }}>Dashboard</h1>
        <p className="text-sm" style={{ color: "var(--muted-text)" }}>Overview of your portfolio</p>
      </div>

      {/* ── DB Connection Status ── */}
      <div className={`mb-6 p-4 rounded-xl flex items-start gap-3`}
        style={{
          background: dbStatus === "error" ? "rgba(239,68,68,0.08)" : dbStatus === "ok" ? "rgba(34,197,94,0.07)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${dbStatus === "error" ? "rgba(239,68,68,0.3)" : dbStatus === "ok" ? "rgba(34,197,94,0.2)" : "var(--glass-border)"}`,
        }}>
        <i className={`fas mt-0.5 ${dbStatus === "checking" ? "fa-spinner fa-spin" :
            dbStatus === "ok" ? "fa-circle-check" : "fa-circle-exclamation"
          }`} style={{
            color: dbStatus === "error" ? "#ef4444" : dbStatus === "ok" ? "#22c55e" : "var(--muted-text)"
          }} />
        <div className="flex-1">
          {dbStatus === "checking" && <p className="text-sm" style={{ color: "var(--muted-text)" }}>Connecting to Supabase…</p>}
          {dbStatus === "ok" && (
            <p className="text-sm font-medium" style={{ color: "#22c55e" }}>
              Supabase connected — all changes save to the database instantly.
            </p>
          )}
          {dbStatus === "error" && (
            <>
              <p className="text-sm font-semibold mb-1" style={{ color: "#ef4444" }}>
                Database connection failed
              </p>
              <p className="text-xs mb-2" style={{ color: "var(--muted-text)" }}>
                {dbError.includes("relation") || dbError.includes("does not exist")
                  ? "Tables not found — make sure you ran the SQL schema in Supabase SQL Editor."
                  : dbError.includes("Invalid API") || dbError.includes("JWT")
                    ? "Invalid API key — check REACT_APP_SUPABASE_ANON_KEY in Vercel env vars and redeploy."
                    : `Error: ${dbError}`}
              </p>
              <code className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,0,0,0.3)", color: "#ef4444" }}>
                {dbError}
              </code>
            </>
          )}
        </div>
      </div>

      {/* ── Migration Banner (only when DB is OK and has old projects.json) ── */}
      {dbStatus === "ok" && projects.length === 0 && (
        <div className="mb-6 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3"
          style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)" }}>
          <div className="flex-1">
            <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--accent-text)" }}>
              <i className="fas fa-cloud-arrow-up mr-2" />Import your existing projects
            </p>
            <p className="text-xs" style={{ color: "var(--muted-text)" }}>
              Your old projects from <code style={{ color: "var(--cyan)" }}>projects.json</code> are not yet in the database. Click to migrate them now.
            </p>
            {migrateMsg && (
              <p className="text-xs mt-1" style={{ color: migrateMsg.type === "error" ? "#ef4444" : "#22c55e" }}>
                <i className={`fas ${migrateMsg.type === "error" ? "fa-exclamation-circle" : "fa-check-circle"} mr-1`} />
                {migrateMsg.text}
              </p>
            )}
          </div>
          <button onClick={handleMigrate} disabled={migrating} className="btn-primary text-sm whitespace-nowrap flex-shrink-0">
            {migrating ? <><i className="fas fa-spinner fa-spin" /> Migrating…</> : <><i className="fas fa-database" /> Migrate projects.json</>}
          </button>
        </div>
      )}

      {/* Also show migrate button when DB has projects but maybe more in file */}
      {dbStatus === "ok" && projects.length > 0 && (
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <button onClick={handleMigrate} disabled={migrating}
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{ background: "var(--glass)", color: "var(--muted-text)", border: "1px solid var(--glass-border)" }}>
            {migrating ? <><i className="fas fa-spinner fa-spin mr-1" /> Migrating…</> : <><i className="fas fa-cloud-arrow-up mr-1" /> Import from projects.json</>}
          </button>
          {migrateMsg && (
            <p className="text-xs" style={{ color: migrateMsg.type === "error" ? "#ef4444" : "#22c55e" }}>
              <i className={`fas ${migrateMsg.type === "error" ? "fa-exclamation-circle" : "fa-check-circle"} mr-1`} />
              {migrateMsg.text}
            </p>
          )}
        </div>
      )}

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
        <button onClick={() => navigate("/admin/projects")} className="admin-action-card">
          <i className="fas fa-plus text-2xl mb-2" style={{ color: "var(--cyan)" }} />
          <span className="font-semibold text-sm" style={{ color: "var(--white-text)" }}>Add New Project</span>
          <span className="text-xs" style={{ color: "var(--muted-text)" }}>Create a new portfolio project</span>
        </button>
        <button onClick={() => navigate("/admin/settings")} className="admin-action-card">
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
            No projects in database yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="admin-list-item">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ background: "var(--glass)" }}>
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--white-text)" }}>{p.title}</p>
                    <p className="text-xs truncate" style={{ color: "var(--muted-text)" }}>{p.category}</p>
                  </div>
                </div>
                <button onClick={() => navigate("/admin/projects")}
                  className="text-xs px-3 py-1 rounded-lg transition-colors"
                  style={{ background: "var(--glass)", color: "var(--accent-text)" }}>
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
