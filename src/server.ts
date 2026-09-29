
import * as net from "node:net";
import { RequestData, parseRequest } from './request.js';

export const server = net.createServer((socket) => {  

  socket.on("data", (data) => {
    const req = data.toString();
    const request: RequestData = parseRequest(req);
    
    socket.write(`${request.version} 200 OK\r\n\r\nRequested path: ${request.path}\r\n`);
    socket.end();

  });
  socket.on("end", () => {
    console.log("Client disconnected");
    socket.end();
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });
});
