import type { Handler } from 'vite-plugin-mix'
// backend API to this Vite app.
// @see https://github.com/egoist/vite-plugin-mix

export const handler: Handler = (req, res, next) => {
  if (req.path === '/hello') {
    return res.end('Hello world!')
  }
  next()
}
