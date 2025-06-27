"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "../ui/button";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <Button onClick={() => setChatBoxOpen(true)}>
          <Bot size={20} className="mr-2" />
          Tanya AI
        </Button>
      </div>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
