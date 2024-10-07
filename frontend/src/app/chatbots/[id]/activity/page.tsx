import React from "react";

export default function page() {
  return (
    <div className="w-full max-w-5xl mx-auto border border-gray-200 rounded-lg">
      <h3 className="text-2xl font-semibold space-y-1.5 p-6 leading-none tracking-tight my-auto">
        Chat Logs
      </h3>
      <div className="shrink-0 bg-zinc-200 dark:bg-zinc-500 h-[1px] w-full" />
      <div className="p-0 [&>div]:px-6">
        <div className="flex w-full flex-col space-y-4 lg:flex-row lg:space-y-0 !px-0">
          <div className="w-full lg:max-w-xs xl:max-w-sm">
            <div className="lg:h-[42rem] lg:border-b-0 h-[34rem] border-b overflow-y-auto overflow-x-hidden border-r">
              <ul className="w-full divide-y divide-zinc-200">
                <li className="relative bg-white p-6 pr-4 py-5 hover:bg-zinc-100 cursor-pointer bg-zinc-100">
                  <div className="flex flex-row gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between space-x-3">
                        <p className="truncate text-sm text-zinc-800 font-semibold w-1 flex-1">
                          need help
                        </p>
                        <time
                          dateTime="2024-09-26T11:49:10.915123+00:00"
                          className="shrink-0 whitespace-nowrap text-sm text-zinc-500"
                        >
                          <span>1 hour ago</span>
                        </time>
                      </div>
                      <div>
                        <p className="line-clamp-1 text-zinc-500 text-sm">
                          ¡Claro! Estoy aquí para ayudarte. ¿En qué necesitas
                          ayuda?
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative bg-white p-6 pr-4 py-5 hover:bg-zinc-100 cursor-pointer">
                  <div className="flex flex-row gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between space-x-3">
                        <p className="truncate text-sm text-zinc-800 font-semibold w-1 flex-1">
                          hi
                        </p>
                        <time
                          dateTime="2024-09-19T13:27:36.969492+00:00"
                          className="shrink-0 whitespace-nowrap text-sm text-zinc-500"
                        >
                          <span>6 days ago</span>
                        </time>
                      </div>
                      <div>
                        <p className="line-clamp-1 text-zinc-500 text-sm">
                          ¡Hola! ¿Cómo puedo ayudarte hoy?
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex grow justify-center">
            <div className="flex flex-col w-full mx-2 lg:h-[42rem] h-[34rem] relative">
              <div className="flex h-full w-full flex-col justify-between overflow-y-auto overflow-x-hidden border-zinc-200 p-2 pt-5">
                <div>
                  <div className="mr-8 mb-5 flex justify-start">
                    <div
                      className="relative inline-block hyphens-auto break-words rounded-[20px] rounded-bl bg-zinc-200/50 px-5 py-4 text-left text-sm leading-5 antialiased max-w-[min(calc(100%-40px),65ch)]"
                      style={{ backgroundColor: "rgb(241, 241, 240)" }}
                    >
                      <div className="flex flex-col items-start gap-4 break-words">
                        <div className="prose w-full break-words text-left text-inherit dark:prose-invert">
                          <div className="">
                            <div className="prose-zinc prose group-data-[theme=dark]:prose-invert w-full text-sm [&_table]:block [&_.katex-html]:overflow-x-auto [&_table]:overflow-x-auto">
                              <p>¡Hola! ¿En qué puedo ayudarte?</p>
                            </div>
                          </div>
                          <div className="absolute top-full rounded-xl p-0.5 lg:w-fit -mt-4 w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 ml-8 flex justify-end">
                    <div
                      className="relative inline-block hyphens-auto break-words rounded-[20px] rounded-br bg-zinc-200/50 px-5 py-4 text-left text-sm leading-5 antialiased max-w-[min(calc(100%-40px),65ch)]"
                      style={{ backgroundColor: "black" }}
                    >
                      <div className="flex flex-col items-start gap-4 break-words">
                        <div className="prose w-full break-words text-left text-inherit dark:prose-invert">
                          <div className="[&_p]:text-white">
                            <div className="prose-zinc prose group-data-[theme=dark]:prose-invert w-full text-sm [&_table]:block [&_.katex-html]:overflow-x-auto [&_table]:overflow-x-auto">
                              <p>hi</p>
                            </div>
                          </div>
                          <div className="absolute top-full rounded-xl p-0.5 lg:w-fit -mt-4 w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
