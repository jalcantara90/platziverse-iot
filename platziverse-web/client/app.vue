<template>
  <div>
    <!-- <agent uuid="dbde51d0-6454-4fa7-a5b3-221c0abcd147" ></agent> -->
    <metric uuid="467371fa-7e1c-4e9e-99ed-74fd191f667a" 
            type="callbackMetric"
            :socket="socket"></metric>
    <agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid">
    </agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #f8f8f8;
    margin: 0;
  }
</style>
<script>
  const io = require('socket.io-client')
  const socket = io()

  module.exports = {
    data () {
      return {
        agents: [],
        error: null,
        socket
      }
    },

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {

      }
    }
  }

</script>