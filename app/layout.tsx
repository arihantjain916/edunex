import type { Metadata } from "next";
import "./globals.css";


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
      <body>{children}</body>
    </html>
  );
}
