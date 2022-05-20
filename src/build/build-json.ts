import { execSync } from "child_process"
import type { AppsConfig } from "../interfaces/apps-config"
import apps from "../apps.config.json"
const configs: AppsConfig = apps

const executeBuildJson = async (appId: string, buildJson: string) => {
  try {
    console.log(`${appId} starting build json...`)
    const cmd = `node --no-warnings --experimental-loader=ts-node/esm --es-module-specifier-resolution=node src/apps/${appId}/build-json/${buildJson}`
    console.log(cmd)
    const stdout = execSync(cmd)

    console.log(stdout.toString())
    console.log(`${appId} build json done.`)
  } catch (error) {
    console.log(error)
  }
}

Object.keys(configs).forEach((appId) => {
  const { buildJson } = configs[appId]
  if (buildJson) executeBuildJson(appId, buildJson)
})
