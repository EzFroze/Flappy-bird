import fs from 'fs'
import path from 'path'

import express from 'express'
import sirv from 'sirv'

const DEV_ENV = 'development'
const app = express()

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});


const bootstrap = async () => {
  
  let vite

  //app.use(express.static('public'))

  
    app.use(
      sirv('client', {
        gzip: true,
      })
    )

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    let template, render

    try {
      template = fs.readFileSync(
        path.resolve('client/index.html'),
        'utf-8'
      )
      render = (await import('./server/entry-server.js')).render
      

      const appHtml = await render({ path: url })

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html').end(html)
    } catch (error) {
      console.log('ssr err:', error)
    }
  })
  

  return { app }
}




bootstrap()
  .then(async ({ app }) => {
    app.listen(3000, () => {
      console.log(`Server started at http://localhost:${3000}`)
    })
  })
  .catch(console.error)
