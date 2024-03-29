// 封装购物车模块
import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {useUserStore} from './userStore.js'
import {delCartAPI, findNewCartListAPI, insertCartAPI} from "@/apis/cart.js";

export const useCartStore = defineStore('cart', () => {
    // 1. 定义state - cartList
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    // 2. 定义action - addCart
    const addCart = async (goods) => {
        const {skuId, count} = goods
        // 登录
        if (isLogin.value) {
            // 登录之后的加入购车逻辑
            await insertCartAPI({skuId, count})
            const res = await findNewCartListAPI()
            cartList.value = res.result
        } else {
            // 未登录
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count++
            } else {
                // 没找到
                cartList.value.push(goods)
            }
        }
    }
    const clearList = () => {
        cartList.value = []
    }
    // 删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            // 调用接口实现接口购物车中的删除功能
            await delCartAPI([skuId]);
            const res = await findNewCartListAPI()
            cartList.value = res.result
        } else {
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
    }
    const allCount = computed(() => {
        return cartList.value.reduce((a, b) => {
            return a + b.count
        }, 0)
    })
    const allPrice = computed(() => {
        return cartList.value.reduce((a, b) => {
            return a + b.count * b.price
        }, 0)
    })
    const singleCheck = (skuId, selected) => {
        // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    // 全选功能action
    const allCheck = (selected) => {
        // 把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }
    // 是否全选计算属性
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    // 3. 已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
// 4. 已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        addCart,
        clearList,
        delCart,
        singleCheck,
        allCheck,
        selectedCount,
        selectedPrice,
        updateNewList
    }
})