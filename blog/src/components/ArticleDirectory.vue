<template>
  <div class="elevator_wrap">
    <h1 style="font-size: 20px">文章目录</h1>
    <div class="elevator">
      <img src="@/assets/anchor.png" alt="" />
      <div class="list_box">
        <div class="item" v-for="(item, index) in itemList" :key="item.id">
          <i class="point"></i>
          <a
            :href="'#' + item.id"
            :class="{
              [item.tagName]: true,
              active: index === this.activeIndex,
            }"
            >{{ item.textContent }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "@/utils/throttle";

export default {
  props: ["element"],
  data() {
    return {
      itemList: [],
      //item 间的间距
      itemSpace: 0,
      activeIndex: 0,
    };
  },
  watch: {
    activeIndex() {
      document.querySelector(".elevator img").style.top = `${
        this.activeIndex * this.itemSpace
      }px`;
    },
  },
  created() {
    const reg = new RegExp("H.*"); // tagName 为首字母大写
    let headers = [...this.element.getElementsByTagName("*")];
    this.itemList = headers.filter((value) => {
      return reg.test(value.tagName);
    });

    window.onscroll = throttle(
      function () {
        let scrollTop = document.documentElement.scrollTop; /*html 的*/
        this.itemList.forEach((element, index) => {
          if (scrollTop >= element.offsetTop - 100) {
            this.activeIndex = index;
          } else if (scrollTop < this.itemList[0].offsetTop) {
            this.activeIndex = 0;
          }
        });
      }.bind(this),
      200
    );
  },
  mounted() {
    let items = document.querySelectorAll(".elevator .item");
    this.itemSpace = items[1].offsetTop - items[0].offsetTop;
  },
};
</script>

<style lang="less" scoped>
.elevator_wrap {
  position: sticky;
  top: 25%;
  margin-top: 45px;
  // 高度不能太大否则粘性定位失效
  height: 50%;

  .elevator {
    display: flex;
    position: relative;

    img {
      position: absolute;
      top: 0;
      transform: translate(-50%, -1px);
      width: 22px;
      height: 22px;
      z-index: 1;
    }

    .list_box {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 0 20px;
      border-left: 2px #fff solid;

      .item {
        position: relative;
        text-align: left;

        i {
          position: absolute;
          border: 6px #fff solid;
          border-radius: 50%;
          left: -21px;
          transform: translate(-50%, 3px);
          box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.44),
            0 17px 50px 0 rgba(0, 0, 0, 0.19);
        }

        .active {
          font-weight: bold;
        }

        .H1 {
        }

        .H2 {
          font-size: 14px;
          padding-left: 12px;
        }

        .H3 {
          font-size: 14px;
          padding-left: 18px;
        }

        .H4 {
          font-size: 14px;
          padding-left: 24px;
        }

        .H5 {
          font-size: 14px;
          padding-left: 30px;
        }

        .H6 {
          font-size: 14px;
          padding-left: 36px;
        }
      }
    }
  }
}
</style>