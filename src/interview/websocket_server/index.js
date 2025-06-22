const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // 解码消息内容（支持ArrayBuffer/Buffer）
    const decodedMessage = (message instanceof Buffer)
      ? message.toString('utf-8') 
      : new TextDecoder('utf-8').decode(message);

    // 广播解码后的字符串
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(decodedMessage);
      }
    });
  });
});

console.log('WebSocket server running on ws://localhost:8080');