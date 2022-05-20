import { execSync } from "child_process"
import { AppsConfig, AppConfig } from "../interfaces/apps-config"

import config from "../apps.config.json"
const apps: AppsConfig = config

const executeBuildJson = async (appId: string, app: AppConfig) => {
  try {
    console.log(`${appId} starting build json...`)
    const stdout = execSync(
      `node --no-warnings --experimental-loader=ts-node/esm --es-module-specifier-resolution=node src/${appId}/build-json/${app.buildJson}`
    )

    console.log(stdout.toString())
    console.log(`${appId} build json done.`)
  } catch (error) {
    console.log(error)
  }
}

Object.keys(apps).map((appId) => {
  if (apps[appId].buildJson) executeBuildJson(appId, apps[appId])
})
