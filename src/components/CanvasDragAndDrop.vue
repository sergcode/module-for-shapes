<script>
export default {
  name: 'CanvasDragAndDrop',
  methods: {
    dragAndDrop() {
      let canvas = document.getElementById('canvas')

      let offset_x, offset_y

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

      shapes.push({x: 200, y: 50, width: 200, height: 200, color: 'red'})
      shapes.push({x: 10, y: 10, width: 100, height: 100, color: 'green'})

      let is_mouse_in_shape = function(x, y, shape) {
        let shape_left = shape.x,
          shape_right = shape.x + shape.width,
          shape_top = shape.y,
          shape_bottom = shape.y + shape.height

        return (
          x > shape_left && x < shape_right && y > shape_top && y < shape_bottom
        )
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

          startX = mouseX
          startY = mouseY
        }
      }

      canvas.onmousedown = mouse_down
      canvas.onmouseup = mouse_up
      canvas.onmouseout = mouse_out
      canvas.onmousemove = mouse_move
    }
  }
}
</script>
