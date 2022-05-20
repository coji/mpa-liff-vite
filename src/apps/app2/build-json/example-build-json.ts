// Google Spreadsheet から生成する JSON をマスターデータ形式のJSONとして保存する
// アクセスキー管理が面倒なので、結論として使わなくなったが、参考のためにコードは残す。
import fs from "fs"
import path from "path"
import url from "url"
import apps from "../../../apps.config.json"

const main = async () => {
  const greeting = apps.app2.app.greeting

  // master.json として保存
  const dirname = path.dirname(url.fileURLToPath(new URL(import.meta.url)))
  const masterFilePath = path.resolve(dirname, "../assets/text.json")
  fs.writeFileSync(masterFilePath, JSON.stringify({ greeting }, null, 2))
}

main()
