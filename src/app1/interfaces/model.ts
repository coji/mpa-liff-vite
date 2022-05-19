export interface ShopListMaster {
  [region: string]: {
    [prefecture: string]: Shop[]
  }
}

export interface Shop {
  region: string
  prefecture: string
  name: string
}

export interface Selection {
  region: string
  prefecture: string
  shop: string
  member: string
  firstChoice: string
  secondChoice: string
}
