"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { ChatbotTabsEnum } from "@/utils/enums";
import { useEffect, useState } from "react";

export default function Home() {
  const [ChatBots, setChatBots] = useState<ChatbotType[]>([
    { name: "Bot 1", chatbot_id: "-1" },
  ]);
  const [newName, setNewName] = useState("");

  // useEffect(() => {
  //   if (typeof window != "undefined") {
  //     return JSON.parse(localStorage.getItem("chatBots") ?? "[]");
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window != "undefined") {
      if (ChatBots.length == 1 && ChatBots[0].chatbot_id == "-1") {
        let chatBots = JSON.parse(localStorage.getItem("chatBots") ?? "[]");
        chatBots = chatBots.filter((chat: any) => chat.chatbot_id != "-1");
        setChatBots(chatBots);
      } else {
        localStorage.setItem("chatBots", JSON.stringify(ChatBots));
      }
    }
  }, [ChatBots]);

  return (
    <div>
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex align-center justify-between my-6">
          <div>
            <p className="text-h4">Chatbots</p>
          </div>
          <div className="flex gap-1 items-center">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 px-4 py-2 w-full"
              placeholder="Chatbot name"
            />
            <Button
              onClick={() => {
                if (newName.length > 0) {
                  setChatBots([
                    ...ChatBots,
                    { name: newName, chatbot_id: `${new Date().getTime()}` },
                  ]);
                  setNewName("");
                }
              }}
            >
              Create
            </Button>
          </div>
        </div>
        <div className="my-8 grid w-full grid-cols-2 gap-8 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          {ChatBots.filter((chat: any) => chat.chatbot_id != "-1").map(
            (bot) => (
              <ChatBotCard key={bot.chatbot_id} {...bot} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

const ChatBotCard = ({ chatbot_id, name }: ChatbotType) => {
  return (
    <a href={`/chatbots/${chatbot_id}/${ChatbotTabsEnum.PLAYGROUND}`}>
      <div className="relative flex w-40 flex-col justify-between overflow-hidden rounded border">
        <Image
          width={200}
          height={200}
          className="h-40 w-40 border-none object-cover"
          src="https://backend.chatbase.co/storage/v1/object/public/chatbase/chatbot-placeholder.png?width=640&quality=50"
          style={{ color: "transparent" }}
          alt=""
        />
        <div className="flex h-14 items-center justify-center px-1">
          <h3 className="m-auto overflow-hidden text-center text-xs font-semibold md:text-sm">
            {name}
          </h3>
        </div>
      </div>
    </a>
  );
};