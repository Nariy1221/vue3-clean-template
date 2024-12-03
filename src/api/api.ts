import { ajaxGet, ajaxPost, ajaxDelete, ajaxPut } from './request'

// ===================================API接口开始======================================================
export const testPost = params => ajaxPost({ url: `setData/`, params })
export const testGet = params => ajaxGet({ url: `getData/`, params })
export const testDelete = params => ajaxDelete({ url: 'deleteData/', params })
export const testPut = params => ajaxPut({ url: 'updateData/', params })

export const getTODO = params =>
    ajaxGet({ url: `https://jsonplaceholder.typicode.com/todos/`, params })
