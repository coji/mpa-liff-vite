import { ref, computed } from "vue"

export type RouteDefinition = string[]

// LIFF用の簡易な一方向ルーター
export const useLinearRouter = ({ routing }: { routing: RouteDefinition }) => {
  const current = ref(0)
  const history = ref<string[]>([routing[0]])

  // 次へ
  const next = () => {
    if (routing.length > current.value + 1) {
      history.value.push(routing[current.value])
      current.value++
    }
    return routing[current.value]
  }

  // 戻る
  const back = () => {
    console.log("back")
    if (current.value > 0) {
      history.value.push(routing[current.value])
      current.value--
    }
    return routing[current.value]
  }

  return {
    current: computed(() => routing[current.value]),
    history,
    canBack: computed(() => current.value > 0),
    next,
    back
  }
}
