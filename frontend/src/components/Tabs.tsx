"use client"
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { ChatbotTabsEnum } from "@/utils/enums";

interface TabsType {
  title: string;
  url: string;
  isSelected?: boolean;
}

export default function Tabs() {
  const path = usePathname();
  let tabs: TabsType[] = [];

  if (path == "/") {
    tabs = [{ title: "Chatbots", url: "/", isSelected: true }];
  } else if (path.startsWith("/chatbot")) {
    const selectedSection: ChatbotTabsEnum = path
      .split("/")
      .pop()! as ChatbotTabsEnum;
    const restUrl = path.replace(`/${selectedSection}`, "");
    tabs = [
      {
        title: "Playground",
        url: `${restUrl}/${ChatbotTabsEnum.PLAYGROUND}`,
        isSelected: ChatbotTabsEnum.PLAYGROUND == selectedSection,
      },
      {
        title: "Activity",
        url: `${restUrl}/${ChatbotTabsEnum.ACTIVITY}`,
        isSelected: ChatbotTabsEnum.ACTIVITY == selectedSection,
      },
      {
        title: "Source",
        url: `${restUrl}/${ChatbotTabsEnum.SOURCE}`,
        isSelected: ChatbotTabsEnum.SOURCE == selectedSection,
      },
    ];
  }
  if (tabs.length == 0) return <></>;
  return (
    <div className="no-scrollbar flex flex-row items-center justify-start gap-7 overflow-auto ScrollbarStyling overflow-y-hidden whitespace-nowrap border-b font-medium lg:justify-center md:pt-0">
      {tabs.map((tab, ind) => (
        <Link
          key={ind}
          className={`relative col-span-1 items-center p-2 font-medium text-sm ${
            tab.isSelected
              ? "border-b-2 border-violet-500 text-zinc-700"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
          href={tab.url}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
}
