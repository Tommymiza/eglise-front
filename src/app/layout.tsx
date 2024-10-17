import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "EKAR - FIANARANTSOA",
  description: "Diosezy Fianarantsoa, fiangonana katolika",
};

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="fr">
      <head>
        <title>EKAR - FIANARANTSOA</title>
        <link rel="icon" href={`/favicon.ico`} />
      </head>
      <body className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950">
        {children}
      </body>
    </html>
  );
}
