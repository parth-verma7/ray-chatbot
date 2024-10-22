"use client";
import { ChatbotTabsEnum } from "@/utils/enums";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const selectedSection: ChatbotTabsEnum = path
    .split("/")
    .pop()! as ChatbotTabsEnum;
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex max-w-7xl flex-row justify-between px-4">
        <h4 className="text-h4 capitalize">{selectedSection}</h4>
      </div>
      {children}
    </div>
  );
}
