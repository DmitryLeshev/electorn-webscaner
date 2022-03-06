export class EventEmitter {
  events: Map<any, any>;
  constructor() {
    this.events = new Map();
  }

  on(name: any, fn: any) {
    const event = this.events.get(name);
    if (event) event.add(fn);
    else this.events.set(name, new Set([fn]));
  }

  emit(name: any, ...args: any[]) {
    const event = this.events.get(name);
    if (!event) return;
    for (const fn of event.values()) {
      fn(...args);
    }
  }

  remove(name: any, fn: any) {
    const event = this.events.get(name);
    if (!event) return;
    if (event.has(fn)) {
      event.delete(fn);
      return;
    }
  }

  clear(name: any) {
    if (name) this.events.delete(name);
    else this.events.clear();
  }
}
