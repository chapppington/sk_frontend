"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AdminNav() {
  return (
    <nav className="w-full border-b p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Админ панель</h1>

          <Link
            href="/dashboard/profile"
            className="text-sm font-medium hover:text-primary"
          >
            Профиль
          </Link>
          <Link
            href="/dashboard/news"
            className="text-sm font-medium hover:text-primary"
          >
            Новости
          </Link>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            // TODO: Implement logout functionality
            console.log("Logout clicked");
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
