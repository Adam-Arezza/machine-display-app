<template>
  <div class="machineMonitor">
    <div id="connections">
      <p v-bind:class="[client_server ? 'isConnected' : 'notConnected']">Client-Server Socket connection: {{client_server}}</p>
      <p v-bind:class="[mqttConnection ? 'isConnected' : 'notConnected']">Mqtt Broker Connection Status: {{mqttConnection}}</p>
      <br>
      <button @click="reConnect">Re-Connect</button>
    </div>
    <div>
      <button @click="hidden = !hidden">Toggle list</button>
      <div v-if="topicList">
        <ul v-if="hidden == false">
        <li v-for="(topic,index) in topicList" :key="index">
          {{topic.topic}}
          <button v-if="subscribed[index] != topic.topic" @click="subTopic(topic.topic)">Subscribe to topic</button>
          <button v-if="subscribed[index] == topic.topic" @click="unsubTopic(topic.topic)">Unsubscribe from topic</button>
        </li>
      </ul>
      </div>
      <div class="machineParams" v-if="topicParams">
        <ul>
          <li v-for="(name, index) in topicParams" :key="index">
            <h4>{{index}}</h4>
            <p>{{name.toString()}}<p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mqtt',
  data() {
    return {
      mqttConnection: false,
      client_server: false,
      topicList: undefined,
      topicParams:{},
      subscribed: [],
      hidden: false
    }
  },
  sockets: {
    browserConn: function(message){
      // console.log("browserConn event sent by server")
      this.client_server = message[0]
      this.$socket.emit('brokerConn')
    },
    mqttConn: function(message){
      // console.log("socket connection has been established")
      this.mqttConnection = message[0]
    },
    topicData: function(data){
      console.log(data)
      this.topicParams = data
    },
    topicList: function(topics){
      this.topicList = topics
    }
  },
  methods: {
    subTopic(topic){
      console.log("Subscribing to this topic: ", topic)
      this.$socket.emit('subTopic', topic)
      this.subscribed.push(topic)
    },
    unsubTopic(topic){
      this.$socket.emit('unSub', topic)
      console.log("Unsubscribing from the topic: ", topic)
    },
    reConnect(){
      this.$socket.emit('reConnect')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#connections {
  text-align: left;
  font-size: 14px;
  background: rgb(236, 236, 236);
}

.isConnected{
  color: #42b983;
}

.notConnected{
  color: rgb(214, 18, 18);
}

.machineParams{
  font-size: 18px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
