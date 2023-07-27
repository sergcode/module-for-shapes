<script>
import McvDrawShapes from '@/components/DrawShapes.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'McvTheWelcome',
  data() {
    return {
      radiusCircle: 100,
      squareSideSize: 80,
      coordinatesX: 0,
      coordinatesY: 0
    }
  },
  components: {
    McvDrawShapes
  },
  methods: {
    drawShapes(e) {
      this.$refs.drawFigures.shapes(
        this.radiusCircle,
        this.squareSideSize,
        this.coordinatesX,
        this.coordinatesY
      )

      e.preventDefault()
    }
  },
  mounted() {
    const loaded = document.querySelector('.main__img-bg')
    window.addEventListener('load', () => {
      setTimeout(() => {
        loaded.classList.add('loaded')
      }, 200)
    })

    const canvas = document.getElementById('canvas'),
      canvasWidth = canvas.getAttribute('width'),
      canvasHeight = canvas.getAttribute('height'),
      axisX = Math.floor(canvasWidth / 2),
      axisY = Math.floor(canvasHeight / 2)

    this.coordinatesX = Math.floor(axisX - this.squareSideSize / 2)
    this.coordinatesY = Math.floor(axisY - this.squareSideSize / 2)
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
              <div class="main__tabs">
                <button class="main__btn-draw-shapes active" role="button">
                  Создать фигуры
                </button>
                <button class="main__btn-draw" role="button">
                  Рисовать мышью
                </button>
              </div>
            </div>
            <div class="main__draw-shapes">
              <div class="main__options">
                <form class="main__form" role="form">
                  <fieldset>
                    <label for="circleRadius">
                      Радиус окружности / px
                      <input
                        id="circleRadius"
                        ref="circleRadius"
                        v-model.number="radiusCircle"
                        type="number"
                        min="0"
                      />
                    </label>
                    <label for="squareSideSize">
                      Размер стороны квадрата / px
                      <input
                        id="squareSideSize"
                        ref="squareSideSize"
                        v-model.number="squareSideSize"
                        type="number"
                        min="0"
                      />
                    </label>
                    <label for="coordinatesOfTheSquareX">
                      Координаты квадрата (x, y)
                      <span class="main__form__group">
                        <input
                          id="coordinatesOfTheSquareX"
                          ref="coordinatesOfTheSquareX"
                          v-model.number="coordinatesX"
                          type="number"
                          min="0"
                        />
                        <input
                          id="coordinatesOfTheSquareY"
                          ref="coordinatesOfTheSquareY"
                          v-model.number="coordinatesY"
                          type="number"
                          min="0"
                        />
                      </span>
                    </label>
                    <div class="main__form__button">
                      <button @click="drawShapes" type="button" role="button">
                        Создать фигуры
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
              <mcv-draw-shapes
                :axis-x="+coordinatesX"
                :axis-y="+coordinatesY"
                ref="drawFigures"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

@mixin button($width, $color: #ff6000, $colorText: white) {
  width: $width;
  padding: 16px 20px;
  border-radius: 5px;
  border: 1px solid $color;
  text-align: center;
  font-size: 18px;
  color: $colorText;
  letter-spacing: 1px;
  background-color: $color;
  transition: 0.3s ease;

  &:hover {
    background-color: #ff7822;
  }

  &:active {
    background-color: #a13d00;
  }
}

.main {
  position: relative;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;

    button {
      opacity: 0.6;
      @include button(250px, white, black);
      transition: 0.3s ease;

      &:first-child {
        margin-right: calc(3rem * 0.6);
      }

      &:hover {
        opacity: 1;
        background-color: white;
      }

      &.active {
        opacity: 1;
        background-color: white;
      }
    }
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
      font-size: 18px;
      font-weight: 100;
      letter-spacing: 1px;
      color: white;
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
        background-color: rgba(255, 255, 255, 0.15);
      }

      &:invalid {
        background-color: transparent;
      }
    }

    &__button {
      width: 250px;
      margin-top: auto;
      padding-right: calc(3rem * 0.3);
      padding-left: calc(3rem * 0.3);
    }

    button {
      @include button(100%);
    }
  }

  &__draw-shapes {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}
</style>
