import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Digiperform - CAMOI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title> DigiPerform - CAMOI</title>
        <link rel="icon" href={`/favicon.ico`} />
      </head>
      <body className={cn("overflow-hidden", roboto.className)}>
        <Toaster closeButton />
        {children}
      </body>
    </html>
  );
}