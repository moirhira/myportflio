// ── Data Store ─────────────────────────────────────────
// Persists portfolio data in localStorage with fallbacks to defaults.

const PROJECTS_KEY = "portfolio_projects";
const PROFILE_KEY  = "portfolio_profile";

// Default profile (matches the About component)
const defaultProfile = {
  name: "Mohamed",
  school: "1337 UM6P",
  stats: [
    { value: "3+",   labelEn: "Years of Coding",  labelFr: "Années de Code" },
    { value: "10+",  labelEn: "Projects Built",   labelFr: "Projets Réalisés" },
    { value: "1337", labelEn: "UM6P Student",     labelFr: "Étudiant UM6P" },
  ],
};

// ── Projects ───────────────────────────────────────────

let projectsCache = null;

export async function getProjects() {
  // Check localStorage first
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (stored) {
    try {
      projectsCache = JSON.parse(stored);
      return projectsCache;
    } catch { /* fall through */ }
  }
  // Fallback: fetch from static file
  try {
    const res = await fetch("/projects.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    projectsCache = data;
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("Failed to load projects:", err);
    return [];
  }
}

export function getProjectsSync() {
  if (projectsCache) return projectsCache;
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { return []; }
  }
  return [];
}

export function setProjects(projects) {
  projectsCache = projects;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function addProject(project) {
  const projects = getProjectsSync();
  const maxId = projects.reduce((m, p) => Math.max(m, p.id || 0), 0);
  const newProject = { ...project, id: maxId + 1 };
  projects.push(newProject);
  setProjects(projects);
  return newProject;
}

export function updateProject(id, updates) {
  const projects = getProjectsSync();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    projects[idx] = { ...projects[idx], ...updates };
    setProjects(projects);
  }
  return projects;
}

export function deleteProject(id) {
  const projects = getProjectsSync().filter((p) => p.id !== id);
  setProjects(projects);
  return projects;
}

export function reorderProject(id, direction) {
  const projects = getProjectsSync();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return projects;
  const targetIdx = direction === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= projects.length) return projects;
  [projects[idx], projects[targetIdx]] = [projects[targetIdx], projects[idx]];
  setProjects(projects);
  return projects;
}

// ── Profile ────────────────────────────────────────────

export function getProfile() {
  const stored = localStorage.getItem(PROFILE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  return { ...defaultProfile };
}

export function setProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

// ── Export / Import ────────────────────────────────────

export function exportAll() {
  return JSON.stringify({
    projects: getProjectsSync(),
    profile: getProfile(),
  }, null, 2);
}

export function importAll(jsonString) {
  const data = JSON.parse(jsonString);
  if (data.projects) setProjects(data.projects);
  if (data.profile) setProfile(data.profile);
}

export function resetAll() {
  localStorage.removeItem(PROJECTS_KEY);
  localStorage.removeItem(PROFILE_KEY);
  projectsCache = null;
}

// ── Admin Auth ─────────────────────────────────────────

const PIN_KEY = "admin_pin_hash";

async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin + "_portfolio_salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isPinSet() {
  return !!localStorage.getItem(PIN_KEY);
}

export async function setPin(pin) {
  const hash = await hashPin(pin);
  localStorage.setItem(PIN_KEY, hash);
}

export async function verifyPin(pin) {
  const hash = await hashPin(pin);
  return hash === localStorage.getItem(PIN_KEY);
}

export function clearPin() {
  localStorage.removeItem(PIN_KEY);
}
