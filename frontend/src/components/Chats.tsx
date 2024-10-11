import React, { useState } from "react";
import Button from "./Button";
import { FaPaperPlane } from "react-icons/fa";

export default function Chats({
  messages,
  chatName,
  handleSendMessage,
}: {
  messages: Message[];
  chatName?: string;
  handleSendMessage?: (message: string) => Promise<any>;
}) {
  const [message, setMessage] = useState("");
  return (
    <div className="flex flex-col h-full ScrollbarStyling">
      {chatName && (
        <header
          className="relative flex items-center justify-start px-5 text-black h-16 gap-px"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.02) 0.44%, rgba(0, 0, 0, 0) 49.5%), rgb(255, 255, 255)",
          }}
        >
          <h1 className="font-semibold text-sm">{chatName}</h1>
        </header>
      )}

      <div className="w-full h-fit overflow-y-auto overflow-x-hidden border-zinc-200 p-2 py-5 flex-1 min-h-0">
        <div className="h-fit w-full flex flex-col gap-4">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`w-fit flex relative hyphens-auto break-words rounded-[20px] px-5 py-4 text-sm antialiased max-w-[min(calc(100%-40px),65ch)] flex-col gap-4 leading-relaxed ${
              message.sender == "bot"
                ? "mr-8 self-start rounded-bl text-left bg-[#f1f1f0] text-black"
                : "ml-8 self-end rounded-br text-left bg-black text-white"
            }`}
          >
            {message.text}
          </p>
        ))}
        </div>
      </div>
      {handleSendMessage && (
        <div className="flex justify-end h-[65px] items-end border-zinc-200 border-t">
          <textarea
            className="flex w-full bg-white text-sm ring-offset-white sm:overscroll-contain placeholder:text-zinc-500 my-auto resize-none rounded-none placeholder-zinc-400 sm:text-sm outline-none pointer-events-auto overflow-y-auto px-3 h-[40px]"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ingresa tus consultas aquí..."
            onKeyDown={(e) => {
              if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(message).then(() => {
                  setMessage("");
                });
              }
            }}
          />
          <Button
            className="!aspect-square m-2"
            onClick={() => {
              handleSendMessage(message).then(() => {
                setMessage("");
              });
            }}
          >
            <FaPaperPlane />
          </Button>
        </div>
      )}
    </div>
  );
}
