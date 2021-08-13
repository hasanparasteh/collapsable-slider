<template>
  <div class="container">
    Interval Stop Status: {{ stop }}
    <div class="row">
      <div>
        <Collapse
          v-for="item in information"
          :key="item.title"
          :item="item"
          @mouseenter="setStop"
          @mouseleave="setStart"
        />
      </div>
      <div>
        <CarouselComponent @next="next" :items="{ images, interval }" v-model:stop="stop" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CarouselComponent from './components/Carousel.vue'
import Collapse from './components/Collapse.vue'
import { correctCounter } from './helpers/correctCounter'

export default defineComponent({
  name: 'App',
  components: {
    CarouselComponent,
    Collapse
  },
  data() {
    return {
      images: [
        { id: 0, src: "http://topwaymaterials.com/images/assets/landscapes/landscape-1-800x600.jpg", alt: "hunted-house" },
        { id: 1, src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/800x600_Wallpaper_Blue_Sky.png", alt: "painted-sun" },
        { id: 2, src: "https://cdn.wallpapersafari.com/2/29/fdr5Z7.jpg", alt: "field-home" }
      ],
      information: [
        { expand: true, title: 'hello world', description: 'this is a sample description' },
        { expand: false, title: 'hello world', description: 'this is a sample description' },
        { expand: false, title: 'hello world', description: 'this is a sample description' },
      ],
      interval: 5000,
      stop: false,
    }
  },
  methods: {
    next(counter: number) {
      this.information[counter].expand = false
      counter = correctCounter(counter, this.information)
      this.information[counter].expand = true
    },
    setStop() {
      this.stop = true;
    },
    setStart() {
      this.stop = false
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

div.container {
  display: block;
  max-width: 1150px;
  margin: 25px auto;
}

div.row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

div.row > div {
  flex: 1 1 auto;
  margin: 5px;
}
</style>
