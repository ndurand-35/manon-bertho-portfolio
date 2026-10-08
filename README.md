# Manon Bertho Studio

Site vitrine de Manon Bertho, graphiste et photographe freelance à Rennes : [manonbertho-studio.fr](https://www.manonbertho-studio.fr).

Le site est construit avec Next.js et [TinaCMS](https://tina.io). Le contenu (pages, services, projets, réglages globaux) est stocké en Markdown/MDX et JSON dans ce dépôt, et se modifie visuellement depuis `/admin`.

## Stack

- [Next.js 15](https://nextjs.org) (Pages Router), React 18, TypeScript
- [TinaCMS 3](https://tina.io) avec Tina Cloud pour l'édition en ligne
- Tailwind CSS, Flowbite, Headless UI
- Hébergement sur [Vercel](https://vercel.com) (Analytics et Speed Insights activés)

## Prérequis

- Node.js 24 (voir `engines` dans `package.json`)
- Yarn 1
- Un accès au projet sur [app.tina.io](https://app.tina.io) pour l'édition en ligne et le build

## Démarrer en local

```bash
yarn install
cp .env.example .env
yarn dev
```

Variables d'environnement (`.env`) :

```
NEXT_PUBLIC_TINA_CLIENT_ID=<depuis app.tina.io>
TINA_TOKEN=<depuis app.tina.io>
NEXT_PUBLIC_TINA_BRANCH=<branche configurée dans Tina>
```

`yarn dev` lance le serveur GraphQL local de Tina, qui lit le contenu directement depuis le disque.

URLs locales :

- http://localhost:3000 : le site
- http://localhost:3000/admin : l'éditeur Tina
- http://localhost:4001/altair/ : playground GraphQL

## Scripts

| Commande               | Rôle                                                       |
| ---------------------- | ---------------------------------------------------------- |
| `yarn dev`             | Serveur de développement (Tina + Next)                     |
| `yarn build`           | Build Tina puis build Next (nécessite les variables Tina)  |
| `yarn start`           | Build Tina puis serveur Next de production                 |
| `yarn lint`            | ESLint sur les fichiers `.ts` / `.tsx`                     |
| `yarn optimize-images` | Génère les versions WebP des images (voir plus bas)        |

## Structure

```
content/
  global/       Réglages globaux (header, footer, thème)
  pages/        Pages construites par blocs (home, CGV…)
  services/     Une fiche par prestation (MDX)
  projetType/   Projets du portfolio
tina/
  config.tsx    Configuration Tina
  collection/   Schémas des collections (page, service, projet, global)
  fields/       Champs personnalisés (icône, couleur)
pages/          Routes Next : /[filename], /services/[filename], /projets, /contact, sitemap.xml
components/
  blocks/       Blocs utilisables dans les pages (hero, presentation, features, shop…)
  layout/       Header, footer, layout
  util/         Img, Seo, Section, Container, Icon
lib/
  site.ts       Constantes du site (URL, titre, description, contact, réseaux)
  image-manifest.json
scripts/
  optimize-images.mjs
```

La page d'accueil est servie depuis `content/pages/home.md` (réécriture `/` → `/home` dans `next.config.js`, `/home` redirige vers `/`). Les anciennes URLs sont redirigées dans ce même fichier.

## SEO

- Titre et description par page via `components/util/seo.tsx`, avec des valeurs par défaut dans `lib/site.ts`
- Sitemap dynamique sur `/sitemap.xml`, `robots.txt` dans `public/`

## Images

Les images ajoutées via Tina sont stockées dans `public/uploads`. Le script `scripts/optimize-images.mjs` en génère des versions WebP légères (800 et 1600 px) dans `public/optimized` et met à jour `lib/image-manifest.json`, utilisé par le composant `<Img>`. Les originaux ne sont jamais modifiés et restent accessibles au clic.

Le traitement est incrémental. En local, `sharp` doit être installé une fois :

```bash
npm install --no-save sharp@0.33.5
yarn optimize-images
```

Le workflow GitHub `optimize-images.yml` l'exécute automatiquement à chaque push sur `main` qui touche `public/uploads`, puis commit le résultat.

## Branches et déploiement

- `main` : production
- `preprod` : préproduction

Vercel déploie chaque branche. Les modifications faites depuis l'admin Tina sont commitées directement dans le dépôt (commits « TinaCMS content update »).

## Licence

Code basé sur le [Tina Starter](https://github.com/tinacms/tina-cloud-starter), sous [licence Apache 2.0](./LICENSE).
