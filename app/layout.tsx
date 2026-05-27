import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "843Shine | Mobile Detailing in Charleston, SC",
  description:
    "Premium mobile car detailing in Charleston, Mount Pleasant, James Island, West Ashley, and the Lowcountry.",
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
