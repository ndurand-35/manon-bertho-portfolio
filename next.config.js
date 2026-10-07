module.exports = {
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  // tinacms imports CommonJS deps (color-string) with ESM named imports,
  // which Node rejects at SSR time unless Next bundles the package itself.
  transpilePackages: ["tinacms"],
  async redirects() {
    return [
      // /home est servie sur / : on évite le contenu en double.
      { source: "/home", destination: "/", permanent: true },
      // Anciennes pages vides ou de démo.
      { source: "/Portfolio", destination: "/projets", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/posts", destination: "/", permanent: true },
      { source: "/posts/:slug*", destination: "/", permanent: true },
      // Service remplacé par « Sport & auto » (octobre 2026).
      {
        source: "/services/identite-visuelle",
        destination: "/#services",
        permanent: true,
      },
    ];
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
