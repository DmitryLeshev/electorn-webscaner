import {
  CALL_TIMEOUT,
  PING_INTERVAL,
  RECONNECT_TIMEOUT,
} from "shared/constans";
import { EventEmitter } from "./event-emitter";

export const connections: any = new Set();

window.addEventListener("online", () => {
  for (const connection of connections) {
    if (!connection.connected) connection.open();
  }
});

export type TransportInitType = {
  url: string;
  options: RequestInit;
};

export class CommonTransport extends EventEmitter {
  url: any;
  socket: any;
  api: {};
  callId: number;
  calls: Map<any, any>;
  streams: Map<any, any>;
  active: boolean;
  connected: boolean;
  lastActivity: number;
  callTimeout: number;
  pingInterval: number;
  reconnectTimeout: number;
  token: string;
  options: RequestInit;

  constructor({ url, options = {} }: TransportInitType) {
    super();
    this.url = url;
    this.token = "DEBUG";
    this.socket = null;
    this.api = {};
    this.callId = 0;
    this.calls = new Map();
    this.streams = new Map();
    this.active = false;
    this.connected = false;
    this.lastActivity = new Date().getTime();
    this.callTimeout = CALL_TIMEOUT;
    this.pingInterval = PING_INTERVAL;
    this.reconnectTimeout = RECONNECT_TIMEOUT;
    this.options = options;
  }

  message(data: any) {
    if (data === "{}") return;
    this.lastActivity = new Date().getTime();
    let packet: any;
    try {
      packet = JSON.parse(data);
    } catch {
      return;
    }
    if (packet.callType) console.log("[message callType]", packet.callType);
    if (packet.msg) console.log("[message msg]", packet.msg);
    if (packet.error) console.log("[message error]", packet.error);
    if (!packet.status) console.log("[message status]", packet.status);
    return packet;
  }
}
