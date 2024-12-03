import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView/HomeView.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 简单配置
NProgress.inc(0.4)
NProgress.configure({ easing: 'ease', speed: 1000, showSpinner: true })

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/test',
        name: 'test',

        component: () => import('@views/testView/TestTest.vue'),
    },
]

// 路由自动化注册（默认注册到index的children里面）(静态路由优先级高于动态自动路由)
const requireComponent = import.meta.glob('../views/**/*.vue')
// 获取所有文件路径
const names = Object.keys(requireComponent)
console.log(requireComponent, names)

const autoRouters = getAutoRouterList(names)

function getAutoRouterList(names) {
    const routerList = []
    names.forEach((name, index) => {
        if (
            name.indexOf('/components/') == -1 &&
            name != './index.vue' &&
            name != './login.vue'
        ) {
            let isSame = false
            const componentConfig = requireComponent[name]
            const componentName = name.split('/').pop()?.split('.')[0] //根据路径截取name文件名（去除后缀和前面目录）
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].path == '/' || routes[i].path == '/login') {
                    continue
                }
                if (routes[i].name === componentName) {
                    isSame = true
                    break
                }
                if (
                    routes[i].path === '/index' &&
                    routes[i].children.length > 0
                ) {
                    for (let s = 0; s < routes[i].children.length; s++) {
                        if (routes[i].children[s].name === componentName) {
                            isSame = true
                            break
                        }
                    }
                }
            }
            if (!isSame) {
                const path = '/' + componentName
                routerList.push({
                    path: path,
                    name: componentName,
                    component: componentConfig,
                    meta: {
                        requireAuth: true,
                        index: path,
                        keepAlive: true,
                    },
                })
            }
        }
    })
    for (let t = 0; t < routes.length; t++) {
        if (routes[t].path == '/index') {
            routerList.forEach(drouter => {
                routes[t].children.push(drouter)
            })
            break
        }
    }
    console.log(routerList)
    return routerList
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: autoRouters,
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
    // 白名单
    const whiteList = []
    // 进度条
    NProgress.start()
    next()
})
//在路由跳转后用NProgress.done()标记下结束
router.afterEach(() => {
    NProgress.done()
})

export default router
