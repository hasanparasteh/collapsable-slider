<template>
    <div @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
        <h4>{{ item.title }}</h4>
        <p v-if="item.expand">{{ item.description }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Collapse } from '../interfaces/Collapse'

export default defineComponent({
    name: "Collapse",
    props: {
        item: {
            type: Object as PropType<Collapse>,
            required: true
        }
    },
    setup(props) {
        return { props }
    }
})
</script>

<style lang="scss" scoped>
div {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    border: 1px solid lightblue;
    border-radius: 3px;
    padding: 10px 25px;
    min-height: 197px;
    margin-bottom: 5px;
}
</style>
