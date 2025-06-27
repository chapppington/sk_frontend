import "./globals.css";
import { Toaster } from "@/components/ui/shadcn/toaster";
import { AdminLayoutContent } from "./components/AdminLayoutContent";
import { ThemeProvider } from "@/context/theme-provider";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AdminLayoutContent>{children}</AdminLayoutContent>
      <Toaster />
    </ThemeProvider>
  );
}
