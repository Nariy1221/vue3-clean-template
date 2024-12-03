<template>
    <div class="multiList-block">
        <slot name="second"></slot>
        <p :style="{ 'color': 'red' }">内容是{{ name }}</p>
        <slot name="first"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        id: Number,
        name: String
    },
    emits: {
        'update-id': (id: number) => {
            console.log(`id:${id}`)
            if (id < 10) {
                console.log('限定用户');
                return true;
            }
            return false;
        }
    },
    setup(props, { emit }) {
        console.log(props);
        let id = props.id as number
        emit('update-id', ++id);
    }

})
</script>

<style scoped>
.multiList-block {
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: #000;
    border: 2px solid #000;
    background-color: aliceblue;
}
</style>
