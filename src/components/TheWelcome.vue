<script>
import McvDrawShapes from '@/components/DrawShapes.vue'
import {defineComponent} from 'vue'
import {useStopwatch} from 'vue-timer-hook'

export default defineComponent({
  name: 'McvTheWelcome',
  data() {
    return {
      paintShapes: true,
      workStarted: true,
      darkTheme: true,
      darkModePreference: window.matchMedia('(prefers-color-scheme: light)')
    }
  },
  components: {
    McvDrawShapes
  },
  computed: {
    date() {
      const date = new Date()
      return date.toLocaleDateString()
    }
  },
  setup() {
    const offsetTimestamp = 0
    const autoStart = false
    const stopwatch = useStopwatch(offsetTimestamp, autoStart)
    return {
      stopwatch
    }
  },
  mounted() {
    const file = document.createElement('link')
    file.rel = 'stylesheet'
    file.href = '/src/assets/dark.css'
    file.setAttribute('data-theme', 'dark')
    document.head.append(file)

    const darkModePreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ),
      loaded = document.querySelector('.main__img-bg')

    darkModePreference.addEventListener('change', e => {
      if (e.darkTheme) {
        file.setAttribute('data-theme', 'dark')
        file.href = '/src/assets/dark.css'
      } else {
        file.setAttribute('data-theme', 'light')
        file.href = '/src/assets/light.css'
      }
    })

    window.addEventListener('load', () => {
      setTimeout(() => {
        loaded.classList.add('loaded')
      }, 200)
    })
  },
  methods: {
    drawShapes() {
      const canvas = document.getElementById('canvas')

      this.paintShapes = !this.paintShapes
      if (!this.paintShapes) {
        console.log('PAINTING')

        if (canvas.getContext) {
          const ctx = canvas.getContext('2d')

          ctx.beginPath()
          ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // Внешняя окружность
          ctx.moveTo(110, 75)
          ctx.arc(75, 75, 35, 0, Math.PI, false) // рот (по часовой стрелке)
          ctx.moveTo(65, 65)
          ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // Левый глаз
          ctx.moveTo(95, 65)
          ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // Правый глаз
          ctx.stroke()
        }
      }
    },

    workingDaySwitch() {
      this.workStarted = !this.workStarted
      if (!this.workStarted) {
        this.stopwatch.start()
      } else {
        this.stopwatch.pause()
      }
    },
    prefersColorScheme() {
      this.darkTheme = !this.darkTheme

      const theme = document.head.querySelector('link[data-theme]')

      if (this.darkTheme) {
        theme.setAttribute('data-theme', 'dark')
        theme.href = '/src/assets/dark.css'
      } else {
        theme.setAttribute('data-theme', 'light')
        theme.href = '/src/assets/light.css'
      }
    }
  }
})
</script>

<template>
  <div class="main">
    <div class="main__img-bg"></div>
    <div class="main__filter"></div>
    <div class="main__container">
      <div class="main__col">
        <div class="main__wrapper">
          <div class="main__wrapper__elements">
            <div class="main__blocklogo">
              <a href="https://int-group.ru/" target="_blank">
                <img
                  src="https://static.tildacdn.com/tild3538-6461-4134-b232-623738383034/integro-logo-white.svg"
                  class="main__logo"
                  data-tu-max-width="800"
                  data-tu-max-height="800"
                  data-hook-clogo="coverlogo"
                  alt=""
                  role="presentation"
                />
              </a>
            </div>
            <div class="main__options">
              <form class="main__form" action="">
                <fieldset>
                  <label for="circleRadius">
                    Радиус окружности
                    <input id="circleRadius" value="300" type="number" />
                  </label>
                  <label for="squareSideSize">
                    Размер стороны квадрата
                    <input id="squareSideSize" value="100" type="number" />
                  </label>
                  <label for="coordinatesOfTheSquareX">
                    Координаты квадрата (x, y)
                    <span class="main__form__group">
                      <input
                        id="coordinatesOfTheSquareX"
                        value="0"
                        type="number"
                      />
                      <input
                        id="coordinatesOfTheSquareY"
                        value="0"
                        type="number"
                      />
                    </span>
                  </label>
                  <div class="main__form__button">
                    <button @click="drawShapes" type="button" role="button">
                      Нарисовать
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
            <mcv-draw-shapes />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

@mixin background-options($bgAttachment, $bgImg) {
  width: 100%;
  background-image: url($bgImg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: $bgAttachment;
  text-align: center;
  vertical-align: middle;
}

.main {
  position: relative;
  //overflow: hidden;
  display: flex;
  top: 0;
  height: 100vh;
  min-height: 600px;
  font-family: 'Radio Canada', sans-serif;
  background-color: #000;
  @include background-options(
    fixed,
    'https://static.tildacdn.com/lib/unsplash/5e2702cb-92fc-9c57-45b9-ad35daadb75e/-/resize/20x/photo.jpg'
  );

  &__img-bg {
    opacity: 0;
    width: 100%;
    height: 100%;
    @include background-options(
      scroll,
      'https://static.tildacdn.com/lib/unsplash/5e2702cb-92fc-9c57-45b9-ad35daadb75e/photo.jpg'
    );

    &.loaded {
      opacity: 1;
      transition: opacity 700ms;
    }
  }

  &__filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.7)
    );
  }

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  &__col {
    display: block;
    max-width: 100%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 42px;
    padding-bottom: 42px;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    width: 100%;
    height: 100%;
    text-align: left;
    vertical-align: top;

    &__elements {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
  }

  &__blocklogo {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  &__logo {
    width: auto;
    max-width: 100%;
    vertical-align: middle;
  }

  &__title {
    padding: 180px 0 38px 0;
    font-size: 62px;
    font-family: 'Radio Canada', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 1.17;
    letter-spacing: 0.5px;
    color: #fff;
  }

  &__options {
    padding-top: 38px;
    padding-bottom: 38px;
  }

  &__form {
    fieldset {
      display: flex;
      flex-wrap: wrap;
      margin-right: calc(-3rem * 0.3);
      margin-left: calc(-3rem * 0.3);
    }

    &__group {
      input {
        display: inline-block;
        width: calc(50% - 3rem * 0.3);

        &:last-child {
          float: right;
        }
      }
    }

    label {
      display: flex;
      flex-direction: column;
      flex-basis: 0;
      flex-grow: 1;
      min-width: 0;
      max-width: 100%;
      width: 100%;
      padding-right: calc(3rem * 0.3);
      padding-left: calc(3rem * 0.3);
      font-size: 20px;
      font-weight: 100;
      letter-spacing: 1px;
    }
    input {
      margin-top: 30px;
      padding: 15px 20px;
      border: 1px solid #ff6000;
      border-radius: 5px;
      font-size: 20px;
      color: white;
      background-color: transparent;

      &:focus {
        background-color: rgba(255, 96, 0, 0.15);
      }

      &:invalid {
        background-color: transparent;
      }
    }

    &__button {
      width: 200px;
      margin-top: auto;
      padding-right: calc(3rem * 0.3);
      padding-left: calc(3rem * 0.3);
    }

    button {
      width: 100%;
      padding: 16px 20px;
      border-radius: 5px;
      border: 1px solid #ff6000;
      font-size: 18px;
      color: white;
      letter-spacing: 1px;
      background-color: #ff6000;
      transition: 0.3s ease;

      &:hover {
        background-color: #ff7822;
      }

      &:active {
        background-color: #a13d00;
      }
    }
  }

  &__wrapper-figures {
  }
}
</style>
