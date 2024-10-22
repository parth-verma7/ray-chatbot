"use client";
import Chats from "@/components/Chats";
import { formatTime } from "@/utils/helperFunctions";
import React, { useState } from "react";

export default function Page() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>();
  const messages: Message[] = [
    {
      id: 1,
      sender: "bot",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae recusandae accusantium eligendi praesentium voluptas quas fuga inventore voluptatem et cupiditate at beatae nemo laborum iusto, id voluptatum. Facere, vero voluptate!",
      timestamp: 1728388646584,
    },
    {
      id: 2,
      sender: "user",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae recusandae accusantium eligendi praesentium voluptas quas fuga inventore voluptatem et cupiditate at beatae nemo laborum iusto, id voluptatum. Facere, vero voluptate!",
      timestamp: 1728388616584,
    },
    {
      id: 3,
      sender: "bot",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae recusandae accusantium eligendi praesentium voluptas quas fuga inventore voluptatem et cupiditate at beatae nemo laborum iusto, id voluptatum. Facere, vero voluptate!",
      timestamp: 1728388246584,
    },
    {
      id: 4,
      sender: "user",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae recusandae accusantium eligendi praesentium voluptas quas fuga inventore voluptatem et cupiditate at beatae nemo laborum iusto, id voluptatum. Facere, vero voluptate!",
      timestamp: 1728388846584,
    },
    {
      id: 5,
      sender: "bot",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae recusandae accusantium eligendi praesentium voluptas quas fuga inventore voluptatem et cupiditate at beatae nemo laborum iusto, id voluptatum. Facere, vero voluptate!",
      timestamp: 1728388946584,
    },
    {
      id: 6,
      sender: "user",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae recusandae accusantium eligendi praesentium voluptas quas fuga inventore voluptatem et cupiditate at beatae nemo laborum iusto, id voluptatum. Facere, vero voluptate!",
      timestamp: 1728388246584,
    },
    {
      id: 7,
      sender: "bot",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae recusandae accusantium eligendi praesentium voluptas quas fuga inventore voluptatem et cupiditate at beatae nemo laborum iusto, id voluptatum. Facere, vero voluptate!",
      timestamp: 1728388646584,
    },
  ];
  const chats: ChatType[] = [
    {
      chat_id: "1",
      chatbot_id: "1",
      last_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      name: "chat 1",
      timestamp: 1728388646584,
    },
    {
      chat_id: "2",
      chatbot_id: "1",
      last_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      name: "chat 2",
      timestamp: 1728388616584,
    },
    {
      chat_id: "3",
      chatbot_id: "1",
      last_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      name: "chat 3",
      timestamp: 1728388246584,
    },
    {
      chat_id: "4",
      chatbot_id: "1",
      last_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      name: "chat 4",
      timestamp: 1728318846584,
    },
    {
      chat_id: "5",
      chatbot_id: "1",
      last_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      name: "chat 5",
      timestamp: 1728381946584,
    },
    {
      chat_id: "6",
      chatbot_id: "1",
      last_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      name: "chat 6",
      timestamp: 1728388246584,
    },
    {
      chat_id: "7",
      chatbot_id: "1",
      last_message: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      name: "chat 7",
      timestamp: 1728388646584,
    },
    
  ];
  return (
    <div className="w-full max-w-5xl mx-auto border border-gray-200 rounded-lg h-full max-h-[80%] flex flex-col">
      <h3 className="text-2xl font-semibold space-y-1.5 p-6 leading-none tracking-tight my-auto border-b border-zinc-500">
        Chat Logs
      </h3>
      <div className="flex w-full flex-col space-y-4 lg:flex-row lg:space-y-0 !px-0 h-full flex-1 min-h-0">
        <div className="w-full lg:max-w-xs xl:max-w-sm lg:border-b-0 border-b overflow-y-auto ScrollbarStyling overflow-x-hidden border-r">
          <ul className="w-full divide-y divide-zinc-200 h-full">
            {chats.map((chat) => (
              <li
                onClick={() => setSelectedChatId(chat.chat_id)}
                key={chat.chat_id}
                className={`flex flex-col w-full gap-2 relative p-6 pr-4 py-5 hover:bg-zinc-100 cursor-pointer ${
                  selectedChatId == chat.chat_id ? "bg-zinc-100" : "bg-white"
                }`}
              >
                <div className="flex justify-between space-x-3">
                  <p className="truncate text-sm text-zinc-800 font-semibold w-1 flex-1">
                    {chat.name}
                  </p>
                  <p className="shrink-0 whitespace-nowrap text-sm text-zinc-500">
                    {formatTime(chat.timestamp, true)}
                  </p>
                </div>
                <div>
                  <p className="line-clamp-1 text-zinc-500 text-sm">
                    {chat.last_message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex grow justify-center w-full ml-2 relative">
          <Chats messages={messages} />
        </div>
      </div>
    </div>
  );
}
