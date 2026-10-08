import { CustomFlowbiteTheme, Dropdown, Flowbite } from "flowbite-react";
import { tinaField } from "tinacms/dist/react";
import { NavLink } from "../../util/nav_link";

const customTheme: CustomFlowbiteTheme = {
  dropdown: {
    // Le bouton reçoit aria-expanded : la flèche pivote quand le menu est ouvert.
    arrowIcon:
      "ml-2 h-4 w-4 transition-transform duration-300 ease-out group-aria-expanded:rotate-180 motion-reduce:transition-none",
    content: "py-1 px-3 space-y-2 text-white bg-lunar-green focus:outline-none",
    floating: {
      // Le menu n'est monté qu'à l'ouverture : animation d'entrée plutôt que transition.
      animation: "animate-dropdown-in motion-reduce:animate-none",
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
        auto: "border border-lunar-green bg-lunar-green text-gray-900 hover:text-secondary",
      },
      target: "w-fit",
    },
    inlineWrapper: "group flex items-center",
  },
  accordion: {
    root: {
      base: "py-2 px-4",
      flush: {
        off: "",
        on: "",
      },
    },
    content: {
      base: "py-5",
    },
    title: {
      arrow: {
        base: "h-6 w-6 shrink-0 transition",
        open: {
          off: "",
          on: "rotate-180",
        },
      },
      base: "flex w-full items-center justify-between text-left font-medium text-gray-500 rounded-none",
      flush: {
        off: "",
        on: "",
      },
      heading: "",
      open: {
        off: "",
        on: "",
      },
    },
  },
};

export const HeaderLink = ({ item }) => {
  if (item.nav) {
    return (
      <Flowbite theme={{ theme: customTheme, mode: "light" }}>
        <Dropdown label={item.label} color={"primary"} inline>
          {item.nav.map((subItem, i) => (
            <Dropdown.Item key={i} as={HeaderLink} item={subItem}></Dropdown.Item>
          ))}
        </Dropdown>
      </Flowbite>
    );
  }
  return (
    <NavLink
      data-tina-field={tinaField(item, "href")}
      href={item.href}
      className="block py-2 text-center transition ease-in-out hover:text-secondary md:p-0"
      activeClassName="text-secondary"
      inactiveClassName="text-white"
    >
      {item.label}
    </NavLink>
  );
};
