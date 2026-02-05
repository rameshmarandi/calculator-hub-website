/** @type {import('next-sitemap').IConfig} */

const { FULL_BASE_URL } = require('./lib/constant');

const siteUrl =FULL_BASE_URL
/*
  IMPORTANT STRATEGY
  -----------------
  Finance -> highest priority
  Construction -> high
  Health -> medium high
  Education -> medium
  Astrology -> medium low
  Utility -> low

  This matches CPC + traffic potential
*/

module.exports = {
  siteUrl,

  /* =================================
     CORE
  ================================= */
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000, // supports 1000s of pages safely
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
     ROBOTS.TXT
  ================================= */
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: [
          "/admin",
          "/api",
          "/dashboard",
          "/private",
        ],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },

  /* =================================
     DYNAMIC PRIORITY RULES
     This is the important part
  ================================= */
  transform: async (config, path) => {
    const now = new Date().toISOString();

    /* homepage */
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: now,
      };
    }

    /* category hubs */
    const categoryRules = [
      { prefix: "/finance", priority: 0.95, freq: "daily" },
      { prefix: "/construction", priority: 0.9, freq: "weekly" },
      { prefix: "/health", priority: 0.88, freq: "weekly" },
      { prefix: "/education", priority: 0.85, freq: "weekly" },
      { prefix: "/astrology", priority: 0.82, freq: "weekly" },
      { prefix: "/utility", priority: 0.75, freq: "monthly" },
    ];

    const rule = categoryRules.find((r) => path.startsWith(r.prefix));

    if (rule) {
      return {
        loc: path,
        changefreq: rule.freq,
        priority: rule.priority,
        lastmod: now,
      };
    }

    /* fallback */
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: now,
    };
  },
};
