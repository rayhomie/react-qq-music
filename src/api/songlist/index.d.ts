export type optionalPayload = {
  page?: number // 默认1
  limit?: number // 默认20
  sortId?: number // 默认5
}

export type getSongListsPayload = optionalPayload & {
  categoryId: number
  /*
   sortId: 1, sortName: 默认
   sortId: 2, sortName: 最新
   sortId: 3, sortName: 最热
   sortId: 4, sortName: 评分
   sortId: 5, sortName: none
   */
}

export type batchGetSongListsPayload = optionalPayload & {
  categoryIds: number[]
}

export type getSongListDetailPayload = {
  disstid: number // 歌单id
}
