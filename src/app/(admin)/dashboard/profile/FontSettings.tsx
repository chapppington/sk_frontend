"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { useFont } from "@/context/FontProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Search, ChevronDown, X, Check, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GOOGLE_FONTS_API_KEY = "AIzaSyB3ofoP9yeJU1XDDULJQl0SGHRF852Cbwk";
const GOOGLE_FONTS_API = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`;

type GoogleFont = {
  family: string;
  [key: string]: any;
};

export function FontSettings() {
  const { fontFamily, setFontFamily } = useFont();
  const [search, setSearch] = useState("");
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [filteredFonts, setFilteredFonts] = useState<GoogleFont[]>([]);
  const [selectedFont, setSelectedFont] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch(GOOGLE_FONTS_API)
      .then((res) => res.json())
      .then((data) => {
        setFonts(data.items || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredFonts([]);
      return;
    }
    setFilteredFonts(
      fonts
        .filter((font: GoogleFont) =>
          font.family.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 20)
    );
  }, [search, fonts]);

  useEffect(() => {
    setSelectedFont(fontFamily || "");
  }, [fontFamily]);

  async function handleFontSelect(font: string) {
    if (font === fontFamily) return;
    setSelectedFont(font);
    setLoading(true);
    try {
      await setFontFamily(font);
      setSaved(true);
      toast({ title: "Шрифт применён", description: `Выбран: ${font}` });
      setTimeout(() => setSaved(false), 1200);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full flex flex-row gap-6 p-6 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-100 dark:bg-slate-800 items-center">
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-slate-200 dark:bg-slate-700">
            <Settings className="w-6 h-6 text-slate-500 dark:text-slate-300" />
          </div>
          <span className="text-base font-semibold whitespace-nowrap">Настройки шрифта</span>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 min-w-[180px] max-w-[220px] flex justify-between items-center"
                type="button"
              >
                {saved ? (
                  <span className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    Сохранено!
                  </span>
                ) : (
                  <span
                    className="truncate text-left"
                    style={{
                      fontFamily: selectedFont
                        ? `'${selectedFont}', system-ui, sans-serif`
                        : undefined,
                    }}
                  >
                    {selectedFont ? selectedFont : "Выберите шрифт"}
                  </span>
                )}
                <ChevronDown className="w-4 h-4 ml-2 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск шрифта из Google Fonts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8"
                    autoFocus
                  />
                  {search && (
                    <button
                      type="button"
                      className="absolute right-2 top-2.5"
                      onClick={() => setSearch("")}
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="text-sm text-muted-foreground p-3">
                    Загрузка...
                  </div>
                ) : filteredFonts.length > 0 ? (
                  filteredFonts.map((font) => (
                    <div
                      key={font.family}
                      className={`px-3 py-2 cursor-pointer hover:bg-accent ${
                        selectedFont === font.family ? "bg-accent" : ""
                      }`}
                      style={{
                        fontFamily: `'${font.family}', system-ui, sans-serif`,
                      }}
                      onClick={() => handleFontSelect(font.family)}
                    >
                      {font.family}
                    </div>
                  ))
                ) : search ? (
                  <div className="text-center py-4 text-muted-foreground">
                    Шрифты не найдены
                  </div>
                ) : null}
              </div>
              {selectedFont && (
                <div className="p-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFontSelect("Inter")}
                    className="w-full"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Выбрать Inter (шрифт по умолчанию)
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          
        </div>
      </div>
      {saved && <div className="text-green-600">Сохранено!</div>}
    </div>
  );
} 