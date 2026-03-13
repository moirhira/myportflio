const bcrypt = require("bcryptjs");
const { getSupabase, signToken, cors, SALT_ROUNDS } = require("../_helpers");

module.exports = async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const supabase = getSupabase();

    // Check if admin already exists
    const { data: existing } = await supabase
      .from("admin_auth")
      .select("id")
      .eq("id", 1)
      .maybeSingle();

    if (existing) {
      return res.status(403).json({ error: "Admin password already set. Use login instead." });
    }

    // Hash and store
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const { error } = await supabase
      .from("admin_auth")
      .insert({ id: 1, password_hash: hash });

    if (error) throw error;

    const token = signToken();
    res.json({ token, message: "Admin password created successfully" });
  } catch (err) {
    console.error("Auth setup error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
