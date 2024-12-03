import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import legacy from '@vitejs/plugin-legacy'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
    define: {
        __APP_NAME__: JSON.stringify(packageJson.name),
        __APP_VER__: JSON.stringify(packageJson.version),
        __APP_DESC__: JSON.stringify(packageJson.description),
    },
    plugins: [
        vue(),
        vueJsx(),
        vueDevTools(),
        legacy({
            targets: [
                'android <= 9',
                'chrome <= 60',
                'safari <=10',
                'ios <= 10',
                'edge <=13',
            ],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            polyfills: true,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve('src'), // 源码根目录
            '@img': resolve('src/assets/img'), // 图片
            '@less': resolve('src/assets/less'), // 预处理器
            '@libs': resolve('src/libs'), // 本地库
            '@stores': resolve('src/stores'), // 本地库
            '@plugins': resolve('src/plugins'), // 本地插件
            '@cp': resolve('src/components'), // 公共组件
            '@views': resolve('src/views'), // 路由组件
        },
    },
})
