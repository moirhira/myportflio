import React, { useState, useRef } from "react";
import { exportAll, importAll, resetAll, setPin, getResumeUrl, setResumeUrl } from "./dataStore";

export default function SettingsPage() {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinMsg, setPinMsg] = useState(null);
  const [importMsg, setImportMsg] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef();
  const [resumeUrl, setResumeUrlState] = useState(getResumeUrl() || "");
  const [resumeMsg, setResumeMsg] = useState(null);

  // ── PIN Change ──
  const handlePinChange = async () => {
    if (newPin.length < 4) {
      setPinMsg({ type: "error", text: "PIN must be at least 4 characters" });
      return;
    }
    if (newPin !== confirmPin) {
      setPinMsg({ type: "error", text: "PINs don't match" });
      return;
    }
    await setPin(newPin);
    setPinMsg({ type: "success", text: "PIN updated!" });
    setNewPin("");
    setConfirmPin("");
    setTimeout(() => setPinMsg(null), 3000);
  };

  // ── Export ──
  const handleExport = () => {
    const data = exportAll();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Import ──
  const handleImport = () => fileRef.current?.click();

  const onFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        importAll(ev.target.result);
        setImportMsg({ type: "success", text: "Data imported! Refresh to see changes." });
      } catch {
        setImportMsg({ type: "error", text: "Invalid JSON file" });
      }
      setTimeout(() => setImportMsg(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ── Reset ──
  const handleReset = () => {
    resetAll();
    setConfirmReset(false);
    window.location.reload();
  };

  // ── Resume URL ──
  const handleSaveResume = () => {
    setResumeUrl(resumeUrl);
    setResumeMsg({ type: "success", text: "Resume URL saved! The button on the site now links here." });
    setTimeout(() => setResumeMsg(null), 4000);
  };
  const handleClearResume = () => {
    setResumeUrl("");
    setResumeUrlState("");
    setResumeMsg({ type: "success", text: "Cleared — site will use the default resume file." });
    setTimeout(() => setResumeMsg(null), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--white-text)" }}>Settings</h1>
        <p className="text-sm" style={{ color: "var(--muted-text)" }}>Manage your admin panel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change PIN */}
        <div className="admin-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--accent-text)" }}>
            <i className="fas fa-key mr-2" />Change PIN
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>New PIN</label>
              <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)}
                className="admin-input" placeholder="••••••" />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>Confirm PIN</label>
              <input type="password" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)}
                className="admin-input" placeholder="••••••" />
            </div>
            {pinMsg && (
              <p className="text-xs" style={{ color: pinMsg.type === "error" ? "#ef4444" : "#22c55e" }}>
                <i className={`fas ${pinMsg.type === "error" ? "fa-exclamation-circle" : "fa-check-circle"} mr-1`} />
                {pinMsg.text}
              </p>
            )}
            <button onClick={handlePinChange} className="btn-primary text-sm self-start mt-1">
              <i className="fas fa-shield-halved" /> Update PIN
            </button>
          </div>
        </div>

        {/* Resume URL */}
        <div className="admin-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--accent-text)" }}>
            <i className="fas fa-file-pdf mr-2" />Resume Link
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--muted-text)" }}>
            Paste a direct link to your resume (Google Drive, Dropbox, etc.). Leave blank to use the default file.
          </p>
          <div className="flex flex-col gap-3">
            <input
              value={resumeUrl}
              onChange={(e) => setResumeUrlState(e.target.value)}
              placeholder="https://drive.google.com/file/d/…/view?usp=sharing"
              className="admin-input text-sm"
            />
            {resumeMsg && (
              <p className="text-xs" style={{ color: resumeMsg.type === "error" ? "#ef4444" : "#22c55e" }}>
                <i className={`fas ${resumeMsg.type === "error" ? "fa-exclamation-circle" : "fa-check-circle"} mr-1`} />
                {resumeMsg.text}
              </p>
            )}
            <div className="flex gap-2">
              <button onClick={handleSaveResume} className="btn-primary text-sm">
                <i className="fas fa-save" /> Save URL
              </button>
              {getResumeUrl() && (
                <button onClick={handleClearResume}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: "var(--glass)", color: "var(--muted-text)", border: "1px solid var(--glass-border)" }}>
                  <i className="fas fa-xmark mr-1" /> Use Default
                </button>
              )}
            </div>
            <p className="text-xs" style={{ color: "var(--muted-text)" }}>
              <i className="fas fa-info-circle mr-1" />
              {getResumeUrl()
                ? <span>Currently using: <span style={{ color: "var(--cyan)" }}>custom URL</span></span>
                : <span>Currently using: <span style={{ color: "var(--cyan)" }}>media/myresume.pdf</span></span>
              }
            </p>
          </div>
        </div>

        {/* Data Management */}
        <div className="admin-card p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--accent-text)" }}>
            <i className="fas fa-database mr-2" />Data Management
          </h2>
          <div className="flex flex-col gap-4">
            {/* Export */}
            <div className="p-4 rounded-xl flex items-center justify-between"
              style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--white-text)" }}>Export Backup</p>
                <p className="text-xs" style={{ color: "var(--muted-text)" }}>Download projects & profile as JSON backup</p>
              </div>
              <button onClick={handleExport} className="admin-btn-sm px-4 py-2" style={{ color: "var(--cyan)" }}>
                <i className="fas fa-download mr-1" /> Export
              </button>
            </div>

            {/* Import */}
            <div className="p-4 rounded-xl flex items-center justify-between"
              style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--white-text)" }}>Import Data</p>
                <p className="text-xs" style={{ color: "var(--muted-text)" }}>Restore from a backup JSON file</p>
              </div>
              <button onClick={handleImport} className="admin-btn-sm px-4 py-2" style={{ color: "var(--primary-light)" }}>
                <i className="fas fa-upload mr-1" /> Import
              </button>
              <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={onFileSelected} />
            </div>

            {importMsg && (
              <p className="text-xs" style={{ color: importMsg.type === "error" ? "#ef4444" : "#22c55e" }}>
                <i className={`fas ${importMsg.type === "error" ? "fa-exclamation-circle" : "fa-check-circle"} mr-1`} />
                {importMsg.text}
              </p>
            )}

            {/* Reset */}
            <div className="p-4 rounded-xl flex items-center justify-between"
              style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "#ef4444" }}>Reset All Data</p>
                <p className="text-xs" style={{ color: "var(--muted-text)" }}>Clear all local changes and reload defaults</p>
              </div>
              <button onClick={() => setConfirmReset(true)} className="admin-btn-sm px-4 py-2" style={{ color: "#ef4444" }}>
                <i className="fas fa-trash mr-1" /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation */}
      {confirmReset && (
        <div className="admin-modal-overlay" onClick={() => setConfirmReset(false)}>
          <div className="admin-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                <i className="fas fa-exclamation-triangle text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--white-text)" }}>Reset All Data?</h3>
              <p className="text-sm mb-5" style={{ color: "var(--muted-text)" }}>
                This will delete all local changes and reload the defaults. Your PIN will not be affected.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setConfirmReset(false)}
                  className="px-5 py-2 rounded-lg text-sm font-medium"
                  style={{ background: "var(--glass)", color: "var(--light-text)" }}>
                  Cancel
                </button>
                <button onClick={handleReset}
                  className="px-5 py-2 rounded-lg text-sm font-medium"
                  style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
