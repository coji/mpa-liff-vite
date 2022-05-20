import { ref, onMounted } from "vue"
import { useMutation } from "vue-query"

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

// Liff.getProfile の返り値 promise を unwrap するのに使う
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer P> ? P : never

export const useLiff = (liffId: string, options: { isMock: boolean } = { isMock: false }) => {
  const isLoggedIn = ref(false)
  const isInit = ref(false)
  const idToken = ref<string | null>(null)
  const profile = ref<UnwrapPromise<ReturnType<typeof liff.getProfile>> | undefined>()

  onMounted(() => {
    const initializeLiff = async () => {
      await liff.init(
        {
          liffId: liffId,
          mock: options.isMock
        },
        async () => {
          // 成功時
          isInit.value = true
          if (options.isMock && !liff.isInClient()) {
            liff.login()
            isLoggedIn.value = true
          }
          if (liff.isLoggedIn() || options.isMock) {
            isLoggedIn.value = true
            idToken.value = liff.getIDToken()
            profile.value = await liff.getProfile()
          }
        },
        () => {
          // 失敗時
          console.log("liff init error!")
        }
      )
    }
    initializeLiff()
  })

  const sendMessageMutation = () => useMutation((text: string) => liff.sendMessages([{ type: "text", text }]))

  const login = () => liff.login()
  const logout = () => liff.logout()
  const closeWindow = () => liff.closeWindow()

  return {
    isInit,
    isLoggedIn,
    idToken,
    profile,
    sendMessageMutation,
    login,
    logout,
    closeWindow
  }
}
