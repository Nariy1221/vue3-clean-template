import mitt from 'mitt'
import type { Emitter } from 'mitt' // 使用 type 声明导入类型

// 定义事件的类型
type Events = Record<string, any> // key 为事件名，value 为事件参数

const emitter: Emitter<Events> = mitt<Events>()

export default {
    $on: <T extends keyof Events>(
        type: T,
        handler: (event: Events[T]) => void,
    ) => emitter.on(type, handler),
    $emit: <T extends keyof Events>(type: T, event: Events[T]) =>
        emitter.emit(type, event),
    $off: <T extends keyof Events>(
        type: T,
        handler?: (event: Events[T]) => void,
    ) => emitter.off(type, handler),
}
