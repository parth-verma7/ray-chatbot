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
        id: 2,
        text: "hi",
        timestamp: 0,
        sender: "user",
      },
      {
        id: 3,
        text: "¡Hola! ¿Cómo puedo ayudarte hoy?",
        timestamp: 0,
        sender: "bot",
      },
      {
        id: 4,
        text: "What's the weather like today?",
        timestamp: 0,
        sender: "user",
      },
      {
        id: 5,
        text: "The weather is sunny with a high of 25°C.",
        timestamp: 0,
        sender: "bot",
      },
      {
        id: 6,
        text: "Can you tell me a joke?",
        timestamp: 0,
        sender: "user",
      },
      {
        id: 7,
        text: "Why don't scientists trust atoms? Because they make up everything!",
        timestamp: 0,
        sender: "bot",
      },
      {
        id: 8,
        text: "Thank you!",
        timestamp: 0,
        sender: "user",
      },
      {
        id: 9,
        text: "You're welcome! How else can I assist you?",
        timestamp: 0,
        sender: "bot",
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
      <main className="group relative flex h-full flex-col bg-white rounded-md overflow-hidden flex-1 basis-full overflow-y-hidden scroll-smooth shadow-inner">
          <Chats messages={Bot.chats} chatName={Bot.name} handleSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}
