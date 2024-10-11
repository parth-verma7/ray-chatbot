"use client"
import Chats from "@/components/Chats";
import React from "react";

type BotType = {
  name: string;
  chats: Message[];
};

export default function page() {
  const Bot: BotType = {
    name: "Ray's Chat Bot",
    chats: [
      {
        id: 1,
        sender: "bot",
        text: "Hello! How can I help you today?",
        timestamp: 1728388646584,
      },
    ],
  };
  const handleSendMessage = (message: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        Bot.chats.push({
          id: Bot.chats.length + 1,
          text: message,
          timestamp: Date.now(),
          sender: "user",
        });
        resolve("Done");
      }, 1000);
    });
  }
  return (
    <div
      className="w-full max-w-5xl mx-auto border border-gray-200 rounded-lg p-10 flex flex-col items-center justify-center md:h-full h-full max-h-[80%]"
      style={{
        backgroundColor: "#fafafa",
        opacity: 1,
        backgroundImage: "radial-gradient(#001aff 0.5px, #fafafa 0.5px)",
        backgroundSize: "10px 10px",
      }}
    >
      <main className="group relative flex h-full flex-col bg-white rounded-md overflow-hidden flex-1 basis-full overflow-y-hidden scroll-smooth shadow-inner max-w-lg w-full">
          <Chats messages={Bot.chats} chatName={Bot.name} handleSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}
