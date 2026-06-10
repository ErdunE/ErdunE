/**
 * Floating widgets + analytics config (spec §5.8).
 *
 * Each widget has an independent `enabled` flag, so any can be toggled off
 * without touching component code. All widgets are desktop-only and load their
 * third-party scripts client-side + deferred (see FloatingWidgets.astro); a
 * disabled widget injects nothing and fetches nothing.
 *
 * cloudflareAnalytics stays disabled with an empty token until Phase 8, when
 * the token is generated at deploy. While disabled/empty it injects nothing.
 * (The dead Universal Analytics UA-68657454-1 is intentionally NOT carried over.)
 */
export const widgets = {
  calendly: {
    enabled: true,
    url: "https://calendly.com/erdune/15min",
  },
  chatbase: {
    enabled: true,
    chatbotId: "OiQfMdOhl78Pj66N6kHJz",
  },
  bmc: {
    enabled: true,
    id: "erdun",
    color: "#FF813F",
    description: "Support Erdun's work on Buy Me a Coffee",
  },
  stripeDonate: {
    enabled: true,
    url: "https://donate.stripe.com/fZu7sLaqc8QV1XF9QGa3u00",
  },
  cloudflareAnalytics: {
    enabled: false,
    token: "",
  },
} as const;
