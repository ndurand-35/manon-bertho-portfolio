import { CustomFlowbiteTheme, Dropdown, Flowbite } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { tinaField } from "tinacms/dist/react";

const customTheme: CustomFlowbiteTheme = {
  dropdown: {
    arrowIcon: "ml-2 h-4 w-4",
    content: "py-1 px-3 space-y-2 text-white bg-lunar-green focus:outline-none",
    floating: {
      animation: "transition-opacity",
      base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none !border-lunar-green",
      content: "py-1 text-sm text-gray-700 border-lunar-green",
      divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
      header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
      hidden: "invisible opacity-0",
      item: {
        container: "",
        base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-white bg-lunar-green hover:bg-lunar-green hover:text-secondary focus:outline-none",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        light:
          "border border-lunar-green bg-lunar-green text-gray-900 hover:text-secondary",
      },
      target: "w-fit",
    },
    inlineWrapper: "flex items-center",
  },
};

export const HeaderLink = ({ item }) => {
  const router = useRouter();

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

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
      {item.nav ? (
        <Flowbite theme={{ theme: customTheme, mode: "light" }}>
          <Dropdown label={item.label} color={"primary"} inline>
            {item.nav.map((subItem, i) => (
              <Dropdown.Item
                key={i}
                as={HeaderLink}
                item={subItem}
              ></Dropdown.Item>
            ))}
          </Dropdown>
        </Flowbite>
      ) : (
        <>
          {isUrlRelative(item.href) ? (
            <Link
              data-tina-field={tinaField(item, "href")}
              href={`/${item.href}`}
              className={`block py-2 text-center transition ease-in-out hover:text-secondary md:p-0 ${
                isUrlActive(item.href) ? "text-secondary" : "text-white"
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
        </>
      )}
    </>
  );
};
