import React from "react";

export default function page() {
  return (
    <div
      className="w-full max-w-5xl mx-auto border border-gray-200 rounded-lg p-10 flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#fafafa",
        opacity: 1,
        backgroundImage: "radial-gradient(#001aff 0.5px, #fafafa 0.5px)",
        backgroundSize: "10px 10px",
      }}
    >
      <div className="w-full md:h-full md:max-w-md">
        <div className="flex h-full w-full flex-col">
          <div className="flex h-full w-full flex-col">
            <div className="h-full w-full overflow-hidden rounded-lg border-[1px]">
              <main className="group relative flex h-full flex-col bg-white">
                <header
                  className="relative flex items-center justify-between px-5 text-black"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(0, 0, 0, 0.02) 0.44%, rgba(0, 0, 0, 0) 49.5%), rgb(255, 255, 255)",
                  }}
                >
                  <div className="my-4 flex h-10 items-center">
                    <div className="flex flex-col justify-center gap-px">
                      <h1 className="font-semibold text-sm">
                        {`Ray's chat bot`}
                      </h1>
                    </div>
                  </div>
                </header>
                <div className="relative flex flex-1 basis-full flex-col overflow-y-hidden scroll-smooth shadow-inner">
                  <div className="flex w-full flex-1 flex-col space-y-5 overflow-y-auto px-5 pt-5 pb-4 sm:overscroll-contain">
                    <div className="flex w-full items-end pr-8">
                      <div className="group/message relative max-w-[min(calc(100%-40px),65ch)]">
                        <div className="hyphens-auto break-words text-left text-sm leading-5 relative inline-block max-w-full rounded-[20px] rounded-bl px-5 py-4 bg-zinc-200/50 text-zinc-800">
                          <div className="w-full text-sm">
                            <p>¡Hola! ¿En qué puedo ayudarte?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="hyphens-auto text-wrap break-words rounded-[20px] text-left text-sm leading-5 antialiased ml-auto rounded-br px-4 py-2 whitespace-pre border-zinc-200 font-sans max-w-[min(calc(100%-40px),65ch)]"
                      style={{
                        backgroundColor: "rgb(59, 129, 246)",
                        borderWidth: 0,
                        color: "rgb(255, 255, 255)",
                      }}
                    >
                      hi
                    </div>
                    <div className="flex w-full items-end pr-8">
                      <div className="group/message relative max-w-[min(calc(100%-40px),65ch)]">
                        <div className="hyphens-auto break-words text-left text-sm leading-5 antialiased relative inline-block max-w-full rounded-[20px] rounded-bl px-5 py-4 bg-zinc-200/50 text-zinc-800">
                          <div className="w-full text-sm">
                            <p>¡Hola! ¿Cómo puedo ayudarte hoy?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col justify-end">
                  <form>
                    <div className="flex min-h-16 items-end border-zinc-200 border-t">
                      <textarea
                        className="flex w-full border-zinc-200 bg-white text-sm ring-offset-white sm:overscroll-contain placeholder:text-zinc-500 my-auto max-h-40 min-h-8 resize-none rounded-none border-0 placeholder-zinc-400 sm:text-sm outline-none pointer-events-auto overflow-y-auto p-3"
                        rows={1}
                        placeholder="Ingresa tus consultas aquí..."
                        style={{ height: 44 }}
                        defaultValue={""}
                      />
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-zinc-50 h-9 w-9 my-3 mr-2 size-5 bg-transparent shadow-none hover:bg-zinc-100/90"
                        type="submit"
                      >
                        <i className="fa-solid fa-paper-plane size-5 text-zinc-700" />
                      </button>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
