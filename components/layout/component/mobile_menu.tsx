import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { NavLink } from "../../util/nav_link";
import { SocialLinks } from "../../util/social_links";

export const MobileMenu = ({ isOpen, setIsOpen, data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {isOpen && (
        <div className="bg-lunar-green h-screen z-10 w-screen fixed pt-8 pb-32 flex flex-col items-center justify-between ">
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
              className={`h-48 py-2}`}
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
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};
