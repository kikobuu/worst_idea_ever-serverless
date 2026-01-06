"use client"

import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Search, Globe, Sun, Moon, Mail, Menu, Box, Monitor, Info, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    router.replace(pathname, {locale: nextLocale});
    setOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        
        {/* Mobile Menu (Left) */}
        <div className="md:hidden mr-2">
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
                    <Card 
                      className="flex items-center justify-center gap-2 p-3 cursor-pointer hover:bg-accent transition-colors border-2 bg-card"
                      onClick={toggleLanguage}
                    >
                      <Globe className="h-4 w-4" />
                      <span className="text-sm font-medium">{locale === 'en' ? '中文' : 'English'}</span>
                    </Card>
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
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-slate-800">
               {/* Placeholder for the XX face logo */}
               <span className="text-slate-800 font-bold text-xs">XX</span>
            </div>
          </Link>
        </div>

        <Separator orientation="vertical" className="h-6 mr-6 hidden md:block" />

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
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

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <div className="w-auto">
            <div className="relative">
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('searchPlaceholder')}
                  className="pl-8 w-[200px] lg:w-[300px] bg-muted/50"
                />
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
              {/* Mobile Search Icon */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleLanguage}>
            <Globe className="h-4 w-4" />
            <span className="sr-only">Toggle language</span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Desktop Contact Button */}
          <Button className="hidden md:flex bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200">
            <Mail className="mr-2 h-4 w-4" />
            {t('contact')}
          </Button>

          {/* Mobile Contact Icon */}
          <Button size="icon" className="md:hidden bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200">
            <Mail className="h-4 w-4" />
            <span className="sr-only">{t('contact')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
