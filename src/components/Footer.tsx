"use client"

import { Separator } from "@/components/ui/separator";
import { Github, CreativeCommons } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations('Footer');

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
              {t('copyrightPrefix')} {new Date().getFullYear()} {t('copyrightName')}. {t('copyright')}
            </p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-muted-foreground">
          <div className="text-left">
            <p className="font-medium mb-1">{t('contentLicenseTitle')}</p>
            <p className="leading-normal">
              {t('contentLicenseText')}
              <Link 
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans" 
                target="_blank"
                className="inline items-center gap-1 mx-1 hover:text-foreground transition-colors align-middle"
              >
                <CreativeCommons className="w-3.5 h-3.5 inline align-middle mr-0.5" />
                <span className="inline align-middle">{t('contentLicenseLinkText')}</span>
              </Link>
              {t('contentLicenseTextEnd')}
            </p>
            <p>{t('contentLicenseReprint')}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="mb-1">{t('siteLicense')}</p>
            <Link 
              href="https://github.com/kikobuu/worst_idea_ever-serverless.git" 
              target="_blank"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>{t('githubLabel')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
