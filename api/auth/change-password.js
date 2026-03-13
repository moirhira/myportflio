const bcrypt = require("bcryptjs");
const { getSupabase, signToken, requireAuth, cors, SALT_ROUNDS } = require("../_helpers");

module.exports = async function handler(req, res) {
    if (cors(req, res)) return;
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    if (!requireAuth(req, res)) return;

    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current and new passwords are required" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: "New password must be at least 6 characters" });
        }

        const supabase = getSupabase();

        // Verify current password
        const { data, error } = await supabase
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
        const { error: updateErr } = await supabase
            .from("admin_auth")
            .update({ password_hash: hash, updated_at: new Date().toISOString() })
            .eq("id", 1);

        if (updateErr) throw updateErr;

        const token = signToken();
        res.json({ token, message: "Password changed successfully" });
    } catch (err) {
        console.error("Change password error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};
