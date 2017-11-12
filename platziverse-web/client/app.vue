<template>
  <div>
    <!-- <agent uuid="dbde51d0-6454-4fa7-a5b3-221c0abcd147" ></agent> -->
    <metric uuid="2d429f2f-2a86-4371-9f9b-b8f8d51fd62e" type="promiseMetric"></metric>
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

  module.exports = {
    data () {
      return {
        agents: [],
        error: null
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