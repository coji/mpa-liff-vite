import fs from "fs"
import path from "path"
import url from "url"
import got from "got"
import type { Shop } from "../interfaces/model"

export interface ShopListMaster {
  [region: string]: {
    [prefecture: string]: Shop[]
  }
}

// google spreadsheet ベースの JSON データからアプリ用のマスタデータJSONを生成
const main = async () => {
  // スプレッドシートからJSON取得 @see https://docs.google.com/spreadsheets/d/1MpacjebNCdITBzNBJDF1ThNPRdLl8C5k0D7wPRktK4E/edit?usp=drive_web&ouid=114061044522289798255
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await got
    .get(
      "https://sheets.googleapis.com/v4/spreadsheets/1MpacjebNCdITBzNBJDF1ThNPRdLl8C5k0D7wPRktK4E/values/shoplist?key=AIzaSyCzUnndk_8uQZDUy6btAFtRb9VULFQ7hic"
    )
    .json()

  // 扱いやすい形に変換
  const shopRows = data.values as string[] // 元データ: ['関東', '東京', '銀座店']
  const master: ShopListMaster = {} // 変換後: { "関東": {"東京": [{"region": "関東", "prefecture": "東京", "name": "銀座店"}] }}
  shopRows.forEach((shopRow) => {
    const shop = {
      region: shopRow[0],
      prefecture: shopRow[1],
      name: shopRow[2]
    }
    master[shop.region] ||= {}
    master[shop.region][shop.prefecture] ||= []
    master[shop.region][shop.prefecture].push(shop)
  })

  // master.json として保存
  const dirname = path.dirname(url.fileURLToPath(new URL(import.meta.url)))
  const masterFilePath = path.resolve(dirname, "../assets/shoplist.json")
  fs.writeFileSync(masterFilePath, JSON.stringify(master, null, 2))
}

main()
