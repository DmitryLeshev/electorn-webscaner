import {
  CALL_TIMEOUT,
  RECONNECT_TIMEOUT,
  PING_INTERVAL,
} from "shared/constans";

import { EventEmitter } from "./event-emitter";
const connections: any = new Set();

window.addEventListener("online", () => {
  for (const connection of connections) {
    if (!connection.connected) connection.open();
  }
});

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
  callTimeout: any;
  pingInterval: any;
  reconnectTimeout: any;
  token: string;

  constructor({ url, options = {} }: { url: any; options?: any }) {
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
    this.callTimeout = options.callTimeout || CALL_TIMEOUT;
    this.pingInterval = options.pingInterval || PING_INTERVAL;
    this.reconnectTimeout = options.reconnectTimeout || RECONNECT_TIMEOUT;
  }

  static create(url: string, options: any) {
    const Transport = url.startsWith("ws") ? transports.ws : transports.http;
    return new Transport({ url, options });
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

class HttpTransport extends CommonTransport {
  constructor({ url, options = {} }: { url: any; options?: any }) {
    super({ url, options });
    this.open();
  }
  async open() {
    this.active = true;
    this.connected = true;
  }

  close() {
    this.active = false;
    this.connected = false;
  }

  async send(data: any) {
    let body: any;
    try {
      body = JSON.stringify({ ...data, token: "DEBUG" });
    } catch (error) {
      console.warn("[send error]", error);
    }
    this.lastActivity = new Date().getTime();
    return await fetch(this.url, {
      method: "POST",
      credentials: "include",
      headers: {},
      body,
    }).then((res: any) => {
      const { status } = res;
      if (status === 200) {
        return res.text().then((packet: any) => {
          if (packet.error) throw new Error(packet.error);
          return this.message(packet);
        });
      }
      throw new Error(`Status Code: ${status}`);
    });
  }
}

class WebsocketTransport extends CommonTransport {
  constructor({ url, options = {} }: { url: any; options?: any }) {
    super({ url, options });
    this.open();
  }

  open() {
    if (this.connected) return;
    const socket = new WebSocket(this.url);
    this.active = true;
    this.socket = socket;
    connections.add(this);

    socket.addEventListener("message", ({ data }) => {
      if (typeof data === "string") {
        this.message(data);
        return;
      }
    });

    socket.addEventListener("close", () => {
      this.connected = false;
      setTimeout(() => {
        if (this.active) this.open();
      }, this.reconnectTimeout);
    });

    socket.addEventListener("error", (err) => {
      this.emit("error", err);
      socket.close();
    });

    setInterval(() => {
      if (this.active) {
        const interval = new Date().getTime() - this.lastActivity;
        if (interval > this.pingInterval) this.send("{}");
      }
    }, this.pingInterval);

    return new Promise((resolve: any) => {
      socket.addEventListener("open", () => {
        this.connected = true;
        resolve();
      });
    });
  }

  close() {
    this.active = false;
    connections.delete(this);
    if (!this.socket) return;
    this.socket.close();
    this.socket = null;
  }

  async send(data: any) {
    if (!this.connected) return;
    this.lastActivity = new Date().getTime();
    this.socket.send(data);
  }
}

const transports = {
  ws: WebsocketTransport,
  http: HttpTransport,
};
