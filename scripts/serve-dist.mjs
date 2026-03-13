import http from 'http'
import { createReadStream, existsSync } from 'fs'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = join(__filename, '..')
const root = join(__dirname, '..', 'dist')

const port = Number.parseInt(process.env.PORT || '', 10) || 4173
const host = '0.0.0.0'

if (!existsSync(root)) {
  console.error('dist folder not found. Run `npm run build` first.')
  process.exit(1)
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.statusCode = 400
    res.end('Bad Request')
    return
  }

  const urlPath = req.url.split('?')[0]
  const filePath = join(root, urlPath === '/' ? '/index.html' : urlPath)

  if (existsSync(filePath)) {
    const ext = extname(filePath).toLowerCase()
    res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
    createReadStream(filePath).pipe(res)
    return
  }

  // SPA fallback
  const indexPath = join(root, 'index.html')
  if (existsSync(indexPath)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    createReadStream(indexPath).pipe(res)
    return
  }

  res.statusCode = 404
  res.end('Not Found')
})

server.listen(port, host, () => {
  console.log(`Serving dist on http://${host}:${port}`)
})
