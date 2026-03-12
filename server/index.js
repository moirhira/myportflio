require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const authRoutes = require("./auth");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Supabase client (service role — bypasses RLS) ──────────────────────────
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);
app.locals.supabase = supabase;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// ── Health check ───────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Portfolio server running on http://localhost:${PORT}`);
});
