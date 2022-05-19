export interface AppConfig {
  liffId: {
    development: string
    production: string
  }
  buildJson?: string
}

export interface AppsConfig {
  [appId: string]: AppConfig
}
