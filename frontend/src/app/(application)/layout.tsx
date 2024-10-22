"use client";
import Header from "@/components/Header";
import ChatBubble from "@/components/ChatBubble";
import Wrapper from "@/components/Wrapper";
import Container from "@/components/Container";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import GlobalContextProvider from "@/components/GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContextProvider>
      <Header />
      <Wrapper className="h-[calc(100vh-80px)] bg-white overflow-auto ScrollbarStyling">
        <Container className="h-full">{children}</Container>
      </Wrapper>
      <ChatBubble />
      <ToastContainer />
    </GlobalContextProvider>
  );
}
