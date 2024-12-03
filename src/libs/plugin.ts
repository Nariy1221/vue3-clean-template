import type { App } from 'vue'

// 插件选项的类型
interface Options {
    // 文本高亮选项
    highlight?: {
        // 默认背景色
        backgroundColor: string
    }
}
export default {
    install(app: App, options?: Options) {
        /**
         *
         */
        app.directive('permission', (el, binding) => {
            if (binding.value === 1) return

            if (el.parentNode) {
                el.parentNode.removeChild(el)
            } else {
                el.style.display = 'none'
            }
        })

        app.directive('hightlight', (el, binding) => {
            let defaultColor = 'unset'
            if (
                Object.prototype.toString.call(options) === '[object Object]' &&
                options?.highlight?.backgroundColor
            ) {
                defaultColor = options.highlight.backgroundColor
            }

            el.style.backgroundColor =
                typeof binding.value === 'string' ? binding.value : defaultColor
        })
    },
}
