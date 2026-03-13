const bcrypt = require("bcryptjs");
const { getSupabase, signToken, cors } = require("../_helpers");

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("admin_auth")
      .select("password_hash")
      .eq("id", 1)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: "No admin account found. Set up first." });
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
};
