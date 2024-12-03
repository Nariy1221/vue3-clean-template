<template>
    <div>
        <h1>{{ num }}</h1>
        <button @click="add">增加</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
export default defineComponent({
    setup() {
        interface Calculator {
            // 这里包含了一个 Ref 变量
            num: Ref<number>
            add: () => void
        }
        function useCalculator(): Calculator {

            const num = ref<number>(0);
            function add() {
                num.value++
            }
            return {
                num,
                add
            }
        }
        const { num, add } = useCalculator();
        watchEffect(() => {

        })
        return {
            num,
            add
        }
    }
})
</script>

<style scoped></style>
