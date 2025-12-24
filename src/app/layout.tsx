import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotted Near You",
  description: "Anonymous local posting app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        <main className="flex min-h-content flex-col items-center">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
