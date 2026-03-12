import React, { useState, useEffect } from "react";
import { authStatus, authSetup, authLogin, authVerify } from "./dataStore";

export default function AdminAuth({ children }) {
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [isSetup, setIsSetup] = useState(false); // true = no admin exists yet

    // On mount: check server for auth status + existing session
    useEffect(() => {
        (async () => {
            try {
                // 1. Check if admin password already exists on the server
                const status = await authStatus();
                setIsSetup(!status.isSetup); // if NOT setup on server, show setup form

                // 2. If we have a stored JWT, verify it's still valid
                if (status.isSetup) {
                    const valid = await authVerify();
                    if (valid) setAuthed(true);
                }
            } catch (err) {
                console.error("Auth check failed:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isSetup) {
                // First-time setup
                if (password.length < 6) {
                    setError("Password must be at least 6 characters");
                    return;
                }
                if (password !== confirm) {
                    setError("Passwords don't match");
                    return;
                }
                await authSetup(password);
            } else {
                // Login
                await authLogin(password);
            }
            setAuthed(true);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="admin-auth-bg">
                <div className="admin-auth-card text-center">
                    <div className="flex items-center justify-center gap-3" style={{ color: "var(--muted-text)" }}>
                        <i className="fas fa-spinner fa-spin text-xl" />
                        <span>Checking authentication...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (authed) return children;

    return (
        <div className="admin-auth-bg">
            <div className="admin-auth-card">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl"
                        style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--cyan)" }}>
                        <i className="fas fa-shield-halved" />
                    </div>
                    <h1 className="text-2xl font-bold gradient-heading">Admin Panel</h1>
                    <p className="text-sm mt-1" style={{ color: "var(--muted-text)" }}>
                        {isSetup ? "Create your admin password" : "Enter your password to continue"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>
                            {isSetup ? "New Password" : "Password"}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="admin-input"
                            placeholder="••••••••"
                            autoFocus
                        />
                    </div>

                    {isSetup && (
                        <div>
                            <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="admin-input"
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    {error && (
                        <p className="text-sm text-center" style={{ color: "#ef4444" }}>
                            <i className="fas fa-exclamation-circle mr-1" />{error}
                        </p>
                    )}

                    <button type="submit" className="btn-primary w-full justify-center mt-2">
                        <i className={`fas ${isSetup ? "fa-key" : "fa-lock-open"}`} />
                        {isSetup ? "Create Password & Enter" : "Unlock"}
                    </button>
                </form>

                {!isSetup && (
                    <p className="text-xs mt-4 text-center" style={{ color: "var(--muted-text)", opacity: 0.6 }}>
                        <i className="fas fa-lock mr-1" />
                        Password is stored securely on the server
                    </p>
                )}
            </div>
        </div>
    );
}
