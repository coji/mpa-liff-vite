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

  const useProfile = () => {
    const query = useQuery("liff.profile", () => liff.getProfile(), {
      enabled: isLoggedIn,
      onError: (err) => err
    })
    return { ...query }
  }

  const useSendMessages = () => useMutation((text: string) => liff.sendMessages([{ type: "text", text }]))

  const login = () => liff.login()
  const logout = () => liff.logout()
  const closeWindow = () => liff.closeWindow()

  return {
    isInit,
    isLoggedIn,
    useProfile,
    useSendMessages,
    login,
    logout,
    closeWindow
  }
}
