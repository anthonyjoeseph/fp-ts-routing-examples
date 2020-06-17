const safeWindow = {
  ...(typeof window !== 'undefined'
  ? {
    ...window,
    addEventListener: <K extends keyof WindowEventMap>(
      type: K,
      listener: (this: Window, ev: WindowEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions) => {
        // addEventListener is bound to 'window' strangely,
        // must be invoked in this way
        window.addEventListener(type, listener, options);
      },
  }
  : {
    addEventListener: <K extends keyof WindowEventMap>(
      type: K,
      listener: (this: Window, ev: WindowEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions) => {},
    location: {
      pathname: '',
    },
    history: {
      pushState: (data: any, title: string, url?: string | null) => {},
    }
  })
}

export default safeWindow;