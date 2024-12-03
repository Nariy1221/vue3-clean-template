/// <reference types="vite/client" />
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<object, object, any>
    export default component
}
declare module '*.ts' {
    const plugins: { [key: string]: string }
    export default plugins
}
