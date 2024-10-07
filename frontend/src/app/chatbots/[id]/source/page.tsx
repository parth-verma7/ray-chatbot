"use client"
import { SourceHandlerEnum } from "@/utils/enums";
import React, { useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(SourceHandlerEnum.FILES);
  const tabs = [
    {
      name: SourceHandlerEnum.FILES,
      content: <FileHandler />,
    },
    {
      name: SourceHandlerEnum.TEXT,
      content: <TextHandler />,
    },
    {
      name: SourceHandlerEnum.WEBSITE,
      content: <WebsiteHandler />,
    },
    {
      name: SourceHandlerEnum.QANDA,
      content: <QandAHandler />,
    }
  ]
  return (
    <div className="mx-auto w-full max-w-7xl px-4 grid grid-cols-12 gap-10">
      <ul className="space-y-1 col-span-12 lg:col-span-2">
        {tabs.map((tab) => (
          <li key={tab.name} onClick = {()=> setSelectedTab(tab.name)}>
            <div
              className={`cursor-pointer hover:bg-zinc-50 hover:text-violet-600 group flex items-center gap-x-1 rounded-md p-2 text-sm font-semibold leading-6 ${selectedTab == tab.name ? "bg-zinc-50 text-violet-600" : "text-zinc-700"}`}
            >
              <i className={`w-6 text-lg group-hover:text-violet-600 ${selectedTab == tab.name ? "text-violet-600" : "text-zinc-400"}`} />
              {tab.name}
            </div>
          </li>
        ))}
      </ul>
      <div className="right-side-content-wraper col-span-12 lg:col-span-10">
        {tabs.map((tab) => (
          <div key={tab.name} className={`${selectedTab == tab.name ? "" : "hidden"}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

const FileHandler = () => {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Files
        </h3>
      </div>
      <div className="p-6 pt-0">
        <label htmlFor="choosefile" className="cursor-pointer">
          <div className="border rounded border-neutral-200 p-16 hover:bg-zinc-100">
            <div className="flex flex-col items-center justify-center gap-4">
              <FaArrowUpFromBracket />
              <div className="items-center justify-center text-center">
                <p className="text-sm text-zinc-600">Click to select files</p>
                <span
                  className="text-xs text-zinc-500 dark:text-zinc-300"
                  id="file_type_help"
                >
                  Supported File Types: .pdf, .doc, .docx, .txt
                </span>
              </div>
            </div>
            <input id="choosefile" type="file" className="hidden" />
          </div>
        </label>
      </div>
    </div>
  );
};

const TextHandler = () => {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Text
        </h3>
      </div>
      <div className="p-6 pt-0">
        <textarea
          placeholder="Enter text ..."
          rows={10}
          className="my-2 w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white p-1 px-3 text-zinc-900 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 sm:text-sm"
          defaultValue={""}
        />
        <div className="flex justify-end">
          <button className="text-sm text-white bg-violet-500 rounded px-4 py-1">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const WebsiteHandler = () => {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Website
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div>
          <label className="my-2 block text-sm font-medium leading-6 text-zinc-900">
            Add website link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="flex flex-col gap-2 lg:flex-row">
              <input
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="https://www.example.com"
                type="text"
              />
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-800/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-1">
                Add link
              </button>
            </div>
          </div>
          <div className="mt-8">
            <div className="my-4 flex items-center">
              <hr className="w-full border-t border-zinc-300" />
              <span className="whitespace-nowrap px-2 text-zinc-600">
                Included Links
              </span>
              <hr className="w-full border-t border-zinc-300" />
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <div className="flex w-full items-center">
                  <div className="border-input text-blue-500 bg-background flex h-9 w-full rounded-md border px-3 py-2 text-sm">
                    https://escuela-ray-bolivar-sosa.com/
                  </div>
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent h-9 w-9 ml-2 px-2"
                    type="button"
                  >
                    <i className="fa-regular fa-trash-can" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QandAHandler = () => {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Q&amp;A
        </h3>
      </div>
      <div className="p-6">
        <div className="mb-6 rounded border p-3 shadow">
          <div className="flex items-end justify-between">
            <label className="mb-2 text-sm text-zinc-700">Question</label>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent h-9 w-9 mb-1 px-2"
              type="button"
            >
              <i className="fa-regular fa-trash-can" />
            </button>
          </div>
          <textarea
            className="w-full min-w-0 appearance-none rounded-md border border-zinc-900/10 bg-white p-1 px-3 text-zinc-900 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 sm:text-sm"
            rows={3}
            defaultValue={""}
          />
          <div className="">
            <label className="mt-8 text-sm text-zinc-700">Answer</label>
            <textarea
              className="mt-1 w-full min-w-0 appearance-none rounded-md border border-zinc-900/10 bg-white p-1 px-3 text-zinc-900 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 sm:text-sm"
              rows={8}
              defaultValue={""}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-sm text-white bg-violet-500 rounded px-4 py-1">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
