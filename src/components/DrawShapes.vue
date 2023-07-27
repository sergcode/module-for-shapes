<template>
  <div class="main__wrapper-figures" ref="parent">
    <canvas id="canvas" v-bind="shapes" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'McvDrawShapes',
  props: {
    axisX: {
      type: Number,
      required: true
    },
    axisY: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      squareCoordinatesX: this.axisX,
      squareCoordinatesY: this.axisY,
      x: 0,
      y: 0,
      isDrawing: false
    }
  },
  methods: {
    drawShapes(radius, squareSideSize, coordinatesX, coordinatesY, strokeFill) {
      const ctx = this.canvas,
        canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height,
        axisX = Math.floor(canvasWidth / 2),
        axisY = Math.floor(canvasHeight / 2)

      ctx.lineWidth = 7
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      this.circle(ctx, axisX, axisY, radius, strokeFill)
      this.square(coordinatesX, coordinatesY, ctx, squareSideSize, strokeFill)
    },

    shapes(valRadius, squareSideSize, coordinatesX, coordinatesY) {
      this.drawShapes(
        valRadius,
        squareSideSize,
        coordinatesX,
        coordinatesY,
        false
      )
    },

    circle(ctx, axisX, axisY, radius, strokeFill) {
      ctx.beginPath()
      ctx.strokeStyle = 'green'
      ctx.fillStyle = 'yellow'
      ctx.arc(axisX, axisY, radius, 0, Math.PI * 2, false)
      this.strokeOrFill(strokeFill, ctx)
    },

    square(axisX, axisY, ctx, squareSideSize, strokeFill) {
      ctx.beginPath()
      ctx.strokeStyle = 'white'
      ctx.fillStyle = 'red'
      ctx.rect(axisX, axisY, squareSideSize, squareSideSize)
      this.strokeOrFill(strokeFill, ctx)
      // this.squareDrawing(axisX, axisY)
      console.log(ctx.canvas.name.square)
    },

    squareDrawing(x1, y1) {
      console.log()
    },

    strokeOrFill(fillCircle, ctx) {
      if (fillCircle) {
        ctx.fill()
      } else {
        ctx.stroke()
      }
    },

    beginDrawing(e) {
      this.x = e.offsetX
      this.y = e.offsetY
      this.isDrawing = true
    },

    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.squareDrawing(this.x, this.y, e.offsetX, e.offsetY)
        this.x = e.offsetX
        this.y = e.offsetY
      }
    },

    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.squareDrawing(this.x, this.y, e.offsetX, e.offsetY)
        this.x = 0
        this.y = 0
        this.isDrawing = false
      }
    }
  },
  mounted() {
    const parent = this.$refs.parent,
      elCanvas = this.$refs.canvas,
      css = getComputedStyle(parent)

    elCanvas.width = parseInt(css.getPropertyValue('width'), 10)
    elCanvas.height = parseInt(css.getPropertyValue('height'), 10)
    this.canvas = elCanvas.getContext('2d')
  }
}
</script>

<style scoped lang="scss">
.main__wrapper-figures {
  position: relative;
  width: 100%;
  height: 100%;
}

#canvas {
  display: block;
  margin: auto;
  border-radius: 5px;
  border: 1px solid #ff6000;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}
</style>
