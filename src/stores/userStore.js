// 管理用户数据相关

import {defineStore} from 'pinia'
import {ref} from 'vue'
import {loginAPI} from '@/apis/user'
import {useCartStore} from "@/stores/cartStore.js";

export const useUserStore = defineStore('user', () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const cartStore  = useCartStore()
    const getUserInfo = async ({account, password}) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.result
    }
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearList()
    }
    // 3. 以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true,
})