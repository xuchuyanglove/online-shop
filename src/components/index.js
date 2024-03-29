import ImageView from '@/components/ImageView/index.vue'
import Sku from '@/components/XtxSku/index.vue'
export const componentPlugin = {
    install (app) {
        // app.component('组件名字'，组件配置对象)
        app.component('ImageView', ImageView)
        app.component('Sku', Sku)
    }
}