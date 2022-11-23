/**
 * 获取指定范围的随机数
 * @param {number} minNum
 * @param {number} maxNum
 */
export const getRandomNum = (minNum, maxNum) => {
  if (typeof minNum !== 'number' || typeof maxNum !== 'number') {
    throw new Error('参数必须是数字')
  }
  return Math.round(Math.random() * maxNum + minNum)
}

/**
 * 获取 url 中 search 键的值
 */
export function getQueryString (key) {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + key + '=([^&;]+?)(&|#|;|$)').exec(
        window.location.href
      // eslint-disable-next-line no-sparse-arrays
      ) || [, ''])[1].replace(/\+/g, '%20')
    ) || ''
  )
}

/**
 * 截取指定字符
 */
export const splitStr = function (str, len) {
  if (!str || typeof str !== 'string') {
    throw new Error('str 参数无效')
  }
  if (str.length <= len) return str + '...'
  return str.slice(0, len) + '...'
}

/**
 * 首字母大写
 */
export const capitalized = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
