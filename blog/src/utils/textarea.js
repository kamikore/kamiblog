export function getSelectedText(obj) {
    var userSelection;
    if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
      // 非IE浏览器
      var startPos = obj.selectionStart,// 获取选区的开始位置
          endPos = obj.selectionEnd;// 获取选区的结束位置
      console.log("非IE：")
      console.log("选区开始点：" + startPos + '，选区结束点：' + endPos)

      userSelection = obj.value.substring(startPos, endPos)
    } else if (document.selection) {
      // IE浏览器
      console.log("IE：")
      userSelection = document.selection.createRange().text
    }
    return userSelection
  }

export  function setCursorPosition(elem, index) {
    var val = elem.value
    var len = val.length
 
    // 超过文本长度直接返回
    if (len < index) return
    setTimeout(function() {
        elem.focus()
        if (elem.setSelectionRange) { // 标准浏览器
            elem.setSelectionRange(index, index)   
        } else { // IE9-
            var range = elem.createTextRange()
            range.moveStart("character", -len)
            range.moveEnd("character", -len)
            range.moveStart("character", index)
            range.moveEnd("character", 0)
            range.select()
        }
    }, 10);
}