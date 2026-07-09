import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "843Shine | Mobile Detailing in Charleston, SC",
  description:
    "Premium mobile car detailing in Charleston, Mount Pleasant, James Island, West Ashley, and the Lowcountry.",
  icons: {
    icon: "/Images/843ShineLogo-32.png",
    apple: "/Images/843ShineLogo-180.png",
  },
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
