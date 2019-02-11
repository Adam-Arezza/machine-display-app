const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const mqtt = require('mqtt')

//The mqtt broker IP and port to connect to
var hmi = {
    host: '192.168.2.162',
    port: 1883
}

//initializing a connection to the HMI Mqtt broker
var client = mqtt.connect(hmi)
var subscribedTopics = []

app.use(cors())
app.use(express.static('./dist'))

function subToTopics(topics){
    topics.forEach(topic => {
        client.subscribe(topic)
    })
}

function startUpConnection(){
    if (client.connected) {
        io.emit('mqttConn', [true])
        client.subscribe("#")
        client.unsubscribe("#")
    }
}

io.on('connection', (socket) => {
    io.emit('browserConn', [true])
    socket.on('brokerConn', () => {
        startUpConnection()
    })
    socket.on('subTopic', topic => {
        subscribedTopics.push(topic)
        subToTopics(subscribedTopics)
    })
    socket.on('reConnect', function(){
        client.reconnect()
        startUpConnection()
    })
})

//on a message event (sent from the hmi to the server)
//the data (message) is relayed to the browser (client) via io.emit
client.on('message', function (topic, message) {
    var data = JSON.parse(message.toString())
    if(subscribedTopics.includes(topic)){
        if(data.d["Part Length"]){
            data.d["Part Length"] = (data.d["Part Length"] * 0.01).toFixed(2)
        }
        io.emit('topicData', data.d)
    }
    if(data.d.topics){
        io.emit('topicList', data.d.topics)
    }
})
server.listen(3000)


