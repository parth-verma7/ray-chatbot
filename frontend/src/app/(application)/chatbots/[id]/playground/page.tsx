"use client";
import Chats from "@/components/Chats";
import { globalContext } from "@/components/GlobalContext";
import { LOCALSTORAGE_SOURCE_DATA_AVAILABLE_ALIS } from "@/utils/Constants";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { sourceData } = useContext(globalContext);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hello! How can I help you today?",
      timestamp: 1728388646584,
    },
  ]);
  const handleSendMessage = async (message: string) => {
    const toastId = toast.loading("Sending message...");
    try {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "user",
          text: message,
          timestamp: Date.now(),
        },
      ]);
      const formData = new FormData();
      formData.append("user_query", message);
      formData.append(
        "sources",
        localStorage.getItem(LOCALSTORAGE_SOURCE_DATA_AVAILABLE_ALIS) ||
          '{\n "pdf":false, \n "text":true, \n "qna": true, \n "links":true\n}'
      );
      formData.append("text", sourceData?.text || "");
      if(sourceData?.websites && sourceData.websites.length > 0) {
        formData.append("links", JSON.stringify(sourceData.websites));
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/query`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: res.data.text,
          timestamp: Date.now(),
        },
      ]);
      toast.update(toastId, {
        render: "Message sent!",
        type: "success",
        isLoading: false,
        autoClose: 400,
      });
    } catch (e: any) {
      toast.update(toastId, {
        render: e.message,
        type: "error",
        isLoading: false,
        autoClose: 400,
      });
    }
  };
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
        <Chats
          messages={messages}
          chatName={`Ray's Chat Bot`}
          handleSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
}
