declare class EventEmitter {
  static listenerCount(emitter: EventEmitter, event: string): number;

  addListener(event: string, listener: Function): EventEmitter;
  on(event: string, listener: Function): EventEmitter;
  once(event: string, listener: Function): EventEmitter;
  removeListener(event: string, listener: Function): EventEmitter;
  removeAllListeners(event?: string): EventEmitter;
  setMaxListeners(n: number): void;
  listeners(event: string): Function[];
  emit(event: string, ...args: any[]): boolean;
}

declare module 'electron' {
  declare class BrowserWindow extends EventEmitter {
    openDevTools(): void;
    loadURL(url: string, options: any): void;
    close(): void;
    static on(event: 'page-title-updated' | 'close'): EventEmitter;
    constructor(options?: Object): this;
  }

  declare class app {
    static on(event: 'activate' | 'ready' | 'window-all-closed' | 'before-quit', listener: () => void): void;
    static quit(): void;
  }

  declare class MenuItem {
    static constructor(options: {
      label: string,
      click(): void
    }): MenuItem;
  }

  declare class Menu {
    static setApplicationMenu(appMenu: Object): void;
    popup: (win: BrowserWindow) => void;
    append: (item: MenuItem) => void;
  }

  declare class remote {
    static Menu: Class<Menu>;
    static MenuItem: Class<MenuItem>;
    static getCurrentWindow: () => BrowserWindow;
  }
}
