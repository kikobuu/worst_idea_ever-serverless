"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface ProjectFloatingMenuProps {
  onOpen: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProjectFloatingMenu({
  onOpen,
  activeTab,
  setActiveTab,
}: ProjectFloatingMenuProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <Button
        onClick={onOpen}
        size="lg"
        className="rounded-full shadow-lg px-6 gap-2"
      >
        <Menu className="h-5 w-5" />
        <span className="font-medium">
          {activeTab === "overview" ? "Overview" : "Content"}
        </span>
      </Button>
    </div>
  );
}