// components/Chat.tsx
"use client";

import { useEffect, useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);



  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        
      </div>
    </div>
  );
}
