interface Message {
  id: number;
  text: string;
  timestamp: number;
  sender: "bot" | "user" | "system";
}

type ChatbotType = {
  chatbot_id: string;
  name: string;
};

type ChatType = {
  name: string;
  chatbot_id: string;
  chat_id: string;
  last_message: string;
  timestamp: number;
};

type SourceDataType = {
  files: File[] | null;
  text: string | null;
  websites: string[] | null;
  QAndAs:
    | {
        question: string;
        answer: string;
      }[]
    | null;
};
