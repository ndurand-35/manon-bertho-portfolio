import React from "react";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import layoutData from "../../content/global/index.json";
import { Global } from "../../tina/__generated__/types";

export const Layout = ({
  rawData = {},
  data = layoutData,
  children,
}: {
  rawData?: object;
  data?: Omit<Global, "id" | "_sys" | "_values">;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Analytics />
      <Head>
        <title>Manon Bertho Studio - Graphiste et Photographe Freelance</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {(data.theme.font_title === "montserrat" ||
          data.theme.font_content === "montserrat") && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {(data.theme.font_title === "guavast" ||
          data.theme.font_content === "guavast") && (
          <>
            <link href="/font/Guavast/Guavast.otf" rel="stylesheet"></link>
            <link href="/font/Guavast/guavast.css" rel="stylesheet"></link>
          </>
        )}
      </Head>
      <Theme data={data?.theme}>
        <div className={`min-h-screen flex flex-col font-body mb-16 md:mb-0`}>
          <Header data={data?.header} />
          <div className="flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 flex flex-col">
            {children}
          </div>
          <Footer
            rawData={rawData}
            data={data?.footer}
            icon={data?.footer.logo}
          />
        </div>
        <SpeedInsights />
      </Theme>
    </>
  );
};
