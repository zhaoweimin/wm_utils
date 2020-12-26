/**
 * 判断是否是json字符串
 * @param {String}} str 字符串
 */
export const isJsonString = (str) => {
  try {
    if (typeof JSON.parse(str) == 'object') {
      return true
    }
  } catch (e) {
    return false
  }
  return false
}

/**
 * 遍历属性转json 
 * @param {String/Object}} json 字符串/json 对象
 */
export const toJson = (json) => {
  let type = typeof json
  let res = ''
  switch (type) {
    case 'string': {
      res = isJsonString(json) ? toJson(JSON.parse(json)) : json
      break
    }
    case 'object': {
      for (let i in json) {
        json[i] = toJson(json[i])
      }
      res = json
      break
    }
    default: {
      res = json
    }
  }
  return res
}

/**
 * 获取显示json格式化 的 html格式
 * @param {String/Object}} json 字符串/json 对象
 * @param {nuber}} space 格式缩进空格数
 */
export const getJsonPreHtml = (json, space) => {
  json = JSON.stringify(toJson(json), null, space)
  return `<pre>${toJson(json)}<pre>`
}

/**
 * 获取显示json格式化 的 Render格式 
 * @param {Function}} createElement - 原生创建dom元素的方法， 弃用，推荐使用
 * @param {String/Object}} json 字符串/json 对象
 * @param {nuber}} space 格式缩进空格数
 */
export const getJsonPreRender = (h, json, space) => {
  json = JSON.stringify(toJson(json), null, space)
  return (
    <div>
      <pre>{json}</pre>
    </div>
  )
}