import Util from './util'
class CEditor {
  constructor(dom) {
    this.editor = dom;
  }
  init() {
    this.editor.setAttribute('contenteditable', true);
  }
  /**
   * @param {*} style css list
   */
  setStyle(style) {
    const obj = {
    }
    const _oStyle = this.editor.getAttribute('style') || '';
    let _nStyle = Util.objctToStyle(style);
    this.editor.setAttribute('style', _oStyle + _nStyle)
  }
}
if (process.env.NODE_ENV === 'development') {
  let testFun = require('./test');
  let editor = testFun(CEditor);
  editor.init()
  editor.setStyle({
    // background: '#000',
    'font-size': '14px',
    // color: '#fff'
  });
}
export default CEditor