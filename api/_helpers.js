const { createClient } = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = "24h";

// ── Supabase client (service role — bypasses RLS) ──────────────────────────
let _supabase;
function getSupabase() {
    if (!_supabase) {
        _supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY
        );
    }
    return _supabase;
}

// ── JWT helpers ────────────────────────────────────────────────────────────
function signToken() {
    return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: TOKEN_EXPIRY,
    });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

// ── Auth middleware (for serverless) ───────────────────────────────────────
function requireAuth(req, res) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        res.status(401).json({ error: "No token provided" });
        return false;
    }
    const token = header.split(" ")[1];
    try {
        req.admin = verifyToken(token);
        return true;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.status(401).json({ error: "Token expired" });
        } else {
            res.status(401).json({ error: "Invalid token" });
        }
        return false;
    }
}

// ── CORS helper ───────────────────────────────────────────────────────────
function cors(req, res) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return true;
    }
    return false;
}

module.exports = { getSupabase, signToken, verifyToken, requireAuth, cors, SALT_ROUNDS };
