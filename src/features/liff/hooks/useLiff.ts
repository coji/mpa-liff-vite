import { ref, onMounted, computed } from "vue"
import { useMutation, useQuery } from "vue-query"

import liff from "@line/liff"
import { LiffMockPlugin, ExtendedInit, LiffMockApi } from "@line/liff-mock"
declare module "@line/liff" {
  interface Liff {
    init: ExtendedInit
    $mock: LiffMockApi
  }
}
liff.use(new LiffMockPlugin())

export interface LiffProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export const useLiff = (liffId: string) => {
  const isLoggedIn = ref(false)
  const isInit = ref(false)

  onMounted(() => {
    const initializeLiff = async () => {
      await liff.init(
        {
          liffId,
          mock: import.meta.env.DEV
        },
        () => {
          isInit.value = true
          if (import.meta.env.DEV && !liff.isInClient()) {
            liff.login()
            isLoggedIn.value = true
          }
          if (liff.isLoggedIn() || import.meta.env.DEV) {
            isLoggedIn.value = true
          }
        },
        () => {
          console.log("liff init error!")
        }
      )
    }

    initializeLiff()
  })

  // Liff で取得できるデータ全部とる
  const useLiffData = () => {
    return useQuery(
      ["liff.data"],
      async () => {
        return {
          liffId: liffId,
          profile: await liff.getProfile(),
          accessToken: liff.getAccessToken(),
          idToken: liff.getIDToken(),
          decodedIdToken: liff.getDecodedIDToken(),
          context: liff.getContext(),
          friendship: await liff.getFriendship(),
          os: liff.getOS(),
          language: liff.getLanguage(),
          liffSdkVersion: liff.getVersion(),
          lineVersion: liff.getLineVersion(),
          isInClient: liff.isInClient(),
          isVideoAutoPlay: liff.getIsVideoAutoPlay(),
          advertisingId: liff.getAdvertisingId && (await liff.getAdvertisingId())
        }
      },
      { enabled: computed(() => isLoggedIn.value) }
    )
  }

  const sendMessages = () => useMutation((text: string) => liff.sendMessages([{ type: "text", text }]))

  const login = () => liff.login()
  const logout = () => liff.logout()
  const closeWindow = () => liff.closeWindow()

  return {
    isInit,
    isLoggedIn,
    useLiffData,
    sendMessages,
    login,
    logout,
    closeWindow
  }
}
