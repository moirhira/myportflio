const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { requireAuth } = require("./middleware");

const router = express.Router();

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = "24h";

// ── Helper: get Supabase client (injected via app.locals) ──────────────────
function db(req) {
    return req.app.locals.supabase;
}

// ── Helper: sign a JWT ─────────────────────────────────────────────────────
function signToken() {
    return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: TOKEN_EXPIRY,
    });
}

// ── GET /api/auth/status ───────────────────────────────────────────────────
// Check if an admin password has been set up
router.get("/status", async (req, res) => {
    try {
        const { data, error } = await db(req)
            .from("admin_auth")
            .select("id")
            .eq("id", 1)
            .maybeSingle();

        if (error) throw error;
        res.json({ isSetup: !!data });
    } catch (err) {
        console.error("Auth status error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ── POST /api/auth/setup ───────────────────────────────────────────────────
// First-time password creation — only works if no admin exists
router.post("/setup", async (req, res) => {
    try {
        const { password } = req.body;
        if (!password || password.length < 6) {
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters" });
        }

        // Check if admin already exists
        const { data: existing } = await db(req)
            .from("admin_auth")
            .select("id")
            .eq("id", 1)
            .maybeSingle();

        if (existing) {
            return res.status(403).json({
                error: "Admin password already set. Use login instead.",
            });
        }

        // Hash and store
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const { error } = await db(req)
            .from("admin_auth")
            .insert({ id: 1, password_hash: hash });

        if (error) throw error;

        const token = signToken();
        res.json({ token, message: "Admin password created successfully" });
    } catch (err) {
        console.error("Auth setup error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────
// Verify password and return JWT
router.post("/login", async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        const { data, error } = await db(req)
            .from("admin_auth")
            .select("password_hash")
            .eq("id", 1)
            .maybeSingle();

        if (error) throw error;
        if (!data) {
            return res
                .status(404)
                .json({ error: "No admin account found. Set up first." });
        }

        const valid = await bcrypt.compare(password, data.password_hash);
        if (!valid) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const token = signToken();
        res.json({ token });
    } catch (err) {
        console.error("Auth login error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ── GET /api/auth/verify ──────────────────────────────────────────────────
// Validate an existing JWT token
router.get("/verify", requireAuth, (_req, res) => {
    res.json({ valid: true });
});

// ── POST /api/auth/change-password ────────────────────────────────────────
// Change password (requires valid JWT + current password)
router.post("/change-password", requireAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res
                .status(400)
                .json({ error: "Current and new passwords are required" });
        }
        if (newPassword.length < 6) {
            return res
                .status(400)
                .json({ error: "New password must be at least 6 characters" });
        }

        // Verify current password
        const { data, error } = await db(req)
            .from("admin_auth")
            .select("password_hash")
            .eq("id", 1)
            .maybeSingle();

        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: "No admin account found" });
        }

        const valid = await bcrypt.compare(currentPassword, data.password_hash);
        if (!valid) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        // Hash and update
        const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        const { error: updateErr } = await db(req)
            .from("admin_auth")
            .update({ password_hash: hash, updated_at: new Date().toISOString() })
            .eq("id", 1);

        if (updateErr) throw updateErr;

        // Issue a fresh token
        const token = signToken();
        res.json({ token, message: "Password changed successfully" });
    } catch (err) {
        console.error("Change password error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
