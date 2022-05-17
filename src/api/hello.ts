import type { Handler } from 'vite-plugin-mix'

export const handler: Handler = (req, res, next) => {
  if (req.path === '/hello') {
    return res.end('Hello world!')
  }
  next()
}
