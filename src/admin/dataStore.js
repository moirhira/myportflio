// ── Data Store (Supabase) ────────────────────────────────────────────────────
// All portfolio data is stored in Supabase PostgreSQL.
// The admin PIN is the only thing kept in localStorage (it's device-specific).

import { supabase } from "./supabase";

// ── Default profile fallback ───────────────────────────────────────────────
const defaultProfile = {
  name: "Mohamed",
  school: "1337 UM6P",
  stats: [
    { value: "3+",   labelEn: "Years of Coding",  labelFr: "Années de Code" },
    { value: "10+",  labelEn: "Projects Built",   labelFr: "Projets Réalisés" },
    { value: "1337", labelEn: "UM6P Student",     labelFr: "Étudiant UM6P" },
  ],
};

// ── Projects ───────────────────────────────────────────────────────────────

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) { console.error("getProjects:", error.message); return []; }
  return data || [];
}

export async function addProject(project) {
  const projects = await getProjects();
  const maxOrder = projects.reduce((m, p) => Math.max(m, p.order_index || 0), 0);
  const { data, error } = await supabase
    .from("projects")
    .insert({ ...project, order_index: maxOrder + 1 })
    .select()
    .single();
  if (error) console.error("addProject:", error.message);
  return data;
}

export async function updateProject(id, updates) {
  const { error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id);
  if (error) console.error("updateProject:", error.message);
}

export async function deleteProject(id) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);
  if (error) console.error("deleteProject:", error.message);
}

export async function reorderProject(id, direction) {
  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return;
  const targetIdx = direction === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= projects.length) return;

  const a = projects[idx];
  const b = projects[targetIdx];
  // Swap order_index values
  await supabase.from("projects").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("projects").update({ order_index: a.order_index }).eq("id", b.id);
}

// ── Profile ────────────────────────────────────────────────────────────────

export async function getProfile() {
  const { data, error } = await supabase
    .from("profile")
    .select("data")
    .eq("id", 1)
    .maybeSingle();
  if (error) { console.error("getProfile:", error.message); return { ...defaultProfile }; }
  return data?.data || { ...defaultProfile };
}

export async function setProfile(profile) {
  const { error } = await supabase
    .from("profile")
    .upsert({ id: 1, data: profile }, { onConflict: "id" });
  if (error) console.error("setProfile:", error.message);
}

// ── Export / Import ────────────────────────────────────────────────────────

export async function exportAll() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);
  return JSON.stringify({ projects, profile }, null, 2);
}

export async function importAll(jsonString) {
  const data = JSON.parse(jsonString);
  if (data.projects && Array.isArray(data.projects)) {
    // Clear existing and re-insert
    await supabase.from("projects").delete().neq("id", 0);
    if (data.projects.length > 0) {
      await supabase.from("projects").insert(
        data.projects.map((p, i) => ({ ...p, order_index: i }))
      );
    }
  }
  if (data.profile) {
    await setProfile(data.profile);
  }
}

export async function resetAll() {
  await supabase.from("projects").delete().neq("id", 0);
  await supabase.from("profile").delete().eq("id", 1);
  await supabase.from("settings").delete().neq("key", "");
}

// ── Settings (Resume URL) ──────────────────────────────────────────────────

export async function getResumeUrl() {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "resume_url")
    .maybeSingle();
  if (error) { console.error("getResumeUrl:", error.message); return null; }
  return data?.value || null;
}

export async function setResumeUrl(url) {
  if (url && url.trim()) {
    const { error } = await supabase
      .from("settings")
      .upsert({ key: "resume_url", value: url.trim() }, { onConflict: "key" });
    if (error) console.error("setResumeUrl:", error.message);
  } else {
    await supabase.from("settings").delete().eq("key", "resume_url");
  }
}

// ── Admin PIN (stays in localStorage — device-specific) ────────────────────

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
