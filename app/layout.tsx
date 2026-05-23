import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "843Shine | Luxury Car Detailing",
  description: "Premium luxury automotive detailing by 843Shine.",
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
