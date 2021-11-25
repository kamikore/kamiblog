<template>
  <div class="bottom">
    <span class="content">
      本博客已经苟且偷生了
      <span class="float"> {{ runningTime }} 嘀嘀咕咕嘀咕</span>
    </span>
    <!-- 独占到下一行 -->
    <div>KamiKore 个人博客小站</div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  data() {
    return {
      runningTime: Object.freeze(""),
    };
  },

  // 生命周期函数
  mounted() {
    //  时间处理或交由第三方库 Day.js 处理
    setInterval(() => {
      let startTime = new Date("2021-9-9");
      let currentTime = new Date();
      let usedTime = currentTime - startTime;
      //   不满24小时天数向下取整
      let days = Math.floor(usedTime / (24 * 3600 * 1000));
      // 不满一天的剩余小时数
      let last = usedTime % (24 * 3600 * 1000);
      let hours = Math.floor(last / (3600 * 1000));
      // 不满一小时的剩余分钟数
      let last2 = usedTime % (3600 * 1000);
      let minutes = Math.floor(last2 / (60 * 1000));
      // 根据剩余分钟，求得余下的秒数
      let last3 = last2 % (60 * 1000);
      let seconds = Math.floor(last3 / 1000);
      this.runningTime =
        days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
    }, 1000);

    // let tagsHeight =
    //   document.getElementsByClassName("tags-container")[0].offsetHeight;
    // document.getElementsByClassName("bottom")[0].style.marginTop = `${
    //   tagsHeight + 100
    // }px`;
  },
};
</script>

<style scoped>
.bottom {
  /* position: relative; */
  /* bottom: -869px; */
  /* margin-top: 100px; */
  height: 80px;
  text-align: center;
  overflow: hidden;
  background-color: #232323;
  color: aliceblue;
  padding-top: 20px;
}

.content {
  z-index: 1;
  margin-right: 10%;
}

/* 文字动画 */
@keyframes float {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(3px) rotate(-3deg);
  }
  70% {
    transform: translateY(0) rotate(-3deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

.float {
  position: absolute;
  animation: float 1s infinite;
}
</style>