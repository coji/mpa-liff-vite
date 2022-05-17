import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import apps from "./src/apps.json"

const root = resolve(__dirname, "src")
const outDir = resolve(__dirname, "dist")

export default defineConfig({
  root,
  publicDir: "public",
  plugins: [vue()],
  resolve: { alias: { "~/": "/" } },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        ...Object.keys(apps).reduce((map, app) => {
          map[app] = resolve(root, app, "index.html")
          return map
        }, {})
      }
    }
  }
})
