import React, { useState } from "react";
import { isPinSet, setPin, verifyPin } from "./dataStore";

export default function AdminAuth({ children }) {
    const [authed, setAuthed] = useState(false);
    const [pin, setPinVal] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [isSetup] = useState(!isPinSet());

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (isSetup) {
            if (pin.length < 4) { setError("PIN must be at least 4 characters"); return; }
            if (pin !== confirm) { setError("PINs don't match"); return; }
            await setPin(pin);
            setAuthed(true);
        } else {
            const ok = await verifyPin(pin);
            if (ok) setAuthed(true);
            else setError("Wrong PIN. Try again.");
        }
    };

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
                        {isSetup ? "Set up your admin PIN" : "Enter your PIN to continue"}
                    </p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>
                            {isSetup ? "New PIN" : "PIN"}
                        </label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPinVal(e.target.value)}
                            className="admin-input"
                            placeholder="••••••"
                            autoFocus
                        />
                    </div>

                    {isSetup && (
                        <div>
                            <label className="block mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-text)" }}>
                                Confirm PIN
                            </label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="admin-input"
                                placeholder="••••••"
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
                        {isSetup ? "Set PIN & Enter" : "Unlock"}
                    </button>
                </form>
            </div>
        </div>
    );
}
