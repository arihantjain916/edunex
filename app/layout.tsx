import type { Metadata } from "next";
import { Providers } from "./provider";
import ReduxProvider from "../redux/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Home | EduNex",
  description: "Created by Arihant Jain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <SpeedInsights />
          <Providers>
            <ReduxProvider>{children}</ReduxProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
