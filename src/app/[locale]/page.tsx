import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Box, Monitor, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="container mx-auto py-4 px-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto">
        {/* Left Sidebar Navigation Cards */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-auto min-h-[400px]">
          <Link href="/projects" className="block flex-1">
            <Card className="h-full transition-colors relative overflow-hidden group border-2 bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/80 border-primary">
              <CardContent className="h-full flex flex-row justify-between items-center p-6 z-5 relative">
                <Box className="h-12 w-12 md:h-16 md:w-16 text-primary-foreground" />
                <h2 className="text-xl md:text-2xl font-bold text-primary-foreground text-right">
                  {t('projectsTitle')}
                </h2>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 dark:to-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          </Link>

          <Link href="/blog" className="block flex-1">
            <Card className="h-full transition-colors relative overflow-hidden group border-2 bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/80 border-primary">
              <CardContent className="h-full flex flex-row justify-between items-center p-6 z-5 relative">
                <Monitor className="h-12 w-12 md:h-16 md:w-16 text-primary-foreground" />
                <h2 className="text-xl md:text-2xl font-bold text-primary-foreground text-right">
                  {t('blogsTitle')}
                </h2>
              </CardContent>
            </Card>
          </Link>

          <Link href="/about" className="block flex-1">
            <Card className="h-full transition-colors relative overflow-hidden group border-2 bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/80 border-primary">
              <CardContent className="h-full flex flex-row justify-between items-center p-6 z-5 relative">
                <Info className="h-12 w-12 md:h-16 md:w-16 text-primary-foreground" />
                <h2 className="text-xl md:text-2xl font-bold text-primary-foreground text-right">
                  {t('aboutTitle')}
                </h2>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Right Content Slider */}
        <div className="lg:col-span-9 h-64 lg:h-[600px]">
          <Card className="h-full border-2 bg-card flex items-center justify-center relative overflow-hidden">
             <Carousel className="w-full h-full">
              <CarouselContent className="h-full ml-0">
                <CarouselItem className="h-full pl-0">
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="text-2xl md:text-4xl font-semibold text-muted-foreground italic">slider container</span>
                  </div>
                </CarouselItem>
                <CarouselItem className="h-full pl-0">
                  <div className="flex h-full items-center justify-center p-6 bg-secondary dark:bg-secondary/50">
                    <span className="text-2xl md:text-4xl font-semibold text-primary">Slide 2</span>
                  </div>
                </CarouselItem>
                <CarouselItem className="h-full pl-0">
                  <div className="flex h-full items-center justify-center p-6 bg-secondary dark:bg-secondary/50">
                    <span className="text-2xl md:text-4xl font-semibold text-primary">Slide 3</span>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </Card>
        </div>
      </div>
    </div>
  );
}
