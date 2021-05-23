import request from '@/utils/request'

// 获取歌手热门歌曲
export const getRadioLists = () => request({ method: 'GET', url: `/getRadioLists` })
