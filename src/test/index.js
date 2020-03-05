const test = (CEditor) => {
  let dom = document.querySelector('#CEditor')
  return new CEditor(dom)
}
module.exports = test