import React, { useContext, useEffect, useRef, useState } from "react";
import Chats from "./Chats";
import { globalContext } from "./GlobalContext";
import { toast } from "react-toastify";
import { LOCALSTORAGE_SOURCE_DATA_AVAILABLE_ALIS } from "@/utils/Constants";
import axios from "axios";

export default function ChatBubble({isFullScreen = false}: {isFullScreen?: boolean}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
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
    <div ref={modalContainerRef}>
      {!isFullScreen && <button
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
      </button>}
      {(isFullScreen || isOpen) && (
        <div className={`ray-chat-bubble fixed flex flex-col justify-between shadow-[0px_10px_30px_0px_rgba(150,150,150,0.2),_0px_0px_0px_1px_rgba(150,150,150,0.2)] bottom-20 right-4 rounded-lg z-99 overflow-hidden bg-white ${isFullScreen ? "w-screen h-screen top-0 left-0" :"w-[448px] h-[80%] max-h-[80%]"}`}>
          <Chats
            messages={messages}
            chatName={"Ray's Chat Bot"}
            handleSendMessage={handleSendMessage}
          />
        </div>
      )}
    </div>
  );
}
