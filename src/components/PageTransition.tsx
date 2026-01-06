"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPathname) {
      // 开始过渡动画
      setIsTransitioning(true)
      
      // 动画持续时间应与CSS动画匹配
      const timer = setTimeout(() => {
        setPrevPathname(pathname)
        setIsTransitioning(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [pathname, prevPathname])

  return (
    <div className="relative">
      <div
        className={cn(
          "transition-opacity duration-300",
          isTransitioning ? "opacity-0" : "opacity-100"
        )}
      >
        {children}
      </div>
      
      {/* 过渡覆盖层（可选） */}
      <div
        className={cn(
          "fixed inset-0 z-50 pointer-events-none transition-opacity duration-300",
          isTransitioning ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      />
    </div>
  )
}