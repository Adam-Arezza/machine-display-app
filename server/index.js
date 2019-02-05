const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
var mqtt = require('mqtt')

//The mqtt broker IP and port to connect to
var hmi = {
  host: '192.168.2.162',
  port: 1883
}

//initializing a connection to the HMI Mqtt broker
var client = mqtt.connect(hmi)

//creating a connection between the express server and the HMI mqtt broker
//io.emit allows an event and data to be sent to the client through the socket connection
client.on('connect', function(){
    if(client.connected){
        io.emit('clientConn', [true])
    }
})

//subscribing the server to the hmi topics
client.subscribe({
    'HMITopics' : 0,
    'startBtn' : 0
}, {}, function(err, granted){
    if(err){
        console.log(err)
    }
    if(granted){
        // console.log(granted)
    }
} )

//on a message event (sent from the hmi to the server)
//the data (message) is relayed to the browser (client) via io.emit
client.on('message', function(topic,message,packet){
    // console.log(topic)
    var data = JSON.parse(message.toString())
    // console.log(data.d)
    if(data.d.startLine){
        io.emit('startBtn', data.d.startLine)
        //console.log(data.d.startLine)
    }
})

app.use(cors())
app.use(express.static('./dist'))

io.on('connection', () => {
    console.log('Listening on port 3000!')
})
server.listen(3000)

