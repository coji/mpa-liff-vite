import { AppConfig, AppsConfig } from '~/interfaces/apps-config'
import apps from '~/apps.config.json'

const configs: AppsConfig = apps

export const getAppConfig = ({ appId }: { appId: string }): AppConfig => {
  const { app, buildJson } = configs[appId]
  return {
    liff: configs[appId].liff[import.meta.env.MODE] || {
      liffId: '',
      channelId: '',
    },
    app,
    buildJson,
  }
}
