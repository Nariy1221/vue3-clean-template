import appConfig from '@/config'

const commonVal = {
    isPhone: /^[1][3-9]\d{9}$/, // 手机号码
    isPrice: /^(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)$/, //money
    isTel: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/, // 手机号码，座机
    isAgentAccount: /^[a-zA-Z0-9]+$/, //agentAccount
    isEmail:
        /^([a-zA-Z0-9]+[|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/,
}

/**
 * 颜色反转
 * @param hex 颜色值(如：#ffffff)
 * @param bw 黑白
 * @return string 16进制反色颜色值
 */
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1)
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.')
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16)
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF'
    }
    // invert color components
    r = (255 - r).toString(16).padStart(2, '0')
    g = (255 - g).toString(16).padStart(2, '0')
    b = (255 - b).toString(16).padStart(2, '0')
    // pad each with zeros and return
    return '#' + r + g + b
}
/**
 *  格式化文件大小
 * @param bytes 单位为字节
 * @param decimals  保留小数点后几位
 * @returns
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
    )
}
/**
 * 时间戳格式化
 * @param {*} date  时间戳
 * @param {*} format  目标格式
 * @returns 格式化后的时间 如：2021-01-01 12:00:00
 */
function formatDate(
    date: Date | number,
    format: string = 'yyyy-MM-dd HH:mm:ss',
): string {
    const d = new Date(date)
    const year = String(d.getFullYear())
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')

    return format
        .replace('yyyy', year)
        .replace('MM', month)
        .replace('dd', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds)
}

/**
 * 字符串转时间戳
 * @param dateStr 日期字符串
 * @returns  时间戳
 */
function dateToTimestamp(dateStr: string): number {
    const date = new Date(dateStr)
    return date.getTime()
}
/**
 *
 * @param dateStr 日期字符串
 * @returns  日期对象
 */
function stringToDate(dateStr: string): Date {
    const [datePart, timePart] = dateStr.split(' ')
    const [year, month, day] = datePart.split('-').map(Number)
    const [hour, minute, second] = timePart.split(':').map(Number)
    return new Date(year, month - 1, day, hour, minute, second)
}

/**
 *
 * @returns  当前时间戳
 */
function getCurrentTimestamp(): number {
    return Date.now()
}

/**
 *
 * @param date 日期对象
 * @returns  是否是今天
 */
function isToday(date: Date): boolean {
    const today = new Date()
    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    )
}

/**
 *
 * @param date1 日期1
 * @param date2  日期2
 * @returns  两个日期相差的天数(2-1)
 */
function daysBetweenDates(date1: string, date2: string): number {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const timeDiff = Math.abs(d2.getTime() - d1.getTime())
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) // 转换为天
}

/**
 * 设置本地存储
 * @param key 键值
 * @param data 数据
 */
function setStorage(key, data) {
    appConfig.STORAGE_METHOD === 'localStorage'
        ? localStorage.setItem(key, data)
        : sessionStorage.setItem(key, data)
}
/**
 *  获取本地存储
 * @param key 键值
 * @returns
 */
function getStorage(key) {
    const result =
        appConfig.STORAGE_METHOD === 'localStorage'
            ? localStorage.getItem(key)
            : sessionStorage.getItem(key)
    return result
}
/**
 * 使用Json方法深拷贝
 * @param data 数据
 * @returns
 */
function deepClone(data) {
    if (data) {
        return JSON.parse(JSON.stringify(data))
    }
    return data
}
export {
    commonVal,
    invertColor,
    formatBytes,
    formatDate,
    dateToTimestamp,
    stringToDate,
    getCurrentTimestamp,
    isToday,
    daysBetweenDates,
    setStorage,
    getStorage,
    deepClone,
}
