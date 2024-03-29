import httpInstance from '@/utils/http'
/**
 * 获取结算信息
 */
export const getCheckInfoAPI = () => {
    return httpInstance({
        url:'/member/order/pre'
    })
}
export const createOrderAPI = (data) => {
    return httpInstance({
        url: '/member/order',
        method: 'POST',
        data
    })
}