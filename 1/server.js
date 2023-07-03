import { fastify } from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyExpress from "@fastify/express";
import fastifyMultipart from "@fastify/multipart";
import path from "node:path";
import url from "node:url";


const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = fastify()

app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    index: 'ololo.html',
})

await app.register(fastifyExpress)
app.register(fastifyMultipart)


app.post('/', (req, res) => {
    res.send('ok')
})

app.head('/dir/text.html', (req, res) => {
    res
    .header('Content-Type', 'text/html; charset=utf-8')
    .header('My-Cool-Header', 'How do you do?')
    .send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    text document.
</body>
</html>
    `)
})

app.get('/dir/text.html', (req, res) => {
    res
    .header('Content-Type', 'text/html; charset=utf-8')
    .header('My-Cool-Header', 'How do you do?')
    .send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    text document.
</body>
</html>
    `)
})

const serverPort = 3000

app.listen({port: serverPort}).then(() => {
    console.log('listening on port', serverPort)
})