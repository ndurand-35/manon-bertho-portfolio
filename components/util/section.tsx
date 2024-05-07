import React from "react";

export const Section = ({ children, color = "", className = "" }) => {
  const sectionColor = {
    default: "text-gray-800 bg-white",
    "lunar-green": "text-white bg-lunar-green",
    "link-water": "text-gray-800 bg-link-water",
    tint: "text-gray-900 dark:text-gray-100 bg-gradient-to-br from-gray-100 dark:from-gray-1000 to-transparent",
  };
  const sectionColorCss = sectionColor[color]
    ? sectionColor[color]
    : sectionColor.default;

  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font overflow-hidden ${sectionColorCss} ${className}`}
    >
      {children}
    </section>
  );
};
