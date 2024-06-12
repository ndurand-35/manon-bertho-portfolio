import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from ".";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
import { HeaderLink } from "./component/header_link";
import { Instagram, Linkedin } from "iconoir-react";
import { MobileMenu } from "./component/mobile_menu";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();
  const theme = useTheme();

  const [isClient, setIsClient] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const headerColor = {
    "lunar-green": "text-white bg-lunar-green",
    "link-water": "text-gray-800 bg-link-water",
  };

  const headerColorCss = headerColor[data.color];
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const genericHamburgerLine = `h-1 w-8 my-1 rounded-full bg-white transition ease transform duration-300`;

  return (
    <>
      <MobileMenu isOpen={isOpen} data={data} />
      <div
        className={`fixed bottom-0 left-0 z-20 h-16 w-full md:top-0 ${headerColorCss}`}
      >
        <div className=" mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 md:px-8 xl:px-0">
          <Link
            href="/"
            className={`flex gap-1 items-center whitespace-nowrap tracking-[.002em]`}
          >
            <img
              src={data.logo?.src}
              alt={data.logo?.alt}
              data-tina-field={tinaField(data, "logo")}
              className={`mr-3 h-16 py-2 ${isOpen && "hidden"}`}
            />
            <span
              data-tina-field={tinaField(data, "name")}
              className={`self-center whitespace-nowrap font-title text-2xl font-semibold ${
                isOpen && "hidden"
              }`}
            >
              {data.name}
            </span>
          </Link>
          <ul className="hidden md:flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
            {data.nav &&
              data.nav.map((item, i) => {
                return (
                  <li key={i} className="flex items-center">
                    <HeaderLink item={item} />
                  </li>
                );
              })}
          </ul>
          <button
            className="flex flex-col h-12 w-12 justify-center items-center md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? "rotate-45 translate-y-3" : ""
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? "-rotate-45 -translate-y-3" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
};
