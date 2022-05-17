import { createApp } from "vue"
import { VueQueryPlugin } from "vue-query"
import App from "./App.vue"
import "./index.css"

const app = createApp(App)
app.use(VueQueryPlugin)
app.mount("#app")
