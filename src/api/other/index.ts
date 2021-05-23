import request from '@/utils/request'
import qs from 'qs'
import { getSmartboxPayload, getSearchByKeyPayload } from './index.d'

//
export const downloadQQMusic = () => request({ method: 'GET', url: `/downloadQQMusic` })

//获取搜索热词
export const getHotkey = () => request({ method: 'GET', url: `/getHotkey` })

//获取关键字搜索提示
export const getSmartbox = (payload: getSmartboxPayload) =>
  request({ method: 'GET', url: `/getSmartbox?${qs.stringify(payload)}` })

//获取搜索结果
export const getSearchByKey = (payload: getSearchByKeyPayload) =>
  request({ method: 'GET', url: `/getSearchByKey?${qs.stringify(payload)}` })
