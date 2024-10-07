import React, { useEffect, useRef, useState } from "react";

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContainerRef.current && !modalContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[isOpen])
  return (
    <div ref={modalContainerRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        type="button"
        id="chatbot-bubble-button-new"
        className="fixed flex items-center justify-center hover:scale-110 border-0 bottom-4 right-4 w-[55px] h-[55px] rounded-full bg-black shadow-md cursor-pointer z-[99] transition-transform duration-200 ease-in-out transform scale-100 group"
      >
        {!isOpen ? (
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 256 256"
          >
            <path
              fill="#fff"
              d="M232 93.17c0 41-29.69 52.47-53.55 61.67c-8.41 3.24-16.35 6.3-22.21 10.28c-11.39 7.72-18.59 21.78-25.55 35.38c-9.94 19.42-20.23 39.5-43.17 39.5c-12.91 0-24.61-11.64-33.85-33.66s-14.31-51-13.61-77.45c1.08-40.65 14.58-62.68 25.7-74c14.95-15.2 35.24-25.3 58.68-29.2c21.79-3.62 44.14-1.38 62.93 6.3C215.73 43.6 232 65.9 232 93.17"
            />
          </svg>
        ) : (
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.3"
            stroke="white"
            width={20}
            height={20}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="ray-chat-bubble fixed flex flex-col justify-between shadow-[0px_10px_30px_0px_rgba(150,150,150,0.2),_0px_0px_0px_1px_rgba(150,150,150,0.2)] bottom-20 right-4 w-[448px] h-[85dvh] max-h-[824px] rounded-lg z-99 overflow-hidden bg-white">
          <div className="group relative flex h-full flex-col bg-white">
            <div
              className="relative flex items-center justify-between px-5 text-black"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.02) 0.44%, rgba(0, 0, 0, 0) 49.5%), #ffffff",
              }}
            >
              <div className="my-4 flex h-10 items-center">
                <h1 className="font-semibold text-sm">Sun</h1>
              </div>
            </div>
            <div className="relative flex flex-1 basis-full flex-col overflow-y-hidden scroll-smooth shadow-inner">
              <div className="flex w-full flex-1 flex-col space-y-5 overflow-y-auto px-5 pt-5 pb-4 sm:overscroll-contain">
                <div className="flex w-full items-end pr-8">
                  <span className="h-10 w-10 rounded-full flex items-center justify-center bg-black mr-2">
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="#fff"
                        d="M232 93.17c0 41-29.69 52.47-53.55 61.67c-8.41 3.24-16.35 6.3-22.21 10.28c-11.39 7.72-18.59 21.78-25.55 35.38c-9.94 19.42-20.23 39.5-43.17 39.5c-12.91 0-24.61-11.64-33.85-33.66s-14.31-51-13.61-77.45c1.08-40.65 14.58-62.68 25.7-74c14.95-15.2 35.24-25.3 58.68-29.2c21.79-3.62 44.14-1.38 62.93 6.3C215.73 43.6 232 65.9 232 93.17"
                      />
                    </svg>
                  </span>
                  <div className="group/message relative max-w-[min(calc(100%-40px),65ch)]">
                    <div className="hyphens-auto break-words text-left text-sm leading-5 antialiased relative inline-block max-w-full rounded-[20px] rounded-bl px-5 py-4 bg-zinc-200/50 text-zinc-800">
                      <div className="prose-zinc prose w-full text-sm [&_table]:block [&_.katex-html]:overflow-x-auto [&_table]:overflow-x-auto">
                        <p>hi</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="hyphens-auto text-wrap break-words rounded-[20px] text-left text-sm leading-5 antialiased ml-auto rounded-br px-4 py-2 whitespace-pre border-zinc-200 font-sans max-w-[min(calc(100%-40px),65ch)]"
                  data-user="true"
                  style={{
                    backgroundColor: "rgb(124, 58, 237)",
                    borderWidth: 0,
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Hi i am masuk
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col justify-end">
              <form>
                <div className="flex min-h-16 items-end border-zinc-200 border-t group-data-[theme=dark]:border-zinc-800">
                  <textarea
                    className="flex w-full border-zinc-200 bg-white text-sm ring-offset-white disabled:cursor-not-allowed sm:overscroll-contain dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 placeholder:text-zinc-500 disabled:opacity-50 focus-visible:outline-none dark:focus-visible:ring-zinc-300 focus-visible:ring-violet-500 dark:ring-offset-zinc-950 my-auto max-h-40 min-h-8 resize-none rounded-none border-0 placeholder-zinc-400 group-data-[mobile=true]:text-[16px] sm:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 pointer-events-auto overflow-y-auto p-3 group-data-[theme=dark]:bg-black group-data-[theme=dark]:text-white flex-1"
                    id="message"
                    name="message"
                    rows={1}
                    tabIndex={0}
                    placeholder="Message..."
                    style={{ height: 44 }}
                    defaultValue={""}
                  />
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 w-9 my-3 mr-2 size-5 bg-transparent shadow-none group-data-[theme=dark]:hover:bg-zinc-800/90 hover:bg-zinc-100/90"
                    disabled
                    type="submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      className="size-5 text-zinc-700 group-data-[theme=dark]:text-white"
                    >
                      <title>Paper Plane</title>
                      <path
                        fill="currentColor"
                        d="M15.44 1.68c.69-.05 1.47.08 2.13.74.66.67.8 1.45.75 2.14-.03.47-.15 1-.25 1.4l-.09.35a43.7 43.7 0 0 1-3.83 10.67A2.52 2.52 0 0 1 9.7 17l-1.65-3.03a.83.83 0 0 1 .14-1l3.1-3.1a.83.83 0 1 0-1.18-1.17l-3.1 3.1a.83.83 0 0 1-.99.14L2.98 10.3a2.52 2.52 0 0 1 .04-4.45 43.7 43.7 0 0 1 11.02-3.9c.4-.1.92-.23 1.4-.26Z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
