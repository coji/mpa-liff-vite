import { ref, computed, onMounted } from "vue"
import { useMutation, useQuery } from "vue-query"
import liff from "@line/liff"

export const useLiff = () => {
  const isLoggedIn = ref(false)
  const isInit = ref(false)

  onMounted(() => {
    const initializeLiff = async () => {
      await liff.init(
        {
          liffId: import.meta.env.VITE_LIFF_ID
        },
        () => {
          isInit.value = true
          if (liff.isLoggedIn()) {
            isLoggedIn.value = true
          }
        },
        () => {
          console.log("error!")
        }
      )
    }

    initializeLiff()
  })

  const useProfile = () => {
    return useQuery("liff.profile", () => liff.getProfile(), {
      enabled: isLoggedIn,
      onError: (err) => err
    })
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
