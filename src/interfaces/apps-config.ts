export interface LiffConfig {
  liffId: string
  channelId: string
}

export interface AppConfig {
  liff: LiffConfig
  app?: { [key: string]: string }
  buildJson?: string
}

export interface AppsConfig {
  [appId: string]: {
    liff: {
      [env: string]: {
        liffId: string
        channelId: string
      }
    }
    app?: { [key: string]: string }
    buildJson?: string
  }
}
