module.exports = {
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  // tinacms imports CommonJS deps (color-string) with ESM named imports,
  // which Node rejects at SSR time unless Next bundles the package itself.
  transpilePackages: ["tinacms"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};
