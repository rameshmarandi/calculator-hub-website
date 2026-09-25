/** @type {import('next-sitemap').IConfig} */

const { FULL_BASE_URL } = require("./lib/constant");

module.exports = {
  siteUrl: FULL_BASE_URL,

  // Static export directory
  outDir: "./out",

  // Generate robots.txt
  generateRobotsTxt: true,

  // Your site is currently small enough for one sitemap.
  generateIndexSitemap: false,

  sitemapSize: 7000,

  autoLastmod: true,

  changefreq: "monthly",
  priority: 0.7,

  // Exclude pages that should never be in the sitemap
  exclude: [
    "/admin/*",
    "/api/*",
    "/dashboard/*",
    "/private/*",
    "/_next/*",
    "/404",
    "/500",

    // Removed Astrology section
    "/astrology/*",
  ],

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
  },

  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
      };
    }

    const categoryRules = [
      {
        prefix: "/finance",
        priority: 0.95,
        freq: "daily",
      },
      {
        prefix: "/construction",
        priority: 0.9,
        freq: "weekly",
      },
      {
        prefix: "/health",
        priority: 0.88,
        freq: "weekly",
      },
      {
        prefix: "/education",
        priority: 0.85,
        freq: "weekly",
      },
    ];

    const rule = categoryRules.find((item) => path.startsWith(item.prefix));

    return {
      loc: path,
      changefreq: rule?.freq ?? config.changefreq,
      priority: rule?.priority ?? config.priority,
    };
  },
};
