import Link from "next/link";
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
  return (
    <div className="container mx-auto py-4 px-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-12rem)] h-auto">
        {/* Left Sidebar Navigation Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full min-h-[500px] lg:min-h-0">
          <Link href="/projects" className="block flex-1">
            <Card className="h-full hover:bg-muted/50 transition-colors relative overflow-hidden group border-2">
              <CardContent className="h-full flex flex-col p-6 z-10 relative">
                <Box className="h-16 w-16 mb-4 text-slate-900 dark:text-slate-100 absolute top-1 left-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 absolute bottom-1 right-4">
                  Level Designs Projects
                </h2>
              </CardContent>
              {/* Decorative background element if needed */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-100/50 dark:to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          </Link>

          <Link href="/blog" className="block flex-1">
            <Card className="h-full hover:bg-muted/50 transition-colors relative overflow-hidden group border-2">
              <CardContent className="h-full flex flex-col p-6 z-10 relative">
                <Monitor className="h-16 w-16 mb-4 text-slate-900 dark:text-slate-100 absolute top-1 left-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 absolute bottom-1 right-4">
                  Personal Blogs
                </h2>
              </CardContent>
            </Card>
          </Link>

          <Link href="/about" className="block flex-1">
            <Card className="h-full hover:bg-muted/50 transition-colors relative overflow-hidden group border-2">
              <CardContent className="h-full flex flex-col p-6 z-10 relative">
                <Info className="h-16 w-16 mb-4 text-slate-900 dark:text-slate-100 absolute top-1 left-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 absolute bottom-1 right-4">
                  About Me
                </h2>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Right Content Slider */}
        <div className="lg:col-span-8 h-64 lg:h-full">
          <Card className="h-full border-2 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center relative overflow-hidden">
             <Carousel className="w-full h-full">
              <CarouselContent className="h-full ml-0">
                <CarouselItem className="h-full pl-0">
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="text-4xl font-semibold text-muted-foreground italic">slider container</span>
                  </div>
                </CarouselItem>
                <CarouselItem className="h-full pl-0">
                  <div className="flex h-full items-center justify-center p-6 bg-blue-100 dark:bg-blue-900/20">
                    <span className="text-4xl font-semibold text-blue-500">Slide 2</span>
                  </div>
                </CarouselItem>
                <CarouselItem className="h-full pl-0">
                  <div className="flex h-full items-center justify-center p-6 bg-green-100 dark:bg-green-900/20">
                    <span className="text-4xl font-semibold text-green-500">Slide 3</span>
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
