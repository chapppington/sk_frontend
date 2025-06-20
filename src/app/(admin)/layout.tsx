import "./globals.css";
import { Providers } from "./Providers";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/shadcn/toaster";
import { AdminLayoutContent } from "./components/AdminLayoutContent";
import { ThemeProvider } from "@/context/theme-provider";

const inter = Inter({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Админ-панель | СибКомплект",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AdminLayoutContent>{children}</AdminLayoutContent>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
