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

export const insertBefore = (targetDom, insertDom) => {
  let parent = targetDom.parentNode;
  parent.insertBefore(insertDom, targetDom);
}

/**
 * remove a Dom
 * @param {*} targetDom should remove Dom
 */
export const removeNode = (targetDom) => {
  if (!targetDom) return
  let parent = targetDom.parentNode;
  parent.removeChild(targetDom)
}

export const hover = (ele, hover, out) => {
  ele.addEventListener('mouseover', hover, false)
  ele.addEventListener('mouseout', out, false)
}

export const bindCommand = (ele) => {
  ele.addEventListener('click', (e) => {
    switch (e.target.id) {
      case 'align-justify': { document.execCommand('justifyFull') }
        break;
      case 'align-left': { document.execCommand('justifyLeft') }
        break;
      case 'align-right': { document.execCommand('justifyRight') }
        break;
      case 'align-center': { document.execCommand('justifyCenter') }
        break;
      case 'bold': { document.execCommand('bold') }
        break;
      case 'underline': { document.execCommand('underline') }
        break;
      case 'italic': { document.execCommand('italic') }
        break;
      case 'clean': {
        let range = new Range();
        range.selectNodeContents(document.querySelector('#CEditorBody'));
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range)
        document.execCommand('delete')
        document.querySelector('#textLen').innerHTML = '0';
      }
        break;
      case 'image': {
        let selection = window.getSelection();
        let range = selection.getRangeAt(0)
        document.querySelector('#fileInput') && removeNode(document.querySelector('#fileInput'))
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('id', 'fileInput');
        input.setAttribute('style', 'visibility:hidden');
        document.body.appendChild(input);
        input.click();
        input.onchange = (e) => {
          fileChange(e.target.files[0]).then(base64 => {
            selection.removeAllRanges();
            selection.addRange(range)
            let id = `img${Math.floor(Math.random() * 1000)}`
            document.execCommand('insertHTML', false, `<img id=${id} src="${base64}" draggable="false" onload="${imageLoad(id)}" width="50">`)
          })
        }
      }
      default: {
      }
    }
  })
}

const imageLoad = (id) => {
  // setTimeout(() => {
  //   console.log(document.querySelector(`#${id}`))
  //   document.querySelector(`#${id}`).addEventListener('focus', (e) => {
  //     console.log(e)
  //   }, false)
  // }, 0);
}

const fileChange = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}