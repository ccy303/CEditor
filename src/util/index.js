export default class Util {
  /**
   * obj to inline style 
   * @param {*} obj 
   */
  static objctToStyle(obj) {
    let style = '';
    for (let key in obj) {
      style += `${key}:${obj[key]};`
    }
    return style
  }
}