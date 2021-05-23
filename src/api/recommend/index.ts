import request from '@/utils/request'
import qs from 'qs'
import {
  getTopListsPayload,
  getRanksPayload,
  getCommentsPayload,
  getImageUrlPayload,
} from './index.d'

//获取首页推荐
export const getRecommend = () => request({ method: 'GET', url: `/getRecommend` })

//获取排行榜单列表
export const getTopLists = (payload: getTopListsPayload) =>
  request({ method: 'GET', url: `/getTopLists?${qs.stringify(payload)}` })

//获取排行榜单详情
export const getRanks = (payload: getRanksPayload) =>
  request({ method: 'GET', url: `/getRanks?${qs.stringify(payload)}` })

//获取评论信息
export const getComments = (payload: getCommentsPayload) =>
  request({ method: 'GET', url: `/getComments?${qs.stringify(payload)}` })

//获取歌曲 + 专辑 图片
export const getImageUrl = (payload: getImageUrlPayload) =>
  request({ method: 'GET', url: `/getImageUrl?${qs.stringify(payload)}` })

//获取票务信息
export const getTicketInfo = () => request({ method: 'GET', url: `/getTicketInfo` })
