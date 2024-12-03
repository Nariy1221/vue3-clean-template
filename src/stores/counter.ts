import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }

    return { count, doubleCount, increment }
})

export const useMsgStore = defineStore('message', {
    state() {
        return {
            msg: '你说呢',
            randomMsg: ['你', '说', '呢'],
        }
    },
})
