import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the application",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <main className="flex min-h-screen flex-col items-center justify-between p-8">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
