import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { NavLink } from "../../util/nav_link";
import { SocialLinks } from "../../util/social_links";

export const MobileMenu = ({ isOpen, setIsOpen, data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {isOpen && (
        <div className="bg-lunar-green h-screen z-10 w-screen fixed overflow-y-auto pt-8 pb-32 flex flex-col items-center justify-between gap-6">
          <span className="block text-sm text-gray-300 px-4 sm:text-center">
            © {currentYear}{" "}
            <Link href="/" className="hover:underline">
              Manon Bertho Studio
            </Link>
            . Tous droits réservés.
          </span>
          <SocialLinks className="text-white" />
          <Link href="/">
            <img
              loading="lazy"
              src={data.logo?.src}
              alt={data.logo?.alt}
              data-tina-field={tinaField(data, "logo")}
              className="h-32 py-2"
            />
          </Link>
          <ul className="flex flex-col gap-2 justify-center text-white text-xl">
            {data.nav &&
              data.nav.map((item, i) => (
                <li key={i}>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    data-tina-field={tinaField(item, "href")}
                    href={item.href}
                    className="block text-center transition ease-in-out hover:text-secondary md:p-0"
                    activeClassName="text-secondary"
                  >
                    {item.label}
                  </NavLink>
                  {item.nav?.length > 0 && (
                    <ul className="mt-1 mb-2 flex flex-col gap-1 text-base text-gray-300">
                      {item.nav.map((subItem, j) => (
                        <li key={j}>
                          <NavLink
                            onClick={() => setIsOpen(false)}
                            data-tina-field={tinaField(subItem, "href")}
                            href={subItem.href}
                            className="block text-center transition ease-in-out hover:text-secondary"
                            activeClassName="text-secondary"
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};
