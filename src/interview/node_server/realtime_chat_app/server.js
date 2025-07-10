const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const messageFile = path.join(__dirname, 'message.json')

app.use(express.static('public'))

function getHistoryMessages() {
    if (fs.existsSync(messagesFile)) {
        const data = fs.readFileSync(messagesFile, 'utf8')
        return JSON.parse(data)
    }
    return []
}

function saveMessage(msg) {
    const messages = getHistoryMessages()
    messages.push(msg)
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2))
}

io.on('connection', (socket) => {
    const history = getHistoryMessages()

    socket.emit('history messages', history)

    socket.on('chat message', (msg) => {
        saveMessage(msg)
        io.emit('chat message', msg)
    })
})

// 设置服务器监听端口
const PORT = process.env.PORT || 3006
server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}/`)
})
