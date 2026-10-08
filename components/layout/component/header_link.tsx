import React from "react";
import { tinaField } from "tinacms/dist/react";
import { NavLink } from "../../util/nav_link";

const linkClassName =
  "block py-2 text-center transition ease-in-out hover:text-secondary md:p-0";

/**
 * Sous-menu toujours présent dans le HTML (masqué en CSS) : les robots suivent
 * ses liens sans avoir à l'ouvrir. Il s'ouvre au survol ou au clic (Entrée au clavier).
 */
const HeaderDropdown = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const visibility = isOpen
    ? "visible opacity-100 translate-y-0"
    : "invisible opacity-0 -translate-y-1.5";

  return (
    <div
      ref={ref}
      className="group relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        data-tina-field={tinaField(item, "label")}
        className="flex items-center text-white transition ease-in-out hover:text-secondary"
      >
        {item.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:rotate-180 group-aria-expanded:rotate-180 motion-reduce:transition-none"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* pt-3 : pas de trou entre le bouton et le menu, le survol n'est pas interrompu. */}
      <div
        id={menuId}
        className={`absolute left-0 top-full z-10 pt-3 transition duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none ${visibility}`}
      >
        <ul className="w-max space-y-2 rounded bg-lunar-green px-3 py-1 shadow">
          {item.nav.map((subItem, i) => (
            <li key={i} className="px-4 py-2 text-sm">
              <NavLink
                data-tina-field={tinaField(subItem, "href")}
                href={subItem.href}
                onClick={() => setIsOpen(false)}
                className="block text-left transition ease-in-out hover:text-secondary"
                activeClassName="text-secondary"
                inactiveClassName="text-white"
              >
                {subItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const HeaderLink = ({ item }) => {
  if (item.nav?.length) return <HeaderDropdown item={item} />;
  return (
    <NavLink
      data-tina-field={tinaField(item, "href")}
      href={item.href}
      className={linkClassName}
      activeClassName="text-secondary"
      inactiveClassName="text-white"
    >
      {item.label}
    </NavLink>
  );
};
