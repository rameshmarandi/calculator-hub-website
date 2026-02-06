/** @type {import('next-sitemap').IConfig} */

const { FULL_BASE_URL } = require("./lib/constant");

const siteUrl = FULL_BASE_URL;

module.exports = {
  siteUrl,

  /* =================================
     STATIC EXPORT COMPATIBILITY
  ================================= */
  outDir: "./out", // critical for nginx static hosting

  /* =================================
     CORE
  ================================= */
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  autoLastmod: true,

  /* =================================
     DEFAULT FALLBACK
  ================================= */
  changefreq: "monthly",
  priority: 0.7,

  /* =================================
     NEVER INDEX THESE
  ================================= */
  exclude: [
    "/admin/*",
    "/api/*",
    "/dashboard/*",
    "/private/*",
    "/_next/*",
    "/404",
    "/500",
  ],

  /* =================================
     ROBOTS
  ================================= */
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/admin", "/api", "/dashboard", "/private"],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },

  /* =================================
     SMART PRIORITY LOGIC
  ================================= */
  transform: async (config, path) => {
    const now = new Date().toISOString();

    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: now,
      };
    }

    const categoryRules = [
      { prefix: "/finance", priority: 0.95, freq: "daily" },
      { prefix: "/construction", priority: 0.9, freq: "weekly" },
      { prefix: "/health", priority: 0.88, freq: "weekly" },
      { prefix: "/education", priority: 0.85, freq: "weekly" },
      { prefix: "/astrology", priority: 0.82, freq: "weekly" },
      { prefix: "/utility", priority: 0.75, freq: "monthly" },
    ];

    const rule = categoryRules.find((r) => path.startsWith(r.prefix));

    return {
      loc: path,
      changefreq: rule?.freq ?? config.changefreq,
      priority: rule?.priority ?? config.priority,
      lastmod: now,
    };
  },
};
