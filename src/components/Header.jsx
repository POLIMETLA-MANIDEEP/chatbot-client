import React from "react";
import { ChatData } from "../context/ChatContext";
import { Card, CardHeader } from "../components/ui/card";

const Header = () => {
  const { chats } = ChatData();

  return (
    <Card className="mb-4 p-4 text-white shadow border-none">
      <CardHeader>
        <p className="text-xl font-medium mb-2">
          👋 Hello! How can I assist you today?
        </p>
        {chats?.length === 0 && (
          <p className="text-gray-400">Start a new chat to begin</p>
        )}
      </CardHeader>
    </Card>
  );
};

export default Header;
