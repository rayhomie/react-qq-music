export type getMvPlayPayload = {
  vid: string | id // video id
}

export type getSingerMVPayload = {
  singermid: number // 歌手id
  order?: 'all' | 'listen' // 当前MV类型, 默认为all;listen: 歌手专辑音乐MV;all: 粉丝上传MV视频
  limit?: number // 取出歌单数量 默认为5
}
