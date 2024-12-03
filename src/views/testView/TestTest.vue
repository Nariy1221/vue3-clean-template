<template>
    <div id="test">
        <button @click="age++">老了</button>
        <button @click="isMale = !isMale">变性</button>
        <p v-highlight="'red'">{{ name }}</p>
        <p>{{ age }}</p>
        <p :class="{ hasDowm: isMale }">{{ sex }}</p>
        <input type="text" v-model="tagsStr" placeholder="请输入标签，多个标签用英文逗号隔开" />
    </div>
    <mList :id="1" :name="'你说呢？'" @update-id="updateID">
        <template #first>
            <button @click="getTodo">没有内容</button>
        </template>
        <template #second>
            <strong>{{ jsonText }}</strong>
        </template>
    </mList>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watchEffect, computed, watch } from 'vue';
import mList from './components/MultiList.vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { getTODO } from '@/api/api';
import { getCurrentTimestamp } from '@/utils/util';
// import { useMsgStore } from '@stores/counter.ts'

interface Person {
    name: string,
    age: number,
    isMale?: string | boolean
}

export default defineComponent({
    components: {
        mList
    },
    directives: {
        highlight(el, binding) {
            el.style.backgroundColor =
                typeof binding.value === 'string' ? binding.value : 'unset'
        },
    },
    setup() {
        const obj: Person = reactive({
            name: 'Hua',
            age: 25,
            isMale: true
        })
        // const newObj = obj;
        // newObj.name = 'Yiran'
        const sex = computed(() => {
            return obj.isMale ? '男的' : '女的'
        })

        const tags = ref<string[]>([])
        const tagsStr = computed({
            get() {
                return tags.value.join(',')
            },
            set(newValue: string) {
                tags.value = newValue.split(',')
            },
        })
        const test = ref({
            Hname: 'Hua',
            age: 24
        })
        let { Hname } = test.value
        console.log(Hname)
        Hname = 'Yiran';
        console.log(test.value)
        watch(() => obj.isMale, () => {
            console.log(`性别是：${obj.isMale}`)
        },
            {
                immediate: true,
                deep: true
            })

        watchEffect(() => {
            console.log(obj.age)
        })


        function updateID(msg: number) {
            console.log(msg)
        }
        type respType = {
            userId: number,
            id: number,
            title: string,
            completed: boolean
        }
        const jsonText = reactive<respType>({
            userId: 0,
            id: 0,
            title: "0",
            completed: false
        })
        console.log(getCurrentTimestamp())
        async function getTodo() {
            try {
                const data = await getTODO({ id: 1 }) as respType;

                jsonText.userId = data.userId;
                jsonText.id = data.id;
                jsonText.title = data.title;
                jsonText.completed = data.completed;

                console.log(jsonText);

            } catch (err) {
                console.error(err);
            }
        }

        const router = useRouter();
        onBeforeRouteLeave((to, from) => {
            console.log(to, from, router)
        })

        // const store = useMsgStore()
        // console.log(store)

        return {
            sex,
            ...toRefs(obj),
            tags,
            tagsStr,
            updateID,
            getTodo,
            jsonText
        };
    }
})
</script>
<style scoped>
/* ... */
</style>
