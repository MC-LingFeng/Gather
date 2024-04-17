// base64转blob
export const base64ToBlob =(code) =>{
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1]) // 解码base64得到二进制字符串
  let rawLength = raw.length
  let uInt8Array = new Uint8Array(rawLength) // 创建8位无符号整数值的类型化数组
  for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i) // 数组接收二进制字符串
  }
  return new Blob([uInt8Array], {type: contentType})
}
export const downloadFile = (fileName, content) =>{
  let aLink = document.createElement('a')
  let blob = base64ToBlob(content) // new Blob([content]);
  let evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  // aLink.dispatchEvent(evt);
  aLink.click()
}

