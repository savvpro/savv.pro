/* ─────────────────────────────────────────────────────────────────────────
   SavvPro — BaseEcho config (example)
   ─────────────────────────────────────────────────────────────────────────
   Copy this file to `config.local.js` and fill in the three values.
   `config.local.js` is gitignored — it never lands in the public repo.

   These are loaded BEFORE app.js (see index.html / join.html), which reads
   them off the window object at boot.

   When all three are empty, the agent falls back to a polite placeholder
   reply so the site still functions for visitors.
   ───────────────────────────────────────────────────────────────────────── */

window.SAVVPRO_API_URL    = ""; // e.g. "https://baseecho.example.com"
window.SAVVPRO_CHATBOT_ID = ""; // e.g. "cbt_abc123"
window.SAVVPRO_API_TOKEN  = ""; // e.g. "base_echo_sk_xxxxxxxxxxxx"
