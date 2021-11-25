<template>
  <div class="comment">
    <!-- 评论模块顶部 -->
    <div
      class="comment_header"
      style="display: flex; justify-content: space-between"
    >
      <span style="color: #7a7a7a"
        >Comment | {{ this.commentList.length }}条评论</span
      >
      <span
        style="color: #409eff; cursor: pointer"
        class="login"
        @click="login"
        v-if="!loginStatus"
        >登录</span
      >
    </div>

    <!-- 评论模块输入区 -->
    <div class="comment_send" v-loading="loading" v-if="loginStatus">
      <div style="flex: 1">
        <a href=""> <img :src="userInfo.avatar" alt="" /></a>
      </div>
      <el-input
        style="margin-bottom: 5px; margin-top: 30px; flex: 8"
        type="textarea"
        rows="6"
        resize="none"
        placeholder="请输入内容"
        v-model="comment"
        maxlength="400"
        show-word-limit
      ></el-input>
      <el-button
        type="primary"
        size="mini"
        style="flex: 1; height: 50px"
        @click.native="subComment"
        >提交评论</el-button
      >
    </div>

    <!-- 评论模块下方评论区 -->
    <div class="comment_list" v-if="this.commentList">
      <div
        style="color: #999999; text-align: center; padding-bottom: 20px"
        v-if="this.commentList.length == 0"
      >
        暂时没有评论，快来抢沙发~~
      </div>
      <div
        class="list_item"
        v-for="(item, index) in this.commentList"
        :key="item.id"
        v-else
      >
        <!-- 评论区内容 -->
        <div class="user_face">
          <a href="">
            <img :src="item.avatar" alt="" />
          </a>
        </div>
        <div class="content">
          <div class="username">
            <a href="javascript:;">{{ item.username }}</a>
          </div>
          <div class="text">{{ item.comment }}</div>
          <div class="info">
            <span>{{ convertTime(item.time) }}</span>
            <span @click="showReply($event, index)">回复</span>
          </div>

          <!-- 评论的回复 -->
          <div class="reply_box" v-if="item.replyList">
            <div
              class="reply_item"
              v-for="(item, index) in item.replyList"
              :key="item.id"
            >
              <a href="">
                <img :src="item.avatar" alt="" />
              </a>
              <div class="content">
                <div class="username">
                  <a href="javascript:;">{{ item.username }}</a>
                  <span class="text">{{ item.reply }}</span>
                </div>
                <div class="info">
                  <span>{{ convertTime(item.time) }}</span>
                  <span @click="showReply($event, index)">回复@ 别人</span>
                </div>
              </div>
            </div>
          </div>
          <div class="view_more" v-if="item.replyList.length > 5">查看更多</div>
        </div>
      </div>
    </div>
    <div id="reply_box" v-if="userInfo" v-show="show_reply">
      <div class="user_avatar">
        <a href="">
          <img :src="userInfo.avatar" alt="" />
        </a>
      </div>

      <el-input
        style="margin-bottom: 5px; margin-top: 30px"
        type="textarea"
        rows="4"
        resize="none"
        placeholder="请输入内容"
        v-loading="loading"
        v-model="reply"
        maxlength="100"
        show-word-limit
      ></el-input>
      <el-button
        type="primary"
        size="mini"
        style="height: 50px"
        @click.native="subreply(this.reply)"
        >回复</el-button
      >
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { convertTime } from "@/utils/date";

export default {
  name: "comment",
  props: ["id"],
  data() {
    return {
      // 评论内容
      comment: "",
      reply: "",
      show_reply: false,
      replyIndex: -1,
      loading: false,
      commentList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "loginStatus"]),
  },
  watch: {
    id: function (newVal, oldVal) {
      if (newVal) {
        this.$api.article.getComment(newVal).then((res) => {
          this.commentList = res.data.data.comment;
        });
      }
    },
  },
  methods: {
    login() {
      if (!this.$store.state.showLogin) {
        this.$store.dispatch("change_showLogin", true).then((res) => {});
      }
    },
    convertTime(date) {
      return convertTime(new Date(date));
    },
    getComment() {
      this.$api.article.getComment(this.articleId).then((res) => {
        this.commentList = res.data.data;
      });
    },
    showReply(event, index) {
      if (!this.loginStatus) {
        this.$message.warning("请先登录");
        return;
      }
      const reply_box = document.getElementById("reply_box");

      // //  是否为同一个评论
      if (this.replyIndex != index) {
        this.replyIndex = index;
        document
          .querySelectorAll(".list_item > .content")
          [index].appendChild(reply_box);
        this.reply = "";

        //不是同一个节点，不管是否已经显示，都要设为true
        this.show_reply = true;
      }
      // 同一个评论，只需要切换显示
      else this.show_reply = !this.show_reply;
    },
    subComment() {
      /*检测登录，就不必使用计算属性的 getters*/
      if (!this.$store.state.loginStatus) {
        this.$message({
          message: "请先登录.",
          type: "warning",
        });
      } else if (this.comment.trim() === "") {
        this.$message({
          message: "评论内容不能为空",
          type: "warning",
        });
      } else {
        this.loading = true;
        // 评论的结构是数组内含对象
        this.$api.article
          .subComment(
            {
              comment: this.comment,
              username: this.userInfo.username,
              avatar: this.userInfo.avatar,
              time: new Date(),
              replyList: [],
            },
            this.id
          )
          .then((res) => {
            this.commentList = res.data;
            this.comment = "";
            this.loading = false;
          });
      }
    },
    subreply(reply) {
      this.reply = "";
      this.loading = true;
      this.$api.article
        .subReply(
          {
            reply: {
              reply,
              username: this.userInfo.username,
              avatar: this.userInfo.avatar,
              time: new Date(),
            },
            index: this.replyIndex,
          },
          this.id
        )
        .then((res) => {
          this.commentList = res.data;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang= 'less'  scoped>
/* 整个容器 flex布局，竖向分布 */
.comment {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
  gap: 20px;
  padding: 0 20px;
  margin: 20px auto;

  .comment_header {
    display: flex;
    justify-content: space-between;
  }

  .comment_send {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }

  .comment_list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 60px;
    padding-bottom: 20px;

    .list_item {
      display: flex;
      justify-content: space-around;
      gap: 15px;

      .user_face {
        flex: 1;

        img {
          height: 48px;
          width: 48px;
          border-radius: 50%;
          margin-top: 20px;
        }
      }

      > .content {
        display: flex;
        flex: 9;
        flex-direction: column;
        align-items: flex-start;
        border-top: 1px solid #e5e9ef;
        padding: 20px 0;
        gap: 10px;

        .username {
          font-weight: bold;
          font-size: 12px;
        }

        .text {
          font-size: 14px;
        }

        .info {
          display: flex;
          gap: 20px;
          line-height: 100%;
          color: #c0c0c0;
          font-size: 12px;

          span:last-child {
            cursor: pointer;
          }
        }

        .reply_box {
          display: flex;
          flex-direction: column;
          gap: 15px;

          .reply_item {
            display: flex;
            gap: 15px;

            img {
              height: 24px;
              width: 24px;
              border-radius: 50%;
            }

            .content {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;

              .username {
                display: flex;
                line-height: 100%;
                gap: 10px;

                .text {
                  font-weight: normal;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }

  #reply_box {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 80%;

    img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
    }
  }
}
</style>


