import { execSync } from "child_process"
import path from "path"
import glob from "glob"

import { AppsConfig } from "../interfaces/apps-config"
import config from "../apps.config.json"
const apps: AppsConfig = config

const executePurgeCSS = async (appId: string, target: string) => {
  // TODO: うーん、必要な css までパージされちゃう。 devtools と スケジュール選択の radio アイコンがでなくなるのでいったん断念。
  try {
    console.log(`${appId} starting purge css...`)
    const stdout = execSync(
      `tailwindcss  -i src/apps/${appId}/index.css -o ${target} --minify --content "./src/apps/${appId}/**/*.{html,vue},./src/features/**/*.{html,vue}"`
    )
    console.log(stdout.toString())
    console.log(`${appId} purge css done.`)
  } catch (error) {
    console.log(error)
  }
}

glob("dist/assets/*.css", async (err, files) => {
  files.forEach((file) => {
    const basename = path.basename(file)
    const [appId] = basename.split(".")
    if (apps[appId]) {
      executePurgeCSS(appId, file)
    }
  })
})
