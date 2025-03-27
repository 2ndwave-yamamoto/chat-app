import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { auth } from "@/app/(auth)/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ChatApp",
  description: "ChatApp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session] = await Promise.all([auth()]);
  const user = session?.user

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className="flex flex-col h-screen">
          <header className="h-12 bg-black text-white">
            {user && (
              <div className="flex justify-end items-center h-full mr-4">
                <p className="text-right">{user.email}</p>
              </div>
            )}
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
