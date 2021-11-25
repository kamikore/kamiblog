/**
 * @param {string} url
 * @returns {Object}
 */


// 将参数转为对象的工具函数
function param2Obj(url) {
  // decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

module.exports = {
  param2Obj
}
