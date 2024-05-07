import React from "react";
import Link from "next/link";
import { Instagram, Linkedin } from "iconoir-react";
import { Section } from "../util/section";
import { useRouter } from "next/router";

export const Footer = ({ data, icon, rawData }) => {
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const currentYear = new Date().getFullYear();

  const isUrlRelative = (url: string) => {
    let isRelative = true;
    if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0)
      isRelative = false;
    return isRelative;
  };
  const isUrlActive = (url: string) => {
    return (
      (url === "" ? router.asPath === "/" : router.asPath.includes(url)) &&
      isClient
    );
  };

  return (
    <Section color={data.color}>
      <div className="w-full p-4 md:py-8 px-32">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Link href="/" className="mb-4 flex items-center sm:mb-0">
              <img
                src={data.logo?.src}
                alt={data.logo?.alt}
                className="mr-3 h-16 py-2"
              />
              <span className=" self-center  whitespace-nowrap font-title text-2xl font-semibold text-white ">
                Manon Bertho
              </span>
            </Link>
            <ul className="flex text-white space-x-4">
              <li>
                <a
                  href="https://www.instagram.com/manonberthostudio/"
                  className="hover:text-pink-600 transition ease-in-out"
                  target="_blank"
                >
                  <Instagram />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/manon-bertho-nicolas-342648151/"
                  className="hover:text-blue-600 transition ease-in-out "
                  target="_blank"
                >
                  <Linkedin />
                </a>
              </li>
            </ul>
          </div>
          <ul className="flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
            {data.nav &&
              data.nav.map((item, i) => {
                const isRelative = isUrlRelative(item.href);
                const activeItem = isUrlActive(item.href);
                return (
                  <li key={i}>
                    {isRelative ? (
                      <Link
                        href={`/${item.href}`}
                        className={`block py-2 text-center transition ease-in-out hover:text-secondary md:p-0 ${
                          activeItem && "text-secondary"
                        }`}
                        aria-current="page"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        className="block py-2 text-center transition ease-in-out hover:text-secondary md:p-0"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
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
