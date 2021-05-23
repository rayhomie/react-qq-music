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
