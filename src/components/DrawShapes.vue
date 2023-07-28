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
      squareCoordinatesY: this.axisY
    }
  },
  methods: {
    drawShapes(radius, squareSideSize, coordinatesX, coordinatesY) {
      const ctx = this.canvas,
        canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height,
        axisX = Math.floor(canvasWidth / 2),
        axisY = Math.floor(canvasHeight / 2)

      ctx.lineWidth = 7
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      this.circle(ctx, axisX, axisY, radius)
      this.square(coordinatesX, coordinatesY, ctx, squareSideSize)
      this.dragAndDrop(axisX, axisY, radius, squareSideSize)
    },

    shapes(valRadius, squareSideSize, coordinatesX, coordinatesY) {
      this.drawShapes(valRadius, squareSideSize, coordinatesX, coordinatesY)
    },

    circle(ctx, axisX, axisY, radius) {
      ctx.beginPath()
      ctx.strokeStyle = 'green'
      ctx.arc(axisX, axisY, radius, 0, Math.PI * 2, false)
      ctx.stroke()
    },

    square(axisX, axisY, ctx, squareSideSize) {
      ctx.beginPath()
      ctx.fillStyle = 'white'
      ctx.fillRect(axisX, axisY, squareSideSize, squareSideSize)
    },

    /** Canvas Drag & Drop **/
    dragAndDrop(circleAxisX, circleAxisY, circleRadius, squareSideSize) {
      let canvas = this.canvas.canvas,
        context = canvas.getContext('2d')

      let canvas_width = canvas.width,
        canvas_height = canvas.height,
        offset_x,
        offset_y

      let get_offset = function() {
        let canvas_offsets = canvas.getBoundingClientRect()
        offset_x = canvas_offsets.left
        offset_y = canvas_offsets.top
      }

      get_offset()
      window.onscroll = function() {
        get_offset()
      }
      window.onresize = function() {
        get_offset()
      }
      canvas.onresize = function() {
        get_offset()
      }

      let shapes = []
      let current_shapes_index = null,
        is_dragging = false,
        startX,
        startY

      shapes.push({
        x: this.axisX,
        y: this.axisY,
        width: squareSideSize,
        height: squareSideSize,
        color: 'white'
      })

      let is_mouse_in_shape = function(x, y, shape) {
        let shape_left = shape.x,
          shape_right = shape.x + shape.width,
          shape_top = shape.y,
          shape_bottom = shape.y + shape.height

        return x > shape_left && x < shape_right && y > shape_top && y < shape_bottom
      }

      let mouse_down = function(event) {
        event.preventDefault()

        startX = Math.ceil(event.clientX - offset_x)
        startY = Math.ceil(event.clientY - offset_y)

        let index = 0

        for (let shape of shapes) {
          if (is_mouse_in_shape(startX, startY, shape)) {
            current_shapes_index = index
            is_dragging = true
            return
          }

          index++
        }
      }

      let mouse_up = function(event) {
        if (!is_dragging) {
          return
        }

        event.preventDefault()
        is_dragging = false
      }

      let mouse_out = function(event) {
        if (!is_dragging) {
          return
        }

        event.preventDefault()
        is_dragging = false
      }

      let mouse_move = function(event) {
        if (is_dragging) {
          event.preventDefault()
          let mouseX = Math.ceil(event.clientX - offset_x),
            mouseY = Math.ceil(event.clientY - offset_y)

          let dx = mouseX - startX,
            dy = mouseY - startY

          let current_shape = shapes[current_shapes_index]
          current_shape.x += dx
          current_shape.y += dy

          let sumLessX = circleAxisX - circleRadius,
            sumLessY = circleAxisY - circleRadius,
            sumMoreX = circleAxisX + circleRadius - current_shape.width,
            sumMoreY = circleAxisY + circleRadius - current_shape.height

          if (
            current_shape.x >= sumLessX &&
            current_shape.y >= sumLessY &&
            current_shape.x <= sumMoreX &&
            current_shape.y <= sumMoreY
          ) {
            draw_shapes()
          }

          startX = mouseX
          startY = mouseY
        }
      }

      canvas.onmousedown = mouse_down
      canvas.onmouseup = mouse_up
      canvas.onmouseout = mouse_out
      canvas.onmousemove = mouse_move

      let draw_shapes = () => {
        context.clearRect(0, 0, canvas_width, canvas_height)
        for (let shape of shapes) {
          context.fillRect(shape.x, shape.y, shape.width, shape.height)
        }
        context.strokeStyle = 'green'
        context.arc(circleAxisX, circleAxisY, circleRadius, 0, Math.PI * 2, false)
        context.stroke()
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
