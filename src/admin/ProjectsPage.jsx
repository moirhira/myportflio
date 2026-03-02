import React, { useEffect, useState, useCallback } from "react";
import {
  getProjects, addProject, updateProject, deleteProject, reorderProject,
} from "./dataStore";

const emptyProject = {
  title: "", category: "", description: "", image: "", github: "", live: "",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ ...emptyProject });
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm({ ...emptyProject }); setModal("add"); };
  const openEdit = (project) => { setForm({ ...project }); setModal(project); };
  const closeModal = () => { setModal(null); setForm({ ...emptyProject }); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    if (modal === "add") {
      await addProject(form);
    } else {
      await updateProject(modal.id, form);
    }
    setSaving(false);
    await load();
    closeModal();
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    await load();
    setConfirmDelete(null);
  };

  const handleReorder = async (id, dir) => {
    await reorderProject(id, dir);
    await load();
  };

  const handleField = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  // Export current projects directly from state (no extra DB call)
  const handleExportProjectsJson = () => {
    const data = JSON.stringify(projects, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* ── Info banner ── */}
      <div className="mb-5 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3"
        style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}>
        <div className="flex-1">
          <p className="text-sm font-semibold mb-0.5" style={{ color: "#22c55e" }}>
            <i className="fas fa-database mr-2" />Powered by Supabase
          </p>
          <p className="text-xs" style={{ color: "var(--muted-text)" }}>
            Changes are saved directly to the database and are instantly visible to all visitors — no redeploy needed.
          </p>
        </div>
        <button onClick={handleExportProjectsJson}
          className="admin-btn-sm px-4 py-2 whitespace-nowrap flex-shrink-0"
          style={{ color: "var(--cyan)" }}>
          <i className="fas fa-file-export mr-1" /> Export JSON
        </button>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--white-text)" }}>Projects</h1>
          <p className="text-sm" style={{ color: "var(--muted-text)" }}>
            {loading ? "Loading…" : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <i className="fas fa-plus" /> Add Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: "var(--muted-text)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="admin-input pl-9"
          />
        </div>
      </div>

      {/* Projects list */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="admin-card text-center py-12">
            <i className="fas fa-spinner fa-spin text-2xl mb-3" style={{ color: "var(--accent-text)" }} />
            <p className="text-sm" style={{ color: "var(--muted-text)" }}>Loading projects…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="admin-card text-center py-12">
            <i className="fas fa-folder-open text-4xl mb-3" style={{ color: "var(--muted-text)" }} />
            <p className="text-sm" style={{ color: "var(--muted-text)" }}>
              {search ? "No matching projects" : "No projects yet — add one!"}
            </p>
          </div>
        ) : (
          filtered.map((p, idx) => (
            <div key={p.id} className="admin-card flex items-center gap-4 py-4 px-5">
              {/* Reorder */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => handleReorder(p.id, "up")}
                  disabled={idx === 0}
                  className="text-xs px-1 disabled:opacity-20"
                  style={{ color: "var(--muted-text)" }}
                >
                  <i className="fas fa-chevron-up" />
                </button>
                <button
                  onClick={() => handleReorder(p.id, "down")}
                  disabled={idx === filtered.length - 1}
                  className="text-xs px-1 disabled:opacity-20"
                  style={{ color: "var(--muted-text)" }}
                >
                  <i className="fas fa-chevron-down" />
                </button>
              </div>

              {/* Image */}
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                style={{ background: "var(--glass)" }}>
                {p.image && (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: "var(--white-text)" }}>{p.title}</p>
                <p className="text-xs truncate" style={{ color: "var(--cyan)" }}>{p.category}</p>
              </div>

              {/* Links */}
              <div className="hidden sm:flex items-center gap-2">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer"
                    className="text-xs" style={{ color: "var(--muted-text)" }}>
                    <i className="fab fa-github" />
                  </a>
                )}
                {p.live && p.live !== "#" && (
                  <a href={p.live} target="_blank" rel="noreferrer"
                    className="text-xs" style={{ color: "var(--muted-text)" }}>
                    <i className="fas fa-external-link-alt" />
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(p)} className="admin-btn-sm" style={{ color: "var(--accent-text)" }}>
                  <i className="fas fa-pen-to-square" />
                </button>
                <button onClick={() => setConfirmDelete(p.id)} className="admin-btn-sm" style={{ color: "#ef4444" }}>
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="admin-modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="admin-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                <i className="fas fa-trash text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--white-text)" }}>Delete Project?</h3>
              <p className="text-sm mb-5" style={{ color: "var(--muted-text)" }}>
                This will permanently delete the project from the database.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setConfirmDelete(null)}
                  className="px-5 py-2 rounded-lg text-sm font-medium"
                  style={{ background: "var(--glass)", color: "var(--light-text)" }}>
                  Cancel
                </button>
                <button onClick={() => handleDelete(confirmDelete)}
                  className="px-5 py-2 rounded-lg text-sm font-medium"
                  style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold" style={{ color: "var(--white-text)" }}>
                {modal === "add" ? "Add Project" : "Edit Project"}
              </h2>
              <button onClick={closeModal} className="text-lg" style={{ color: "var(--muted-text)" }}>
                <i className="fas fa-xmark" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { key: "title", label: "Title", placeholder: "My Awesome Project" },
                { key: "category", label: "Category", placeholder: "DevOps, Web, etc." },
                { key: "image", label: "Image URL", placeholder: "https://… or media/project.png" },
                { key: "github", label: "GitHub URL", placeholder: "https://github.com/…" },
                { key: "live", label: "Live URL", placeholder: "https://…" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--muted-text)" }}>{label}</label>
                  <input
                    value={form[key]}
                    onChange={(e) => handleField(key, e.target.value)}
                    placeholder={placeholder}
                    className="admin-input"
                  />
                </div>
              ))}
              <div>
                <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--muted-text)" }}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleField("description", e.target.value)}
                  rows={4}
                  placeholder="Describe this project…"
                  className="admin-input resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button onClick={closeModal}
                  className="px-5 py-2 rounded-lg text-sm font-medium"
                  style={{ background: "var(--glass)", color: "var(--light-text)" }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">
                  {saving
                    ? <><i className="fas fa-spinner fa-spin" /> Saving…</>
                    : <><i className={`fas ${modal === "add" ? "fa-plus" : "fa-check"}`} />
                      {modal === "add" ? " Add Project" : " Save Changes"}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
