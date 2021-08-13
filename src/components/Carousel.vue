<template>
    <div class="carousel">
        <div v-if="status === CarouselStatus.NOT_STARTED">Not Started</div>
        <div class="carousel-items" v-for="image in items.images" :key="image.id">
            <img class="carousel-image" :src="image.src" :alt="image.alt" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Carousel } from '../interfaces/Carousel'
import { correctCounter } from '../helpers/correctCounter';

enum CarouselStatus {
    NOT_STARTED,
    STARTED,
    FINISHED
};

export default defineComponent({
    name: "Carousel",
    props: {
        items: {
            type: Object as PropType<Carousel>,
            required: true,
        },
        stop: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            timer: 0,
        }
    },
    methods: {
        next(slides: NodeListOf<Element>, counter: number): void {
            slides[counter].classList.add("hide-slide");
            counter = correctCounter(counter, slides)
            slides[counter].classList.remove("hide-slide");
        },
        prev(): void {

        },
        select(slides: NodeListOf<Element>, selected: number): void {
            for (let i = 0; i < slides.length; i++) {
                if (i === selected) {
                    slides[i].classList.remove("hide-slide");
                    continue;
                }
                slides[i].classList.add("hide-slide");
            }
        },
        handleCarousel(slides: NodeListOf<Element>, counter: number) {
            if (counter === slides.length) {
                this.status = CarouselStatus.FINISHED;
                this.status = CarouselStatus.STARTED;
                return counter = 0;
            }
            this.next(slides, counter);
            this.$emit("next", counter)
            return counter += 1;
        },
        handleInterval(slides: NodeListOf<Element>, counter: number) {
            this.timer = window.setInterval(() => {
                if(this.stop){
                    window.clearInterval(this.timer)
                    return this.handleInterval(slides, counter)
                }
                counter = this.handleCarousel(slides, counter)
            }, this.items.interval)
        }
    },
    setup() {
        const status = ref(CarouselStatus.NOT_STARTED);
        return { status, CarouselStatus };
    },
    mounted() {
        // Start the carousel
        this.status = CarouselStatus.STARTED;

        const slides: NodeListOf<Element> = document.querySelectorAll(".carousel-items");
        for (let i = 0; i < slides.length; i++) {
            if (i === 0) {
                continue;
            }
            slides[i].classList.add("hide-slide");
        }

        let counter: number = 0;
        if (this.status === CarouselStatus.STARTED) {
            this.handleInterval(slides, counter)
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }

})
</script>

<style lang="scss" scoped>
div.carousel {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    div.carousel-items {
        img.carousel-image {
            display: block;
            margin: 0 auto;
            width: 100%;
            border-radius: 3px;
        }
    }
}

div.hide-slide {
    display: none;
}
</style>
