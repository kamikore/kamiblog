<template>
  <div>
    <div class="banner"></div>
    <div class="main">
      <div class="detail-container">
        <div class="detail-content">
          <div class="title">
            {{
              this.article.title ||
              "title is here title is here title is here title is here title is here title is here "
            }}
          </div>

          <div class="info-container">
            <div>
              <span id="article-type" :class="{ color: !type }">{{
                type ? "原创" : "转载"
              }}</span>
              <div class="info_box" v-if="this.article">
                <span>{{ this.article.author.username }}</span>
                <span class="iconfont icon-riqi2">{{
                  convertTime(this.article.publishTime)
                }}</span>
                <span class="iconfont icon-browse">{{
                  this.article.view
                }}</span>
                <span class="iconfont icon-comment">{{
                  this.article.comment.length
                }}</span>
              </div>
            </div>
            <div class="tags iconfont icon-tags">
              标签:
              <span
                class="tag-item"
                v-for="(item, index) in this.article.tags"
                :key="index"
                >{{ item }}</span
              >
            </div>
          </div>

          <!--下面就是代码了-->
          <div class="blog-content" style="overflow-x: scroll">
            <div class="markdown-body" id="html"></div>
          </div>
        </div>

        <!-- 评论模块 -->
        <comment :id="this.article._id"></comment>
      </div>
      <article-directory
        :element="this.markdown"
        v-if="this.markdown != null"
      ></article-directory>
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>


<script>
import RightBar from "@/components/RightBar.vue";
import BottomBar from "@/components/BottomBar.vue";
import Comment from "@/components/comment.vue";
import { convertTime } from "@/utils/date";
import ArticleDirectory from "@/components/ArticleDirectory.vue";
const marked = require("marked");
const hljs = require("highlight.js");

export default {
  name: "ArticleDetail",
  components: {
    RightBar,
    BottomBar,
    Comment,
    ArticleDirectory,
  },
  data() {
    return {
      article: "",
      // 是否为原创
      type: true,
      markdown: null,
      commentList: [],
    };
  },
  methods: {
    convertTime(date) {
      return convertTime(new Date(date));
    },
  },
  created() {
    //pop() 移除数组最后一个元素并返回
    const id = location.pathname.split("/").pop();
    this.$api.article.detailsRequest(id).then((res) => {
      this.article = res.data.data;
      this.article.content = marked(this.article.content, { breaks: true });
      this.commentList = res.data.data.comment;
    });
  },
  beforeMount() {
    this.$loading({ fullscreen: true });
  },
  mounted() {
    // this.markdown = document.querySelector(".markdown-body");    实际上是空的 div
    // console.log(this.markdown.childNodes.length);                长度为 0
    this.$loading().close();
  },

  watch: {
    article() {
      this.$nextTick(() => {
        document.querySelector(".markdown-body").innerHTML =
          this.article.content;
        this.markdown = document.querySelector(".markdown-body");
        hljs.highlightAll();
      });
    },
  },
};
</script>

<style lang='less' scoped>
.banner {
  background: url("../assets/background.jpg") center;
  height: 60vh;
}

.main {
  display: flex;
  gap: 60px;
  background: #eeeeee;
  // 因为整个背景色是黑色，padding 才能隔开bottom
  padding-bottom: 40px;

  .detail-container {
    // margin-top: 5%;
    margin-left: 8%;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
    width: 65%;
    min-width: 700px;
    border-radius: 20px;
    margin-top: -40px;
    padding-top: 40px;

    background: #fff;

    .detail-content {
      background-color: #fff;
      /*background-color: white;*/
      // padding-top: 5%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      gap: 20px;

      .title {
        margin: 0 5%;
        font-size: 25px;
        font-weight: 600;
        color: #626262;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; /*弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 2; /*限制一个块元素显示的文本行数*/
        -webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/
      }

      .info-container > div {
        display: flex;
        height: 40px;
        line-height: 40px;
      }

      .info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;

        .info_box {
          display: flex;
          gap: 15px;
        }

        .color {
          background: #b8ddb0 !important;
        }

        .color::after {
          border-left: 20px solid #b8ddb0 !important;
        }

        #article-type {
          height: 40px;
          line-height: 40px;
          position: relative;
          background: sandybrown;
          margin-right: 50px;
          padding-left: 20px;
          text-align: left;
          font-family: "Helvetica";
          color: #fff;
          border-radius: 5px 0 0 5px;
        }

        #article-type::after {
          content: "";
          position: absolute;
          top: 0;
          width: 0;
          height: 0;
          border: 20px solid transparent;
          border-left: 20px solid sandybrown;
          z-index: 1;
        }

        .tag-item {
          background: #fff;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          padding: 0 10px;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
  }
}

@media not screen and (min-width: 65em) {
  .detail {
    width: 80%;
  }
}
@media not screen and (min-width: 45em) {
  .detail {
    width: 100%;
    margin-top: 20%;
  }

  .detail-content img {
    height: 200px;
    width: 100%;
  }

  .container {
    width: 96%;
  }
}

@media not screen and (min-width: 40em) {
  .detail {
    width: 100%;
    margin-top: 40%;
  }
}
</style>