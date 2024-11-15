import { io } from "socket.io-client";
// https://chatserver-b2ardddcb6dsevbt.westus-01.azurewebsites.net/
// https://chatroom-websocket-dyo.azurewebsites.net/
export const socket = io("http://localhost:3000");
