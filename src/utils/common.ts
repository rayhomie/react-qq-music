export { debounce, throttle } from 'lodash-es'

// 浏览器进入全屏
export function launchFullscreen(element: any) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

// 浏览器退出全屏
export function exitFullscreen(element: any) {
  if (element.exitFullscreen) {
    element.exitFullscreen()
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen()
  } else if (element.webkitExitFullscreen) {
    element.webkitExitFullscreen()
  }
}

export function isFullScreen(element: any) {
  return (
    element.fullscreenEnabled || element.mozFullScreenEnabled || element.webkitFullscreenEnabled
  )
}

//数字转单位
export const numberFormat = function (value: number) {
  var param = { value: 0, unit: '' }
  var k = 10000,
    sizes = ['', '万', '亿', '万亿'],
    i
  if (value < k) {
    param.value = value
    param.unit = ''
  } else {
    i = Math.floor(Math.log(value) / Math.log(k))

    param.value = +(value / Math.pow(k, i)).toFixed(1)
    param.unit = sizes[i]
  }
  return param.value + param.unit
}

//秒转分钟
export function s_to_hs(s: number) {
  let h: number
  h = Math.floor(s / 60)
  s = s % 60
  let ch = (h + '').length == 1 ? '0' + h : h
  let cs = (s + '').length == 1 ? '0' + s : s
  return ch + ':' + cs
}
