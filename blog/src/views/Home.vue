<template>
  <div>
    <div class="banner"><i class="iconfont icon-arrowdown"></i></div>
    <right-bar></right-bar>
    <div class="home-container-wrap">
      <div class="home-container">
        <span class="total"
          >总共有: <span>{{ this.total }}</span> 篇文章</span
        >
        <div
          class="home-artcle"
          v-for="item in articleList"
          :key="item._id"
          @click="goDetail(item._id)"
        >
          <div class="artcles-container">
            <img src="@/assets/test1.jpg" alt="" />
            <div class="content-wrap">
              <div class="title">
                {{ item.title || "title is here error !" }}
              </div>

              <div class="artcles-info">
                <div class="tags iconfont icon-tags">
                  <span
                    class="tag"
                    v-for="(tag, index) in item.tags"
                    :key="index"
                    >{{ tag }}</span
                  >
                </div>
                <div class="summary">summary</div>
                <div class="info">
                  <div class="author">
                    <img :src="item.author.avatar" alt="" />
                    {{ item.author.username || "author error !" }}
                  </div>
                  <span class="iconfont icon-riqi2">{{
                    convertTime(item.publishTime).split(" ")[0] ||
                    "time error !"
                  }}</span>
                  <span class="iconfont icon-browse">{{ item.view || 0 }}</span>
                  <span class="iconfont icon-comment">{{
                    item.comment.length || 0
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最终显示的页数，根据 total / page-size 得到, 当前页改变触发 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :small="!isPC"
          background
          layout="prev, pager, next"
          :page-size="8"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import BottomBar from "@/components/BottomBar.vue";
import RightBar from "@/components/RightBar.vue";
import { articleRequest } from "@/api/article.js";
import { IsPcMixin } from "@/mixin";
import { convertTime } from "@/utils/date";

// 引入辅助函数
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    RightBar,
    BottomBar,
  },
  data() {
    return {
      // 注意点否则就 GG 一个小错误, 规定一个页面展示几条数据
      articleList: Object.freeze(),
      total: 0,
      isPC: true,
    };
  },

  // 无法找到 props 自定义属性
  mixins: [IsPcMixin],
  methods: {
    goDetail(id) {
      /*考虑到文章页面可能会单独刷新，  所以用url传参形式 不用查询参数params*/
      if (id) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        /*导航传入ID，article.vue 需要拿id 发起请求*/
        this.$router.push({
          path: `/home/article/details/${id}`,    
        });
      }
    },
    handleCurrentChange(currentPage) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      articleRequest(currentPage).then((res) => {
        this.articleList = res.data.data;
        console.log(this.articleList);
        this.total = res.data.total;
      });
    },
    convertTime(date) {
      return convertTime(new Date(date));
    },
  },
  created() {
    this.handleCurrentChange(1);
  },
  mounted() {
    // 滚动时显出内容，并且设有限制
    window.onscroll = () => {
      if (document.querySelector(".home-container")) {
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 0 && scrollTop < 300) {
          document.querySelector(".home-container").style.marginTop = `-${
            scrollTop / 3
          }px`;
        }
      }
    };
  },
};
</script>

<style lang='less' scoped>
.banner {
  height: 100vh;
  width: 100%;
  // 如果设置 relative定位，整个图片会在最顶层，即使元素设置了 z-index 999 也不行
  position: relative;
  overflow: hidden;
  background: url("../assets/background.jpg") center;

  i {
    @keyframes float {
      0% {
        opacity: 0.8;
        bottom: 5%;
      }
      50% {
        opacity: 0.4;
        bottom: 8%;
      }
      100% {
        opacity: 0.8;
        bottom: 5%;
      }
    }
    position: absolute;
    font-size: 30px;
    color: #fff;
    animation: float 1.5s infinite;
  }
}

.home-container-wrap {
  min-height: 800px;
}
.home-container {
  position: relative;
  margin-left: 10%;
  height: auto;
  width: 56%;
  min-width: 600px;
  // min-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  padding: 20px;
  background: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 20px;
  transition: all 0.2s linear;

  .total {
    color: #718096;
    font-size: 16px;
    font-weight: bold;

    span {
      background: linear-gradient(to top, #f43b47 0%, #453a94 100%);
      background-clip: text;
      color: transparent;
      font-size: 20px;
    }
  }

  .home-artcle {
    height: 220px;
    width: 100%;
    min-width: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    overflow: hidden;
    padding: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 20px rgba(0, 0, 0, 0.4);
    }

    .artcles-container {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        height: 100%;
        width: 50%;
        border-radius: 10px;
      }

      .content-wrap {
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 0 2rem;

        .title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: left;
          padding-top: 20px;
        }

        .artcles-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 20px;

          .info {
            display: flex;
            gap: 20px;
            align-items: center;

            span {
            }

            .author {
              img {
                height: 24px;
                width: 24px;
                border-radius: 50%;
              }
            }
          }

          .tags {
            display: flex;
            justify-content: flex-start;
            gap: 5px;

            .tag {
              line-height: 100%;
              color: #718096;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, "Noto Sans", sans-serif,
                "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
                "Noto Color Emoji";
            }
          }
        }
      }
    }
  }

  .el-pagination {
    margin-left: 50%;
    transform: translateX(-50%);
  }
}

// 用户栏隐藏后 文章进行拉伸
@media screen and (max-width: 71em) {
  .home-container {
    overflow: hidden;
    position: relative;
    width: 80%;
  }
}
</style>