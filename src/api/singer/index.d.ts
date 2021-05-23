export type getSingerHotsongPayload = {
  singermid: number // 歌手id
  page?: number // 页数, 默认为0
  limit?: number // 取出歌单数量, 默认为5
}

export type getSimilarSingerPayload = {
  singermid: number // 歌手id
}

export type getSingerDescPayload = {
  singermid: number // 歌手id
}

export type getSingerListPayload = {
  /*"id": -100, "name": "全部" "id": 200, "name": "内地" "id": 2, "name": "港台" "id": 5, "name": "欧美" "id": 4, "name": "日本" "id": 3, "name": "韩国" "id": 6, "name": "其他"*/
  area?: number // 默认是 -100
  /*"id": -100,"name": "全部" "id": 1,"name": "流行" "id": 6,"name": "嘻哈" "id": 2,"name": "摇滚" "id": 4,"name": "电子" "id": 3,"name": "民谣" "id": 8,"name": "R&B" "id": 10,"name": "民歌" "id": 9,"name": "轻音乐" "id": 5,"name": "爵士" "id": 14,"name": "古典" "id": 25,"name": "乡村" "id": 20,"name": "蓝调" */
  genre?: number // 默认是 -100
  /*"id": -100,"name": "热门" "id": 1,"name": "A" "id": 26,"name": "Z" "id": 27,"name": "#"*/
  index?: number // 默认是 -100
  /*"id": -100,"name": "全部" "id": 0,"name": "男" "id": 1,"name": "女" "id": 2,"name": "组合"*/
  sex?: number // 默认是 -100
}

export type getSingerStarNumPayload = {
  singermid: number // 歌手id
}
