import { NextRequest } from "next/server";
import { Server } from "socket.io";

let io: Server | undefined;

export async function GET(req: NextRequest) {
  if (!io) {
    // @ts-expect-error socket.io server instance typing issue
    io = new Server((res?.socket?.server?.io), {
      path: "/api/socket_io",
    });

    io.on("connection", (socket) => {
      console.log("✅ connected:", socket.id);

      socket.on("joinRoom", (room: string) => {
        socket.join(room);
        io?.to(room).emit("message", `👋 ${socket.id} joined room: ${room}`);
      });

      socket.on("chat", ({ room, msg }) => {
        io?.to(room).emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("❌ disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket.io server running");
}
