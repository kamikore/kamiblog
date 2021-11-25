
export function drag(event,ele) {
    const element = document.querySelector(`.${ele}`);
    const width = element.offsetWidth;
    const height =  element.offsetHeight;
    const clientHeight =  document.documentElement.clientHeight;
    const clientWidth =  document.documentElement.clientWidth;

    //鼠标位置到元素左边界 与 上边界的距离
    let disLeft = event.clientX - element.offsetLeft;
    let disTop = event.clientY - element.offsetTop;
    function move(ev) {
    
        //移动时，元素左，上边框到限制边界的距离
        let left = ev.clientX - disLeft;
        let top = ev.clientY - disTop;
        
        // 如果元素左边框到达限制边界
        if(left <= 0) {
            left = 0;
        } 
        // 如果元素右边框到达限制边界
        else if (left + width>= clientWidth) {
            left =  clientWidth - width ;
        } 

        if(top <= 0) {
            top = 0;
        } else if(top + height >= clientHeight) {
            top =  clientHeight - height ;
        }

        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    }

    function handleMove() {throttle(move,100)} 
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", move);
    });

}