<template>
  <div class="hello">
    <p>Connection Status: {{connectionStatus}}</p>
    <p>Start button pushed: {{startBtnStatus}}</p>
  </div>
</template>

<script>

export default {
  name: 'mqtt',
  data() {
    return {
      startBtnStatus: false,
      connectionStatus: false
    }
  },
  sockets: {
    connect: function(){
      console.log("socket connection has been established")
      this.connectionStatus = true
    },
    startBtn: function(data){
      this.startBtnStatus = data[0]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
a {
  color: #42b983;
}
</style>
