export type getSmartboxPayload = {
  key: string //搜索关键字
}

export type getSearchByKeyPayload = {
  key: string //搜索关键字
  remoteplace?: string //默认值为 song;单曲: song;专辑: album;MV: mv;歌单: playlist;用户: user;歌词: lyric
  page?: number //当前页数, 默认为 1
  limit?: number //取出歌单数量, 默认为 10
}
