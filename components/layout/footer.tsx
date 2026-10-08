import React from "react";
import Link from "next/link";
import { Section } from "../util/section";
import { tinaField } from "tinacms/dist/react";
import { NavLink } from "../util/nav_link";
import { SocialLinks } from "../util/social_links";

export const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Section color={data.color} className="hidden md:flex">
      <div className="w-full p-4 md:py-8 px-32">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Link href="/" className="mb-4 flex items-center sm:mb-0">
              <img loading="lazy"
                data-tina-field={tinaField(data, "logo")}
                src={data.logo?.src}
                alt={data.logo?.alt}
                className="mr-3 h-16 py-2"
              />
              <span className=" self-center  whitespace-nowrap font-title text-2xl font-semibold text-white ">
                Manon Bertho
              </span>
            </Link>
            <SocialLinks className="text-white" />
          </div>
          <ul className="flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
            {data.nav &&
              data.nav.map((item, i) => (
                <li key={i}>
                  <NavLink
                    data-tina-field={tinaField(item, "href")}
                    href={item.href}
                    className="block py-2 text-center transition ease-in-out hover:text-secondary md:p-0"
                    activeClassName="text-secondary"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-300  sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-300  sm:text-center">
          © {currentYear}{" "}
          <Link href="/" className="hover:underline">
            Manon Bertho Studio
          </Link>
          . Tous droits réservés.
        </span>
      </div>
    </Section>
  );
};
