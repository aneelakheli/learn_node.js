// const WebSocket = require('ws')
import WebSocket ,{ WebSocketServer}  from "ws";

let wss;

let clients = {}

function initializationSocket(){
     wss = new WebSocketServer({port: 8088,
        perMessageDeflate:{
            zlibDeflateOptions: {
                chunkSize:1024,
                memLevel: 7,
                level:3,
            },
            zlibInflateOptions:{
                chunkSize:10 * 1024
            },
            clientNoContextTakeover:true,
            serverNoContextTakeover:true,
            serverMaxWindowBits:10,
            concurrencyLimit:10,
            threshold: 1024
        }
        
        })
        console.log('web socket is runnign properly in port 8080')
}

function utilitySocket(){
    wss.on('connection', function connection(ws){
        const userId = Math.random().toString(36).substring(1,10)
        clients[userId] = ws

        ws.on('message', (message)=>{
            const data = JSON.parse(message)

            switch(data.type){
                case 'chat':
                    console.log('The data is message',data.message)
                    break;
                case 'notification':
                    sendNotificationFunction(data.userId, 'you have a notification')
                    break;
                default:
                    console.lo('Unknown message type',data.type)
            }
        })

    
        ws.on('messsage', function sendMessage(data){
            const { senderId, receiptId, messasge: chatMessage} = JSON.parse(data)

            const recieptWS = clients[receiptId]
            if(recieptWS){
                recieptWS.send(JSON.stringify({senderId, message:chatMessage}))
            }
            else{
                console.log(`Client ${receiptId} is not found`)
            }
        } )

        ws.on('close', ()=>{
            delete clients[receiptId]
        })
    })
}




function sendNotification(userId, message){
    const client = clients[userId]
    if(client){
        client.send(JSON.stringify({type:'notification',message}))
    }
}

function sendNotificationFunction(){
    try {
        console.log("this is websocket")
        const sendMessage = {user: 'kdlfr323fsdf', message:'websocket implementation' }
        utilitySocket()
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error
        })
    }
}


initializationSocket()
sendNotificationFunction()