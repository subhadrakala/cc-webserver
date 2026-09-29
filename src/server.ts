
import * as net from "node:net";
import { RequestData, parseRequest } from './request.js';
import { buildResponse } from './response.js';

export const server = net.createServer((socket) => {  

  socket.on("data", (data) => {
    const req = data.toString();
    const request: RequestData = parseRequest(req);
    const res = buildResponse(request);
    socket.write(res);
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
