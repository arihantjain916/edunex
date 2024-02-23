import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import ReduxProvider from "../redux/provider";
export const metadata: Metadata = {
  title: "EduNex",
  description: "Created by Arihant Jain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ReduxProvider>{children}</ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
