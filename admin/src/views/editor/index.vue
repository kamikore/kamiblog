<template>
  <div class="editor-container">
    <!-- bootstrap 的栅格系统 -->
    <el-row>
      <el-col :span="24">
        <div class="navgation-bar">
          <div class="navgation-bar_title">
            <el-input
              type="text"
              v-model="title"
              placeholder="title 允许字符"
              clearable
            />
            <el-button @click="dialogTableVisible = true">
              标签选择
              <i>{{ checkList.length }}</i>
            </el-button>
          </div>
          <div class="navgation-bar_buttonWrap">
            <div
              class="navgation-bar_buttonBox"
              v-for="(item, index) in buttonList"
              :key="item.id"
            >
              <el-button
                class="navgation-bar_button iconfont"
                :class="item.icon"
                @click.native="handleClick(index)"
              >
                {{ item.text }}
              </el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input type="textarea" v-model="text" @input="convertText"
          >sdsd</el-input
        >
      </el-col>
      <el-col :span="12">
        <div class="markdown-body" id="html"></div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="文章标题选择"
      width="30%"
      :modal="false"
    >
      <div class="tabList">
        <div v-for="item in tags" :key="item.id" @click="showTags(item)">
          {{ item.tag }}
        </div>
      </div>
      <el-checkbox-group v-model="checkList" :max="5">
        <el-checkbox
          v-for="item in tagList"
          :key="item.id"
          :label="item"
        ></el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <span>最多可选择5个标签 ！！</span>
        <span class="dialog-footer">
          <el-button @click="dialogTableVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogTableVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getArticle, updateArticle } from "@/api/article";
import { mapGetters } from "vuex";

// 引入编辑器工具栏 工具函数
import { mark, codeBlock } from "@/utils/edit";
const hljs = require("highlight.js");
const marked = require("marked");

export default {
  props: ["id"],
  data() {
    return {
      html: "",
      text: "",
      title: "",
      // 文章是否已保存
      isSave: false,
      checkList: [],
      tagList: [],
      dialogTableVisible: false,
      wordCount: "0",
      column: "0",
      buttonList: Object.freeze([
        { text: "标记", icon: "icon-Marker" },
        { text: "插入代码块", icon: "icon-code" },
        { text: "存至草稿箱", icon: "icon-edit" },
        { text: "发表", icon: "icon-publish" },
      ]),
      isScroll: true,
    };
  },
  computed: {
    ...mapGetters(["tags"]),
  },
  watch: {
    id() {
      this.handleEdit(this.id);
    },
  },
  methods: {
    convertText() {
      this.wordCount = this.text.length;
      this.html = marked.parse(this.text, { breaks: true }); // 扩展选项
      document.getElementById("html").innerHTML = this.html;
      if (!this.isSave) {
        this.isSave = true;
      }
      hljs.highlightAll();
    },
    handleEdit(id) {
      getArticle({ id })
        .then((res) => {
          this.text = res.data.content;
          this.checkList = res.data.tags;
          this.title = res.data.title;
          this.convertText();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick(index) {
      const markdownHtml = document.getElementById("html").innerHTML;
      const textarea = document.querySelector(".el-textarea__inner");
      switch (index) {
        case 0:
          if (textarea.selectionStart != textarea.selectionEnd) {
            this.text = mark(textarea);
          }
          this.convertText();
          break;

        case 1:
          this.text = codeBlock(textarea);
          this.convertText();
          break;

        case 2:
          this.isSave = false;
          break;

        case 3:
          if (!this.title) {
            this.$message.warning("title 为必填项 ！！！");
            break;
          } else if (!markdownHtml.trim()) {
            this.$message.warning("文章内容不能为空 ！！！");
            break;
          }
          this.$loading({ fullscreen: true });
          updateArticle(this.id, {
            content: markdownHtml,
            title: this.title,
            tags: this.checkList,
          })
            .then(() => {
              this.$message.success("发表成功 !!!");
              this.$loading().close();
              this.$emit("update-article");
            })
            .catch((err) => {
              this.$loading().close();
            });
          break;
      }
    },
    showTags(item) {
      this.tagList = item.tagItems;
    },
  },
  created() {
    this.handleEdit(this.id);
  },
  mounted() {
    window.addEventListener("beforeunload", (e) => {
      // 未保存至草稿箱或是书写内容更新都会弹窗，每次修改就把保存状态设 false
      if (this.isSave) {
        e.returnValue = false;
        if (location.pathname != "/edit") {
          this.$router.push("/edit");
        }
      }
    });

    // 编辑器的联动滚动，由于双方高度的不同需要有比例的关系，并能够平稳滚动
    const textarea = document.querySelector(".el-textarea__inner");
    const markdown = document.querySelector(".markdown-body");

    textarea.addEventListener("mousewheel", () => {
      const rate = Math.ceil(markdown.scrollHeight / textarea.scrollHeight); // 注意顺序 大：小并向上取整
      console.log(rate);
      markdown.scrollTop = textarea.scrollTop * rate;
    });
    markdown.addEventListener("mousewheel", () => {
      const rate = textarea.scrollHeight / markdown.scrollHeight; // 小：大
      textarea.scrollTop = markdown.scrollTop * rate;
    });

    this.convertText();
    this.isSave = false;
  },
};
</script>

<style lang='scss'>
body {
  .el-drawer__body {
    height: 100%;
  }

  // textarea 文本域高度具体由js 计算
  .editor-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    // el-button 会有自己边界大小，会导致计算textarea 高度偏差
    // .el-row:nth-child(1) {
    //   height: 40px;
    // }

    .el-row:nth-child(2) {
      height: 100%;
      .el-col {
        height: 100%;
      }
    }

    .el-row:nth-child(3) {
      height: 20px;
    }

    .navgation-bar {
      display: flex;
      justify-content: space-between;
      height: 100%;

      .navgation-bar_title {
        display: flex;
        flex: 1;

        .el-input__inner {
          height: 100%;
        }

        button {
          position: relative;

          i {
            position: absolute;
            top: 0;
            right: 0;
            width: 18px;
            height: 18px;
            line-height: 18px;
            border-radius: 9px;
            color: #c0c4cc;
            font-style: normal;
            background: #6b6b6b;
          }
        }
      }

      .navgation-bar_buttonWrap {
        display: flex;

        .navgation-bar_buttonBox {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .navgation-bar_button {
          height: 100%;
        }
      }
    }

    .markdown-body {
      height: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 45px;
      overflow: auto;
      background: #fff;
    }

    .el-textarea__inner:focus {
      border: 1px solid #c0c4cc;
    }

    .el-textarea {
      height: 100%;
      background: #f5f5f5;

      .el-textarea__inner {
        resize: none;
        height: 100%;
        background: #f5f5f5;
      }
    }

    .stat-panel {
      height: 100%;
      display: flex;
      gap: 10px;
      background: #6b6b6b;
      color: #fff;
      font: 14px "Helvetica";
    }

    .el-dialog {
      min-width: 400px;

      .el-dialog__body {
        display: flex;
        justify-content: space-between;
        gap: 10px;

        .tabList {
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: 150px;
          min-width: 100px;
          overflow: auto;
          cursor: pointer;

          div:hover {
            background: #e0e0e0d0;
          }
          div {
            height: 2rem;
            line-height: 2rem;
            flex: 1;
            white-space: nowrap;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
}
</style>