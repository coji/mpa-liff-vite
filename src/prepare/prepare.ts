import { execSync } from "child_process"
import config from "../apps.config.json"

export interface AppConfig {
  liffId: {
    development: string
    production: string
  }
  prepare?: string
}
export interface AppsConfig {
  [appId: string]: AppConfig
}
const apps: AppsConfig = config

const NODE_EXEC_COMMAND = "node --no-warnings --experimental-loader=ts-node/esm --es-module-specifier-resolution=node"

const executePrepare = async (appId: string, app: AppConfig): Promise<void> => {
  try {
    console.log(`${appId} starting prepare...`)
    const stdout = execSync(`${NODE_EXEC_COMMAND} src/${appId}/prepare/${app.prepare}`)

    console.log(stdout.toString())
    console.log(`${appId} prepare done.`)
  } catch (error) {
    console.log(error)
  }
}

Object.keys(apps).map((appId) => {
  if (apps[appId].prepare) executePrepare(appId, apps[appId])
})
