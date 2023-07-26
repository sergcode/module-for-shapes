<template>
  <svg :height="radius * 2" :width="radius * 2">
    <circle
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{strokeDashoffset: 0}"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
    <circle
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{
        strokeDashoffset: strokeDashoffset,
        stroke: strokeColor
      }"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
  </svg>
</template>

<script>
export default {
  name: 'McvProgressRing',
  props: {
    radius: {
      type: Number,
      required: true
    },
    progress: {
      type: Number,
      required: true
    },
    stroke: {
      type: Number,
      required: true
    },
    strokeColor: {
      type: String,
      required: false,
      default: '#acd91c'
    },
    progressNum: {
      type: Number,
      required: false
    }
  },
  data() {
    const normalizedRadius = this.radius - this.stroke * 2
    const circumference = normalizedRadius * 2 * Math.PI

    return {
      normalizedRadius,
      circumference
    }
  },
  computed: {
    strokeDashoffset() {
      return this.circumference - (this.progress / 100) * this.circumference
    }
  }
}
</script>

<style scoped lang="scss">
.circular-progress-bar {
  svg {
    z-index: 1000;
    position: relative;
    width: 134px;
    height: 134px;

    circle {
      width: 100%;
      height: 100%;
      fill: transparent;
      stroke-width: 10;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;

      &:last-child {
        transition: stroke-dashoffset 1s;
        stroke-linecap: round;
      }

      &:first-child {
        stroke: var(--color-circular-progress-bar-static);

        transition: stroke var(--duration) var(--timing);
      }
    }
  }
}
</style>
