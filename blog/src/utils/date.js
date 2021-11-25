export function convertTime(date) {
    let year = date.toLocaleDateString();
    let time = date.toTimeString().split(' ')[0]
    year = year.replace(new RegExp('/','g'), '-')
    return year +'  '+ time;
}

// 返回纯数字的时间组合： 20211119153622607
export function dataTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour =date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if(hour <= 9 ){hour = "0"+hour}
    if(minutes<=9){minutes = "0"+minutes}
    if(seconds<=9){seconds = "0"+seconds}
    return year.toString()+month.toString()+day.toString()+hour.toString()+minutes.toString()+seconds.toString()
}
