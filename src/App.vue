<template>
  <div id="app">
    <mqtt/>
  </div>
</template>

<script>
import mqtt from './components/mqtt.vue'

export default {
  name: 'app',
  components: {
    mqtt
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
