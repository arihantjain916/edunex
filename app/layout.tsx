import type { Metadata } from "next";
import { Providers } from "./provider";
import ReduxProvider from "../redux/provider";

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
          <Providers>
            <ReduxProvider>{children}</ReduxProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
