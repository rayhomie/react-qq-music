import request from '@/utils/request'
import qs from 'qs'
import { getSongListsPayload, batchGetSongListsPayload, getSongListDetailPayload } from './index.d'

// 获取歌单分类
export const getSongListCategories = () => request({ method: 'GET', url: `/getSongListCategories` })

// 获取歌单列表
export const getSongLists = (payload: getSongListsPayload) =>
  request({ method: 'GET', url: `/getSongLists?${qs.stringify(payload)}` })

// 批量获取歌单列表
export const batchGetSongLists = (payload: batchGetSongListsPayload) =>
  request({ method: 'POST', url: `/batchGetSongLists?`, data: payload })

// 获取歌单详情
export const getSongListDetail = (payload: getSongListDetailPayload) =>
  request({ method: 'GET', url: `/getSongListDetail?${qs.stringify(payload)}` })
