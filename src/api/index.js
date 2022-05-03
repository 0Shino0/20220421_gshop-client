/* 
包含应用的所有接口的接口请求函数
    函数内部调用ajax函数发送请求
    函数的返回的是promise对象
*/
import ajax from './ajax'
import mockAjax from './mockAjax'

/* 
首页三级分类
/api/product/getBaseCategoryList    GET
*/

export function reqCategoryList(){
    // return ajax.get('/product/getBaseCategoryList')
    // return ajax('/product/getBaseCategoryList')     //发不带参数的get请求
    return ajax({
        url:'/product/getBaseCategoryList',
        // method:'get'     //
    })
}


/* mock模拟数据 */
/* 
获取首页广告轮播列表
/api/cms/banner GET
*/
export const reqBannerList = () => ajax('/cms/banner')

/* 
mock接口函数
*/
export const reqRecommends = () => mockAjax('/recommends')

/* 

*/
export const reqFloors = () => mockAjax('/floors')

export const reqRanks = () => mockAjax('/ranks')

export const reqLikes = () => mockAjax('/likes')

// reqFloors().then(result => {
//     console.log('result--',result);
// })

/* 
搜索页面
/api/list   POST
searchParams
*/
export const reqSearch = (searchParams) => ajax.post('/list',searchParams)



 