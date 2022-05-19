import { ref, onMounted } from "vue"
import { useMutation, useQuery } from "vue-query"
import liff from "@line/liff"

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
          liffId
        },
        () => {
          console.log("liff init success")
          isInit.value = true
          if (liff.isLoggedIn()) {
            isLoggedIn.value = true
            console.log("liff logged in")
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
  const useLiffData = () =>
    useQuery(
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
          isSubWindow: liff.isSubWindow(),
          advertisingId: liff.getAdvertisingId && (await liff.getAdvertisingId())
        }
      },
      { enabled: isLoggedIn.value }
    )

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
