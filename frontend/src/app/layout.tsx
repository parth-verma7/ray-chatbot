"use client";
import Header from "@/components/Header";
import "./globals.css";
import ChatBubble from "@/components/ChatBubble";
import Wrapper from "@/components/Wrapper";
import Container from "@/components/Container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen`}>
        <Header />
        <Wrapper className="h-[calc(100vh-80px)] overflow-auto ScrollbarStyling">
          <Container className="h-full">{children}</Container>
        </Wrapper>
        <ChatBubble />
      </body>
    </html>
  );
}
