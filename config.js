/* ─────────────────────────────────────────────────────────────────────────
   SavvPro — BaseEcho config
   ─────────────────────────────────────────────────────────────────────────
   These three values are loaded BEFORE app.js (see index.html / join.html),
   which reads them off the window object at boot.

   This file is COMMITTED to the repo. BaseEcho's API token is a publishable
   token — security comes from the backend's domain-allowlist on the token,
   not from keeping the token secret. This is the same security model used
   by Stripe publishable keys (`pk_live_*`) and Google Maps API keys.

   IMPORTANT: Make sure savv.pro (and any dev origins like localhost:5500)
   are whitelisted on this API token in the BaseEcho dashboard. That is
   where the actual security lives.

   When all three are empty, the agent falls back to a polite placeholder
   reply so the site still functions.
   ───────────────────────────────────────────────────────────────────────── */

window.SAVVPRO_API_URL    = "https://baseecho.savv.pro";
window.SAVVPRO_CHATBOT_ID = "savv-pro-website-chatbot-86031c97";
window.SAVVPRO_API_TOKEN  = "base_echo_431c5aba443084a46b75ed5b2337cb4188b9cb43c220bd713f9a1332cc44dad1";
