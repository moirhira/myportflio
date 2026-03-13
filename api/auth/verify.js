const { requireAuth, cors } = require("../_helpers");

module.exports = async function handler(req, res) {
    if (cors(req, res)) return;
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    if (!requireAuth(req, res)) return;
    res.json({ valid: true });
};
