<template>
  <div class="main__wrapper-figures" ref="parent">
    <canvas
      id="canvas"
      @mousedown="beginDrawing"
      @mousemove="keepDrawing"
      @mouseup="stopDrawing"
      ref="canvas"
    />
  </div>
</template>

<script>
export default {
  name: 'McvDrawShapes',
  data() {
    return {
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null
    }
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas
      ctx.beginPath()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 1
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.closePath()
    },
    beginDrawing(e) {
      this.x = e.offsetX
      this.y = e.offsetY
      this.isDrawing = true
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY)
        this.x = e.offsetX
        this.y = e.offsetY
      }
    },
    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY)
        this.x = 0
        this.y = 0
        this.isDrawing = false
      }
    }
  },
  mounted() {
    const elCanvas = this.$refs.canvas,
      parent = this.$refs.parent,
      css = getComputedStyle(parent)
    elCanvas.width = parseInt(css.getPropertyValue('width'), 10)
    elCanvas.height = parseInt(css.getPropertyValue('height'), 10)
    this.canvas = elCanvas.getContext('2d')
  }
}
</script>

<style scoped lang="scss">
.main__wrapper-figures {
  width: 100%;
  height: 100%;
}

#canvas {
  display: block;
  margin: auto;
  border-radius: 5px;
  border: 1px solid #ff6000;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
