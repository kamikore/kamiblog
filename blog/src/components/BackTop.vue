<template>
  <div class="backTop" :class="{ show: isshow }">
    <a class="iconfont icon-arrowon" @click="backTop" href="#"></a>
  </div>
</template>

<script>
import emitter from "@/eventbus";
import { throttle } from "@/utils/throttle";

export default {
  name: "BackTop",
  data() {
    return {
      isshow: false,
    };
  },
  // 渲染完成触发 仅触发一次
  mounted() {
    this.$nextTick(() => {
      // 立即执行
      setTimeout((e) => {
        this.listen();
      }, 0);
    });
  },
  methods: {
    backTop() {
      // 获取滚动条 为了消除标准模式和怪异模式之间的差别而做的兼容
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 渐变动画的 步长, 距离越大，移动越快
      let count = scrollTop / 20;
      this.timer = setInterval(() => {
        if (scrollTop > 0) {
          scrollTop -= count;
        } else {
          clearInterval(this.timer);
        }
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
      }, 10);
    },

    // 监听滚动条
    handleScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 触发 tabbar 的自定义事件
      if (parseInt(scrollTop) >= 30) {
        emitter.emit("opc0");
      } else {
        emitter.emit("opc1");
      }

      if (parseInt(scrollTop) >= 200) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },

    listen() {
      window.addEventListener("scroll", throttle(this.handleScroll, 800));
    },
  },
};
</script>

<style lang='less' scoped>
.backTop {
  width: 50px;
  height: 50px;
  position: fixed;
  top: -100%;
  right: 2%;
  z-index: 999;
  background: #ff3838;
  border-radius: 10px;
  text-align: center;
  transition: all 0.7s ease-in;

  .iconfont {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    color: #fff;
    text-decoration: none;
  }
}

.backTop.show {
  top: 80%;
}
</style>