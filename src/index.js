import * as Util from './util'
import * as defaultStyle from './defaultStyle.config'
import './assets/icon/iconfont.css'
class CEditor {
  set textLength(len) {
    this._textLength = len;
    len && this.renderTextLen()
  }
  get textLength() {
    return this._textLength
  }
  constructor(dom) {
    this.editorBox = dom;
    this.editor = null;
    this._textLength = 0
  }
  /**
   * init CEditor
   * @param {*} toolList editor tool list
   */
  init(toolList) {
    let editorDefaultStyle = {
      'min-height': this.editorBox.offsetHeight + 'px'
    }
    this.editor = document.createElement('div');
    this.editorBox.setAttribute('id', 'CEditor')
    this.editor.setAttribute('contenteditable', true);
    this.editor.setAttribute('id', 'CEditorBody');
    this.editor.setAttribute('style', Util.objctToStyle(editorDefaultStyle));
    this.editorBox.appendChild(this.editor)
    this.renderTool(toolList)
    this.renderTextLen()
    this.initEventListener();
  }
  initEventListener() {
    ['blur', 'keyup', 'mouseup'].forEach(type => {
      this.editor.addEventListener(type, (e) => {
        this.textLength = e.target.innerText.replace(/\n/g, '').length
      })
    })
  }
  clearEditorContent() {
    this.editor.innerHtml = '';
    this.textLength = 0;
  }
  renderTool(toolList) {
    let tool = document.createElement('div');
    tool.setAttribute('style', Util.objctToStyle(defaultStyle.tool));
    tool.setAttribute('contenteditable', false);
    Util.insertBefore(this.editor, tool)
    if (toolList) {
      for (let i = 0; i < toolList.length; i++) {
        let span = document.createElement('span')
        span.setAttribute('style', Util.objctToStyle(defaultStyle.toolIconSpan))
        let icon = document.createElement('i');
        Util.hover(icon, () => { span.style.background = '#e1e1e1' }, () => { span.style.background = 'none' })
        Util.bindCommand(icon)
        icon.setAttribute('class', `iconfont icon-editor-${toolList[i]}`);
        icon.setAttribute('id', toolList[i])
        span.appendChild(icon)
        tool.appendChild(span)
      }
    }
  }
  renderTextLen() {
    let textLen = document.createElement('span');
    textLen.setAttribute('id', 'textLen');
    textLen.innerHTML = this.textLength;
    textLen.setAttribute('style', Util.objctToStyle(defaultStyle.textLen))
    Util.removeNode(document.querySelector('#textLen'))
    Util.insertAfter(this.editor, textLen)
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
  editor.init(['align-justify', 'align-left', 'align-right', 'align-center', 'bold', 'underline', 'italic', 'image', 'clean'])
  editor.setStyle({
    'font-size': '14px',
  });
}
export default CEditor