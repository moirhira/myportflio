import React, { useState, useEffect, useRef } from "react";
import { exportAll, importAll, resetAll, authChangePassword, getResumeUrl, setResumeUrl, uploadResumeFile } from "./dataStore";


export default function SettingsPage() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passMsg, setPassMsg] = useState(null);
  const [passLoading, setPassLoading] = useState(false);
  const [importMsg, setImportMsg] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef();
  const resumeFileRef = useRef();
  const [resumeUrl, setResumeUrlState] = useState("");
  const [resumeMsg, setResumeMsg] = useState(null);
  const [resumeLoaded, setResumeLoaded] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeFileName, setResumeFileName] = useState("");


  useEffect(() => {
    getResumeUrl().then((url) => {
      setResumeUrlState(url || "");
      setResumeLoaded(true);
    });
  }, []);

  // ── Password Change ──
  const handlePasswordChange = async () => {
    setPassMsg(null);
    if (!currentPass) {
      setPassMsg({ type: "error", text: "Current password is required" });
      return;
    }
    if (newPass.length < 6) {
      setPassMsg({ type: "error", text: "New password must be at least 6 characters" });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg({ type: "error", text: "New passwords don't match" });
      return;
    }
    setPassLoading(true);
    try {
      await authChangePassword(currentPass, newPass);
      setPassMsg({ type: "success", text: "Password changed successfully!" });
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (err) {
      setPassMsg({ type: "error", text: err.message });
    }
    setPassLoading(false);
    setTimeout(() => setPassMsg(null), 4000);
  };

  // ── Export ──
  const handleExport = async () => {
    const data = await exportAll();
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
    reader.onload = async (ev) => {
      try {
        await importAll(ev.target.result);
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
  const handleReset = async () => {
    await resetAll();
    setConfirmReset(false);
    window.location.reload();
  };

  // ── Resume Upload ──
  const handleResumeFileUpload = async (file) => {
    if (!file) return;
    const allowed = ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setResumeMsg({ type: "error", text: "Please select a PDF or Word document." });
      return;
    }
    setResumeMsg(null);
    setResumeUploading(true);
    try {
      const url = await uploadResumeFile(file);
      setResumeUrlState(url);
      setResumeFileName(file.name);
      setResumeMsg({ type: "success", text: `"${file.name}" uploaded & saved!` });
    } catch (err) {
      setResumeMsg({
        type: "error", text: err.message.includes("bucket") ?
          'Create a public Storage bucket named "portfolio" in Supabase.' : err.message
      });
    }
    setResumeUploading(false);
    setTimeout(() => setResumeMsg(null), 4000);
  };

  // ── Resume URL (manual) ──
  const handleSaveResume = async () => {
    await setResumeUrl(resumeUrl);
    setResumeMsg({ type: "success", text: "Resume URL saved!" });
    setTimeout(() => setResumeMsg(null), 4000);
  };
  const handleClearResume = async () => {
    await setResumeUrl("");
    setResumeUrlState("");
    setResumeFileName("");
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
        {/* Change Password */}
        <div className="admin-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--accent-text)" }}>
            <i className="fas fa-key mr-2" />Change Password
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>Current Password</label>
              <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)}
                className="admin-input" placeholder="••••••••" />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>New Password</label>
              <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)}
                className="admin-input" placeholder="••••••••" />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>Confirm New Password</label>
              <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                className="admin-input" placeholder="••••••••" />
            </div>
            {passMsg && (
              <p className="text-xs" style={{ color: passMsg.type === "error" ? "#ef4444" : "#22c55e" }}>
                <i className={`fas ${passMsg.type === "error" ? "fa-exclamation-circle" : "fa-check-circle"} mr-1`} />
                {passMsg.text}
              </p>
            )}
            <button onClick={handlePasswordChange} disabled={passLoading} className="btn-primary text-sm self-start mt-1">
              {passLoading ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-shield-halved" />}
              {passLoading ? " Updating..." : " Update Password"}
            </button>
          </div>
        </div>

        {/* Resume */}
        <div className="admin-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--accent-text)" }}>
            <i className="fas fa-file-pdf mr-2" />Resume / CV
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--muted-text)" }}>
            Upload your resume file or paste a URL. The "My Resume" button on the site links here.
          </p>
          <div className="flex flex-col gap-3">
            {/* Upload zone */}
            <div
              onClick={() => !resumeUploading && resumeFileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleResumeFileUpload(e.dataTransfer.files[0]); }}
              className="relative rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 py-5 px-4"
              style={{ background: "var(--glass)", border: "2px dashed var(--glass-border)", transition: "border-color 0.2s", minHeight: 80 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-text)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; }}
            >
              {resumeUploading ? (
                <><i className="fas fa-spinner fa-spin text-xl" style={{ color: "var(--accent-text)" }} />
                  <span className="text-xs" style={{ color: "var(--muted-text)" }}>Uploading…</span></>
              ) : resumeFileName || resumeUrl ? (
                <><i className="fas fa-file-check text-xl" style={{ color: "#22c55e" }} />
                  <span className="text-xs text-center" style={{ color: "#22c55e" }}>
                    {resumeFileName || "File uploaded"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-text)" }}>Click to replace</span></>
              ) : (
                <><i className="fas fa-cloud-arrow-up text-2xl" style={{ color: "var(--accent-text)" }} />
                  <span className="text-sm" style={{ color: "var(--muted-text)" }}>Click or drag PDF / Word file here</span></>
              )}
            </div>
            <input ref={resumeFileRef} type="file" accept=".pdf,.doc,.docx,application/pdf" className="hidden"
              onChange={(e) => handleResumeFileUpload(e.target.files[0])} />

            {resumeMsg && (
              <p className="text-xs" style={{ color: resumeMsg.type === "error" ? "#ef4444" : "#22c55e" }}>
                <i className={`fas ${resumeMsg.type === "error" ? "fa-exclamation-circle" : "fa-check-circle"} mr-1`} />
                {resumeMsg.text}
              </p>
            )}

            {/* URL fallback */}
            <div>
              <label className="block mb-1 text-xs" style={{ color: "var(--muted-text)" }}>Or paste a URL (Google Drive, Dropbox…)</label>
              <div className="flex gap-2">
                <input value={resumeUrl} onChange={(e) => setResumeUrlState(e.target.value)}
                  placeholder={resumeLoaded ? "https://…" : "Loading…"}
                  disabled={!resumeLoaded}
                  className="admin-input text-sm flex-1" style={{ opacity: 0.7 }} />
                <button onClick={handleSaveResume} className="btn-primary text-sm px-3">
                  <i className="fas fa-save" />
                </button>
              </div>
            </div>

            {resumeLoaded && resumeUrl && (
              <button onClick={handleClearResume}
                className="text-xs self-start px-3 py-1.5 rounded-lg"
                style={{ background: "var(--glass)", color: "var(--muted-text)", border: "1px solid var(--glass-border)" }}>
                <i className="fas fa-xmark mr-1" /> Clear / Use Default
              </button>
            )}
          </div>
        </div>

        {/* Data Management */}
        <div className="admin-card p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--accent-text)" }}>
            <i className="fas fa-database mr-2" />Data Management
          </h2>
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl flex items-center justify-between"
              style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--white-text)" }}>Export Backup</p>
                <p className="text-xs" style={{ color: "var(--muted-text)" }}>Download projects & profile as JSON</p>
              </div>
              <button onClick={handleExport} className="admin-btn-sm px-4 py-2" style={{ color: "var(--cyan)" }}>
                <i className="fas fa-download mr-1" /> Export
              </button>
            </div>

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

            <div className="p-4 rounded-xl flex items-center justify-between"
              style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "#ef4444" }}>Reset All Data</p>
                <p className="text-xs" style={{ color: "var(--muted-text)" }}>Clear all database data and reload defaults</p>
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
                This will permanently delete all data from the database. Your admin password will not be affected.
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
