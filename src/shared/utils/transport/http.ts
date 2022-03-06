import { CommonTransport } from "./common";

export class HttpTransport extends CommonTransport {
  constructor({ url, options = {} }: { url: string; options?: RequestInit }) {
    super({ url, options });
    this.open();
  }

  static create(url: string, options: RequestInit) {
    return new HttpTransport({ url, options });
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
      body = JSON.stringify({ ...data });
    } catch (error) {
      console.warn("[send] JSON stringify error", error);
    }
    this.lastActivity = new Date().getTime();
    return await fetch(this.url, { ...this.options, body }).then((res: any) => {
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
