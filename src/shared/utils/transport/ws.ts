import { CommonTransport, connections } from "./common";

export class WebsocketTransport extends CommonTransport {
  constructor({ url, options = {} }: { url: string; options?: RequestInit }) {
    super({ url, options });
    this.open();
  }

  static create(url: string, options?: RequestInit) {
    return new WebsocketTransport({ url, options });
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
