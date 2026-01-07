"use client"

import * as React from "react"
import { useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { FileText, Loader2 } from "lucide-react"

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter()
  const locale = useLocale()
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<BlogPost[]>([])
  const [shouldRefresh, setShouldRefresh] = React.useState(false)
  const [internalOpen, setInternalOpen] = React.useState(open)
  const prevOpenRef = React.useRef(open)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onOpenChange])

  React.useEffect(() => {
    const searchPosts = async () => {
      if (inputValue.trim().length === 0) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(inputValue)}&locale=${locale}`)
        if (response.ok) {
          const posts = await response.json()
          setSearchResults(posts)
          if (posts.length > 0) {
            setShouldRefresh(true)
          }
        } else {
          setSearchResults([])
        }
      } catch (error) {
        console.error("搜索博客失败:", error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPosts, 300)
    return () => clearTimeout(debounceTimer)
  }, [inputValue, locale])

  React.useEffect(() => {
    if (shouldRefresh && searchResults.length > 0) {
      setInternalOpen(false)
      setTimeout(() => {
        setInternalOpen(true)
        setShouldRefresh(false)
      }, 50)
    }
  }, [shouldRefresh, searchResults])

  React.useEffect(() => {
    if (open !== prevOpenRef.current) {
      prevOpenRef.current = open
      setInternalOpen(open)
    }
  }, [open])

  const handleSelect = (slug: string) => {
    onOpenChange(false)
    setInternalOpen(false)
    router.push(`/blog/${slug}`)
  }

  const handleInternalOpenChange = (newOpen: boolean) => {
    if (!shouldRefresh) {
      setInternalOpen(newOpen)
      onOpenChange(newOpen)
    }
  }

  return (
    <CommandDialog open={internalOpen} onOpenChange={handleInternalOpenChange}>
      <CommandInput
        placeholder={locale === "zh" ? "搜索博客文章..." : "Search blog posts..."}
        value={inputValue}
        onValueChange={setInputValue}
      />
      <CommandList>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">
              {locale === "zh" ? "搜索中..." : "Searching..."}
            </span>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <CommandGroup heading={locale === "zh" ? "博客文章" : "Blog Posts"}>
              {searchResults.map((post) => (
                <CommandItem
                  key={post.slug}
                  onSelect={() => handleSelect(post.slug)}
                  className="flex items-start gap-2 p-2"
                >
                  <FileText className="h-4 w-4 mt-0.5 shrink-0 opacity-70" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{post.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {post.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={locale === "zh" ? "提示" : "Tips"}>
              <CommandItem disabled className="p-2">
                <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  ↵ 
                </kbd>
                <span className="ml-2 text-xs text-muted-foreground">
                  {locale === "zh" ? "选择" : "Select"}
                </span>
              </CommandItem>
              <CommandItem disabled className="p-2">
                <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  esc
                </kbd>
                <span className="ml-2 text-xs text-muted-foreground">
                  {locale === "zh" ? "关闭" : "Close"}
                </span>
              </CommandItem>
            </CommandGroup>
          </>
        ) : inputValue.trim().length > 0 ? (
          <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
            {locale === "zh" ? "未找到相关结果" : "No results found"}
          </CommandEmpty>
        ) : (
          <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
            {locale === "zh" ? "输入关键词搜索博客文章" : "Type to search blog posts"}
          </CommandEmpty>
        )}
      </CommandList>
    </CommandDialog>
  )
}
