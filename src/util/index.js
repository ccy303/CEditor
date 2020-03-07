/**
 * obj to inline style 
 * @param {*} obj 
 */
export const objctToStyle = (obj) => {
  let style = '';
  for (let key in obj) {
    style += `${key}:${obj[key]};`
  }
  return style
}
/**
 * insert insertDom after targetDom
 * @param {*} targetDom 
 * @param {*} insetDom 
 */
export const insertAfter = (targetDom, insertDom) => {
  let parent = targetDom.parentNode;
  parent.lastChild === targetDom ?
    parent.appendChild(insertDom) : parent.insertBefore(insertDom, targetDom.nextSibling)
}

export const removeNode = (targetDom) => {
  if (!targetDom) return
  let parent = targetDom.parentNode;
  parent.removeChild(targetDom)
}
