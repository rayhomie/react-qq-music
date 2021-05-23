import request from '@/utils/request'
import qs from 'qs'
import { getMvPlayPayload, getSingerMVPayload } from './index.d'

// 获取MV标签
export const getMvByTag = () => request({ method: 'GET', url: `/getMvByTag` })

// 获取MV播放信息
export const getMvPlay = (payload: getMvPlayPayload) =>
  request({ method: 'GET', url: `/getMvPlay?${qs.stringify(payload)}` })

// 获取歌手MV
export const getSingerMV = (payload: getSingerMVPayload) =>
  request({ method: 'GET', url: `/getSingerMV?${qs.stringify(payload)}` })
