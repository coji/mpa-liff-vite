import { computed, Ref } from 'vue'
import { Shop } from '../interfaces/model'
import shopListJson from '../assets/shoplist.json'

export const useShopList = (prefecture?: Ref<string | undefined>) => {
  // 都道府県リスト {地域1: [都道府県, ...], 地域2: [都道府県, ...]})
  const prefectures = computed(() => {
    const regions: { [region: string]: string[] } = {}
    shopListJson.forEach((shop: Shop) => {
      if (!regions[shop.region]) regions[shop.region] = []
      if (!regions[shop.region].includes(shop.prefecture)) regions[shop.region].push(shop.prefecture)
    })
    return regions
  })

  // 現在選択中の都道府県にある店舗リスト
  const shops = computed(() => shopListJson.filter((shop) => shop.prefecture === prefecture?.value))

  return {
    prefectures,
    shops,
  }
}
