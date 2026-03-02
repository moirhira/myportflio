import React, { useState, useEffect } from "react";
import { getProfile, setProfile } from "./dataStore";

export default function ProfilePage() {
    const [profile, setLocal] = useState(null);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getProfile().then(setLocal);
    }, []);

    if (!profile) return (
        <div className="flex items-center justify-center py-24">
            <i className="fas fa-spinner fa-spin text-2xl" style={{ color: "var(--accent-text)" }} />
        </div>
    );

    const handleField = (key, val) => {
        setLocal((prev) => ({ ...prev, [key]: val }));
        setSaved(false);
    };

    const handleStat = (idx, key, val) => {
        setLocal((prev) => {
            const stats = [...prev.stats];
            stats[idx] = { ...stats[idx], [key]: val };
            return { ...prev, stats };
        });
        setSaved(false);
    };

    const addStat = () => {
        setLocal((prev) => ({
            ...prev,
            stats: [...prev.stats, { value: "", labelEn: "", labelFr: "" }],
        }));
        setSaved(false);
    };

    const removeStat = (idx) => {
        setLocal((prev) => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== idx),
        }));
        setSaved(false);
    };

    const save = async () => {
        setSaving(true);
        await setProfile(profile);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const reset = () => {
        getProfile().then(setLocal);
        setSaved(false);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--white-text)" }}>Profile</h1>
                <p className="text-sm" style={{ color: "var(--muted-text)" }}>Edit your About section content</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div className="flex flex-col gap-5">
                    <div className="admin-card p-6">
                        <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--accent-text)" }}>
                            <i className="fas fa-user mr-2" />Basic Info
                        </h2>

                        <div className="mb-4">
                            <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider"
                                style={{ color: "var(--muted-text)" }}>Display Name</label>
                            <input value={profile.name} onChange={(e) => handleField("name", e.target.value)}
                                className="admin-input" />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider"
                                style={{ color: "var(--muted-text)" }}>School</label>
                            <input value={profile.school} onChange={(e) => handleField("school", e.target.value)}
                                className="admin-input" />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="admin-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--accent-text)" }}>
                                <i className="fas fa-chart-bar mr-2" />Stats Cards
                            </h2>
                            <button onClick={addStat} className="text-xs px-3 py-1 rounded-lg"
                                style={{ background: "var(--glass)", color: "var(--cyan)" }}>
                                <i className="fas fa-plus mr-1" /> Add
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {profile.stats.map((stat, idx) => (
                                <div key={idx} className="p-3 rounded-lg flex flex-col gap-2"
                                    style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium" style={{ color: "var(--muted-text)" }}>
                                            Stat #{idx + 1}
                                        </span>
                                        <button onClick={() => removeStat(idx)} className="text-xs" style={{ color: "#ef4444" }}>
                                            <i className="fas fa-xmark" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <label className="block mb-1 text-xs" style={{ color: "var(--muted-text)" }}>Value</label>
                                            <input value={stat.value} onChange={(e) => handleStat(idx, "value", e.target.value)}
                                                className="admin-input text-sm" placeholder="10+" />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs" style={{ color: "var(--muted-text)" }}>Label (EN)</label>
                                            <input value={stat.labelEn} onChange={(e) => handleStat(idx, "labelEn", e.target.value)}
                                                className="admin-input text-sm" placeholder="Projects" />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs" style={{ color: "var(--muted-text)" }}>Label (FR)</label>
                                            <input value={stat.labelFr} onChange={(e) => handleStat(idx, "labelFr", e.target.value)}
                                                className="admin-input text-sm" placeholder="Projets" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="admin-card p-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--accent-text)" }}>
                        <i className="fas fa-eye mr-2" />Live Preview
                    </h2>
                    <div className="p-5 rounded-xl" style={{ background: "var(--darker-bg)", border: "1px solid var(--glass-border)" }}>
                        <p className="section-label mb-1">Get to know me</p>
                        <h2 className="gradient-heading text-2xl mb-4">About Me</h2>
                        <p className="text-sm mb-4" style={{ color: "var(--muted-text)" }}>
                            I am a software engineering student at{" "}
                            <span style={{ color: "var(--white-text)", fontWeight: 600 }}>{profile.school}</span>…
                        </p>
                        <div className="flex flex-col gap-3">
                            {profile.stats.map((s, i) => (
                                <div key={i} className="glass-card p-4 text-center">
                                    <p className="font-display text-xl font-bold gradient-heading">{s.value || "—"}</p>
                                    <p className="text-xs" style={{ color: "var(--muted-text)" }}>{s.labelEn || "Label"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
                <button onClick={save} disabled={saving} className="btn-primary text-sm">
                    {saving
                        ? <><i className="fas fa-spinner fa-spin" /> Saving…</>
                        : <><i className="fas fa-check" /> Save Changes</>}
                </button>
                <button onClick={reset} className="px-5 py-2 rounded-full text-sm font-medium"
                    style={{ background: "var(--glass)", color: "var(--light-text)" }}>
                    Reset
                </button>
                {saved && (
                    <span className="text-sm ml-2" style={{ color: "#22c55e" }}>
                        <i className="fas fa-check-circle mr-1" /> Saved to database!
                    </span>
                )}
            </div>
        </div>
    );
}
