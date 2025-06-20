import "./globals.css";
import { Providers } from "./Providers";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/shadcn/toaster";
import { AdminLayoutContent } from "./components/AdminLayoutContent";

const inter = Inter({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <AdminLayoutContent>{children}</AdminLayoutContent>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
