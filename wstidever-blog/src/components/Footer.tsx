import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="container mx-auto px-4 pb-8 mt-auto">
      <div className="border-2 rounded-lg p-6 bg-muted/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left w-full">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Worst Ideas Ever</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Lots of worst ideas ever, from a stupid level designer :(
            </p>
          </div>
          <div className="text-left md:text-right w-full md:w-auto whitespace-nowrap">
             <p className="text-xs text-muted-foreground font-bold">
              &copy; {new Date().getFullYear()} Yasushi Katsuyoshi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
