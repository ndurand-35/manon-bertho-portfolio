import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const isExternalUrl = (url?: string | null) => !!url && /^https?:\/\//.test(url);

// Les liens saisis dans Tina n'ont pas toujours de « / » initial (« contact », « #services »).
const toPath = (url: string) => (url.startsWith("/") ? url : `/${url}`);

/**
 * Indique si le lien pointe vers la page courante. Faux au premier rendu :
 * le HTML statique ne doit pas dépendre de l'URL (sinon erreur d'hydratation).
 */
export const useIsActive = (url?: string | null) => {
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(true), []);

  if (!isClient || url == null || isExternalUrl(url)) return false;
  const current = router.asPath.split("?")[0];
  const target = toPath(url);
  return current === target || current.startsWith(`${target}/`);
};

type NavLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href?: string | null;
  /** Classes des liens internes selon qu'ils pointent vers la page courante ou non. */
  activeClassName?: string;
  inactiveClassName?: string;
};

/** Lien interne via next/link, lien externe dans un nouvel onglet. */
export const NavLink = ({
  href,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  ...rest
}: NavLinkProps) => {
  const isActive = useIsActive(href);

  if (!href || isExternalUrl(href)) {
    return (
      <a
        href={href ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      />
    );
  }
  return (
    <Link
      href={toPath(href)}
      aria-current={isActive ? "page" : undefined}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
      {...rest}
    />
  );
};
