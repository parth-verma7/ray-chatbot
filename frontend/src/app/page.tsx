"use client"
import Button from "@/components/Button";
import Image from "next/image";
import { ChatbotTabsEnum } from "@/utils/enums";

export default function Home() {
  const ChatBots: ChatbotType[] = [
    {
      chatbot_id: "13814",
      name: "my bot 1",
    },
    {
      chatbot_id: "13815",
      name: "my bot 2",
    },
    {
      chatbot_id: "13816",
      name: "my bot 3",
    },
    {
      chatbot_id: "13817",
      name: "my bot 4",
    },
    {
      chatbot_id: "13818",
      name: "my bot 5",
    },
  ];
  return (
    <div>
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex align-center justify-between my-6">
          <div>
            <p className="text-h4">Chatbots</p>
          </div>
          <form action="#" className="flex gap-1 items-center">
            <input
              type="text"
              className="border border-gray-300 px-4 py-2 w-full"
              placeholder="Chatbot name"
            />
            <Button>Create</Button>
          </form>
        </div>
        <div className="my-8 grid w-full grid-cols-2 gap-8 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          {ChatBots.map((bot) => (
            <ChatBotCard key={bot.chatbot_id} {...bot} />
          ))}
          <a href="#">
            <div className="relative flex w-40 flex-col justify-between overflow-hidden rounded border">
              <Image
                alt="thumbnail"
                width={200}
                height={200}
                className="h-40 w-40 border-none object-cover"
                src="https://backend.chatbase.co/storage/v1/object/public/chatbase/chatbot-placeholder.png?width=640&quality=50"
                style={{ color: "transparent" }}
              />
              <div className="flex h-14 items-center justify-center px-1">
                <h3 className="m-auto overflow-hidden text-center text-xs font-semibold md:text-sm">
                  my bot 2
                </h3>
              </div>
            </div>
          </a>
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
