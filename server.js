import http from "node:http";
import { WebSocketServer } from "ws";
import path from "node:path";
import fs from 'node:fs/promises'


const PORT = process.env.PORT ?? 9000;

const httpServer = http.createServer(async function (req, res) {
    const indexFile= await fs.readFile(path.resolve('./index.html'),'utf-8')
    res.setHeader('Content-Type','text/html');
    return res.end(indexFile);
});

const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection',(websocket)=>{
    console.log(`Websocket Connection...`);
    websocket.on('message',(data)=>{
        console.log(`WebSocket Message Recieved`,data.toString());
        websocket.send('pong.. hello ji from the server');
        
    })
    
})

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
