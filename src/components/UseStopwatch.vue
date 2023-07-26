<template>
  <div>
    <div>
      <span>{{ stopwatch.hours }}</span>
      :
      <span>{{ stopwatch.minutes }}</span>
      :
      <span>{{ stopwatch.seconds }}</span>
    </div>
    <p>{{ stopwatch.isRunning ? 'Running' : 'Not running' }}</p>
    <button @click="stopwatch.start()">Start</button>
    <button @click="stopwatch.pause()">Pause</button>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {useStopwatch} from 'vue-timer-hook'

export default defineComponent({
  name: 'McvUseStopwatch',
  setup() {
    const offsetTimestamp = 0
    const autoStart = false
    const stopwatch = useStopwatch(offsetTimestamp, autoStart)
    return {
      stopwatch,
    }
  },
})
</script>
