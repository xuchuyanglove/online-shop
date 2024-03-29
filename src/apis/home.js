/**
 * @description: 获取banner图
 * @param {*}
 * @return {*}
 */
import  httpInstance  from '@/utils/http'
export function getBannerAPI (params = {}) {
    // 默认为1 商品为2
    const { distributionSite = '1' } = params
    return httpInstance({
        url: '/home/banner',
        params: {
            distributionSite
        }
    })
}
export function getNewAPI(){
    return httpInstance({
        url:'home/new',
        method:'get',
        data:{}
    })
}

export const getHotAPI = () => {
    return  httpInstance({
        url:'home/hot',
        method:'get',
        data:{}
    })
}

export const getGoodsAPI = () => {
    return httpInstance({
        url: '/home/goods'
    })
}