// import.meta.env.VITE_XXXX 是读取的根目录下.env中的配置

// 环境变量
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN || '127.0.0.1:8000'
const API_URL =
    import.meta.env.MODE === 'development'
        ? `http://127.0.0.1:8000`
        : `https://${API_DOMAIN}`

console.log(import.meta.env.MODE)
// 全局配置
export default {
    // App 信息
    APP_VER: __APP_VER__,
    APP_NAME: __APP_NAME__,
    APP_DESCRIPTION: __APP_DESC__,
    APP_TITLE: `${__APP_NAME__} v${__APP_VER__}`,

    // API 配置
    API_DOMAIN,
    API_URL,

    // UI 配置
    LANG: import.meta.env.VITE_LANG || 'zh-cn',
    ELEMENT_SIZE: import.meta.env.VITE_ELEMENT_SIZE || 'default',
    ELEMENT_ZINDEX: parseInt(import.meta.env.VITE_ELEMENT_ZINDEX || 3000, 10),
    ELEMENT_BUTTON: import.meta.env.VITE_ELEMENT_BUTTON === 'true',

    // 菜单和主题配置
    MENU_WIDTH: parseInt(import.meta.env.VITE_MENU_WIDTH || 185, 10),
    MENU_HEADER_COLOR: import.meta.env.VITE_MENU_HEADER_COLOR || '#101c33',
    COLOR: import.meta.env.VITE_COLOR || '#409EFF',
    THEME: import.meta.env.VITE_THEME || 'light',

    // 本地存储方式
    STORAGE_METHOD: import.meta.env.VITE_STORAGE_METHOD || 'localStorage',
}
