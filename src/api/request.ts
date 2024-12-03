import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessageBox, ElNotification } from 'element-plus'

import { url } from '@/api/url'
import { getStorage } from '@/utils/util'

const request = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    timeout: 20000,
})
// 拦截器：请求
request.interceptors.request.use(config => {
    const token = getStorage('logintoken')
    if (token) {
        config.headers.Authorization = `JWT ${token}`
    }
    return config
})

// 拦截器：响应
request.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.data?.code === 4001) {
            handleAuthError()
        }
        return Promise.reject(error)
    },
)
// 请求配置类型
interface RequestConfig extends AxiosRequestConfig {
    url: string
    method?: string
    params?: Record<string, any>
    data?: Record<string, any>
}
// 配置生成
function generateConfig(opt: RequestConfig): RequestConfig {
    let params = {}
    const method = opt.method.toUpperCase()
    if (Object.prototype.toString.call(opt.params) != '[object FormData]') {
        // 不是formdata类型
        params = JSON.parse(JSON.stringify(opt.params))
    } else {
        //formdata类型
        params = opt.params
    }

    return {
        url: `${opt.url}${params.id ? `/${params.id}/` : ''}`,
        method,
        params: method === 'GET' ? params : undefined,
        data: method !== 'GET' ? params : undefined,
    }
}

// 主函数
async function ajax<T>(opt: RequestConfig): Promise<T> {
    try {
        const config: RequestConfig = generateConfig(opt)
        console.log(config)
        const res: AxiosResponse<T> = await request(config)
        return res.data
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

function handleAuthError() {
    ElMessageBox.alert('登录信息失效,请重新登录！', '登录失效', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: () => {
            localStorage.clear()
            sessionStorage.clear()
            window.location.href = '/'
        },
    })
}

function handleApiError(res) {
    if (res.response?.data?.data?.error_code) {
        ElNotification({
            title: res.response.data.data.error_msg,
            message: '请点击右上角个人中心进行设置！如有疑问请联系管理员',
            type: 'error',
            position: 'bottom-right',
            offset: 20,
        })
    }
}

// 包装 GET, POST, PUT, DELETE 请求
export function ajaxGet<T>(config: RequestConfig): Promise<T> {
    return ajax<T>({ ...config, method: 'GET' })
}

export function ajaxPost<T>(config: RequestConfig): Promise<T> {
    return ajax<T>({ ...config, method: 'POST' })
}

export function ajaxPut<T>(config: RequestConfig): Promise<T> {
    return ajax<T>({ ...config, method: 'PUT' })
}

export function ajaxDelete<T>(config: RequestConfig): Promise<T> {
    return ajax<T>({ ...config, method: 'DELETE' })
}
