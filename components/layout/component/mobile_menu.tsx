import { Instagram, Linkedin } from "iconoir-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";

export const MobileMenu = ({ isOpen, data }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

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
    <>
      {isOpen && (
        <div className="bg-lunar-green h-screen z-10 w-screen fixed pt-8 pb-24 flex flex-col items-center justify-between ">
          <span className="block text-sm text-gray-300 px-4 sm:text-center">
            © {currentYear}{" "}
            <Link href="/" className="hover:underline">
              Manon Bertho Studio
            </Link>
            . Tous droits réservés.
          </span>
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
          <img
            src={data.logo?.src}
            alt={data.logo?.alt}
            data-tina-field={tinaField(data, "logo")}
            className={`h-48 py-2}`}
          />
          <ul className="flex flex-col gap-2 justify-center text-white text-xl">
            {data.nav &&
              data.nav.map((item, i) => {
                const isRelative = isUrlRelative(item.href);
                const activeItem = isUrlActive(item.href);
                return (
                  <li key={i}>
                    {isRelative ? (
                      <Link
                        data-tina-field={tinaField(item, "href")}
                        href={`/${item.href}`}
                        className={`block text-center transition ease-in-out hover:text-secondary md:p-0 ${
                          activeItem && "text-secondary"
                        }`}
                        aria-current="page"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        data-tina-field={tinaField(item, "href")}
                        href={item.href}
                        target="_blank"
                        className="block text-center transition ease-in-out hover:text-secondary md:p-0"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};
