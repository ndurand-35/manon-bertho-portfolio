import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from ".";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme();

  const headerColor = {
    "lunar-green": "text-white bg-lunar-green",
    "link-water": "text-gray-800 bg-link-water",
  };

  const headerColorCss = headerColor[data.color];

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 z-20 h-16 w-full md:top-0 ${headerColorCss}`}
    >
      <div className=" mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 md:px-8 xl:px-0">
        <Link
          href="/"
          className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
        >
          <img
            src={data.logo?.src}
            alt={data.logo?.alt}
            data-tina-field={tinaField(data, "logo")}
            className="mr-3 h-16 py-2"
          />
          <span
            data-tina-field={tinaField(data, "name")}
            className="self-center whitespace-nowrap font-title text-2xl font-semibold"
          >
            {data.name}
          </span>
        </Link>
        <ul className="flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
          {data.nav &&
            data.nav.map((item, i) => {
              let isRelative = true;
              if (
                item.href.indexOf("http://") === 0 ||
                item.href.indexOf("https://") === 0
              )
                isRelative = false;
              const activeItem =
                (item.href === ""
                  ? router.asPath === "/"
                  : router.asPath.includes(item.href)) && isClient;
              return (
                <li key={i}>
                  {isRelative ? (
                    <Link
                      data-tina-field={tinaField(item, "href")}
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
                      data-tina-field={tinaField(item, "href")}
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
      <div
        className={`absolute h-1 bg-gradient-to-r from-transparent ${
          data.color === "primary" ? `via-white` : `via-black dark:via-white`
        } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
      />
    </div>
  );
};
