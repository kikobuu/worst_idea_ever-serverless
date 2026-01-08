"use client"

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { Search, Globe, Sun, Moon, Mail, Menu, Box, Monitor, Info, Home, Languages } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { SearchCommand } from "@/components/SearchCommand";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'ko', name: '한국어' },
  { code: 'ja', name: '日本語' },
  { code: 'fr', name: 'Français' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
      <div className="flex h-16 items-center justify-between px-4 w-full">
        
        {/* Left Section */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Mobile Menu (Left) */}
          <div className="md:hidden shrink-0">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]" hideClose>
                <nav className="flex flex-col gap-3 mt-6 px-1">
                  <div className="grid gap-2">
                    <Link href="/" onClick={handleLinkClick}>
                      <Card className="flex items-center gap-3 p-4 transition-colors cursor-pointer border-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Home className="h-5 w-5 text-primary-foreground" />
                        <span className="font-medium">{t('home')}</span>
                      </Card>
                    </Link>
                    
                    <Link href="/projects" onClick={handleLinkClick}>
                      <Card className="flex items-center gap-3 p-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer border-2 bg-card hover:bg-accent">
                        <Box className="h-5 w-5 text-primary" />
                        <span className="font-medium">{t('projects')}</span>
                      </Card>
                    </Link>
                    
                    <Link href="/blog" onClick={handleLinkClick}>
                      <Card className="flex items-center gap-3 p-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer border-2 bg-card hover:bg-accent">
                        <Monitor className="h-5 w-5 text-primary" />
                        <span className="font-medium">{t('blogs')}</span>
                      </Card>
                    </Link>
                    
                    <Link href="/about" onClick={handleLinkClick}>
                      <Card className="flex items-center gap-3 p-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer border-2 bg-card hover:bg-accent">
                        <Info className="h-5 w-5 text-primary" />
                        <span className="font-medium">{t('about')}</span>
                      </Card>
                    </Link>
                  </div>

                  <Separator className="my-2" />
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-muted-foreground px-2">
                      {t('settings')}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={locale} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="flex items-center justify-center gap-2 p-3 cursor-pointer hover:bg-accent transition-colors border-2 bg-card [&_svg:last-child]:hidden">
                          <Languages className="h-4 w-4" />
                          <span className="text-sm font-medium">{languages.find(l => l.code === locale)?.name}</span>
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border rounded-md shadow-md">
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code} className="hover:bg-accent hover:text-accent-foreground transition-colors duration-150 rounded-sm">
                              <span className="font-medium">{lang.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Card 
                        className="flex items-center justify-center gap-2 p-3 cursor-pointer hover:bg-accent transition-colors border-2 bg-card"
                        onClick={toggleTheme}
                      >
                        {theme === "dark" ? (
                          <>
                            <Sun className="h-4 w-4" />
                            <span className="text-sm font-medium">Light</span>
                          </>
                        ) : (
                          <>
                            <Moon className="h-4 w-4" />
                            <span className="text-sm font-medium">Dark</span>
                          </>
                        )}
                      </Card>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-slate-800">
                <Image
                  src="/images/mrvn_icon_6feetsunder.png"
                  alt="MRVN Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </Link>
          </div>

          <Separator orientation="vertical" className="h-6 mr-2 hidden md:block" />

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
            <Link
              href="/projects"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('projects')}
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('blogs')}
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('about')}
            </Link>
          </nav>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <div className="w-auto">
            <div className="relative">
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('searchPlaceholder')}
                  className="pl-8 w-[140px] lg:w-[200px] bg-muted/50 cursor-pointer"
                  readOnly
                  onClick={() => setSearchOpen(true)}
                />
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
              {/* Mobile Search Icon */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(true)}>
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
          
          <Select value={locale} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-9 w-9 flex-shrink-0 border-0 bg-transparent hover:bg-accent [&_svg:last-child]:hidden">
              <Languages className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border rounded-md shadow-md min-w-[150px]">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code} className="hover:bg-accent hover:text-accent-foreground transition-colors duration-150 rounded-sm">
                  <span className="font-medium">{lang.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 flex-shrink-0"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Desktop Contact Button */}
          <Button className="hidden md:flex bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 flex-shrink-0">
            <Mail className="mr-2 h-4 w-4" />
            {t('contact')}
          </Button>

          {/* Mobile Contact Icon */}
          <Button size="icon" className="md:hidden bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 flex-shrink-0">
            <Mail className="h-4 w-4" />
            <span className="sr-only">{t('contact')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
