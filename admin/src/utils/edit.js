export function mark(element) {
    console.log(element.selectionEnd)
    const text = [...element.value];
    text.splice(element.selectionStart, 0, "<mark>");
    text.splice(element.selectionEnd+1, 0, "</mark>");
    return text.join("");
}

export function codeBlock(element) {
    const text = [...element.value];
    const block = "\n```\n\n```\n";
    text.splice(element.selectionStart,0, block)
    // 光标位置，测得 插入位置，与代码块中的位置，相差5
    setCursorPosition(element,element.selectionStart+5)
    return text.join("");

}

function setCursorPosition(elem, index) {
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
    }, 10)
}