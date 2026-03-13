const { getSupabase, cors } = require("../_helpers");

module.exports = async function handler(req, res) {
    if (cors(req, res)) return;
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
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
};
