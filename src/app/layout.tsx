import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const SofiaProSoft = localFont({
  src: "./fonts/SofiaProSoftReg.woff2",
  variable: "--font-sofia-pro-soft",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Velastria",
  description: "Chat for Zephyr"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://analytics-umami.zephyyrr.in/script.js"
          data-website-id="19cd9720-8c7f-408e-a421-6487a9f894da"
        />
      </head>
      <body
        className={`${SofiaProSoft.variable} h-full font-sofiaProSoft antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
