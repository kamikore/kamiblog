<template>
  <div class="editor-container" ref="text">
    <!-- bootstrap 的栅格系统 -->
    <el-row>
      <el-col :span="24">
        <div class="navgation-bar">
          <div class="navgation-bar_title">
            <el-input
              type="text"
              v-model="title"
              maxlength="100"
              placeholder=" 请输入文章标题（5~100个字）"
              show-word-limit
            />
            <el-button @click="dialogVisible = true">
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
        <el-input
          type="textarea"
          v-model="text"
          @input="convertText"
          ref="test"
        ></el-input>
      </el-col>
      <el-col :span="12">
        <div class="markdown-body" id="html"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="stat-panel">
          <span>Markdown</span>
          <span>{{ this.wordCount }} 字数</span>
          <span>{{ this.column }} 行数</span>
        </div>
      </el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="文章标题选择" width="30%">
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
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引入编辑器工具栏 工具函数
import { mark, codeBlock } from "@/utils/edit";
import { dataTime } from "@/utils/date";
const hljs = require("highlight.js");
const marked = require("marked");

// 原生事件 ，事件在浏览器窗口被调整大小时发生, 在mounted 时就立即触发一次
window.onresize = () => {
  const bodyHeight = document.body.clientHeight;
  const textarea = document.querySelector(".el-row:nth-child(2)");
  const tabBar = document.querySelector(".tab-bar").clientHeight;
  const navgationBar =
    document.querySelector(".navgation-bar").clientHeight || "";
  const statPanel = document.querySelector(".stat-panel").clientHeight;
  textarea.style.height = `${bodyHeight - tabBar - navgationBar - statPanel}px`;
};

export default {
  data() {
    return {
      html: "",
      text: ` Marked - Markdown Parser
========================

[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

How To Use The Demo
-------------------

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.

Why Markdown?
-------------

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/`,
      title: "",
      // 文章是否已保存,默认是未编辑所以是true
      isSave: true,
      // 当保存至草稿箱，后续的保存都是对该文章的update
      draftID: null,
      checkList: [],
      tagList: [],
      dialogVisible: false,
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
    ...mapGetters(["tags", "userInfo"]),
  },
  watch: {
    $route: {
      handler: function () {
        if (!this.isSave) {
          this.$api.user.updateEditTemp(
            { content: this.text },
            this.userInfo._id
          );
        }
        // 注意凡是修改 vuex 都要调用 mutations
        this.$store.dispatch("change_userInfoTemp", this.text);
      },
    },
    userInfo() {
      this.text = this.userInfo.editTemp;
    },
  },
  methods: {
    convertText() {
      this.wordCount = this.text.length;
      this.html = marked(this.text, { breaks: true }); // 扩展选项
      document.getElementById("html").innerHTML = this.html;
      if (this.isSave) {
        this.isSave = false;
      }
      hljs.highlightAll();
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
          this.isSave = true;
          this.$loading({ fullscreen: true });
          this.$api.user.updateEditTemp({ content: null }, this.userInfo._id);
          this.userInfo.editTemp = null;
          if (!this.draftID) {
            // 真正的创建草稿箱文章
            this.$api.article
              .publishRequest({
                content: this.text,
                uid: this.userInfo._id,
                title: this.title || " ",
                tags: this.checkList,
              })
              .then((res) => {
                this.$message.success(
                  "已保存到草稿箱，可转到后台管理页面查看个人文章 !!!"
                );
                this.draftID = res.data._id;
                this.$loading().close();
              })
              .catch(() => {
                this.$loading().close();
              });
          } else {
            // 更新草稿箱文章
            this.$api.article
              .updateDraft(
                {
                  content: this.text,
                  title: this.title,
                  tags: this.checkList,
                },
                this.draftID
              )
              .then(() => {
                this.$message.success(
                  "已保存到草稿箱，可转到后台管理页面查看个人文章 !!!"
                );
                this.$loading().close();
              })
              .catch(() => {
                this.$loading().close();
              });
          }
          break;

        case 3:
          if (!this.title) {
            this.$message.warning(" 文章的标题不能为空 ！！！");
            break;
          } else if (this.title.length < 5) {
            this.$message.warning(" 文章的标题不能少于5个字符 ！！！");
            break;
          } else if (!markdownHtml.trim()) {
            this.$message.warning("文章内容不能为空 ！！！");
            break;
          } else if (!this.checkList.length > 0) {
            this.$message.warning("文章的标签不能为空 ！！！");
            break;
          }
          this.$loading({ fullscreen: true });
          this.$api.article
            .publishRequest({
              content: this.text,
              uid: this.userInfo._id,
              title: this.title,
              tags: this.checkList,
              status: "published",
            })
            .then(() => {
              this.$message.success("发表成功 !!!");
              this.$loading().close();
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
  mounted() {
    window.onresize();
    window.addEventListener("beforeunload", (e) => {
      // 未保存至草稿箱或是书写内容更新都会弹窗，每次修改就把保存状态设 false
      if (!this.isSave) {
        e.returnValue = false;
        if (location.pathname != "/edit") {
          this.$router.push("/edit");
        }
      }
      this.$api.user.updateEditTemp({ content: this.text }, this.userInfo._id);
    });

    // 编辑器的联动滚动，由于双方高度的不同需要有比例的关系，并能够平稳滚动
    const textarea = document.querySelector(".el-textarea__inner");
    const markdown = document.querySelector(".markdown-body");

    textarea.addEventListener("mousewheel", () => {
      const rate = Math.ceil(markdown.scrollHeight / textarea.scrollHeight); // 注意顺序 大：小并向上取整
      markdown.scrollTop = textarea.scrollTop * rate;
    });
    markdown.addEventListener("mousewheel", () => {
      const rate = textarea.scrollHeight / markdown.scrollHeight; // 小：大
      textarea.scrollTop = markdown.scrollTop * rate;
    });

    // 剪贴图片
    textarea.addEventListener("paste", (event) => {
      navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.clipboard.read().then((data) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].types.includes("image/png")) {
                data[i].getType("image/png").then((blob) => {
                  let fileName = `image-${dataTime(new Date())}`;
                  let reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onload = () => {
                    this.$api.article
                      .uploadImg({
                        uid: this.userInfo._id,
                        fileName,
                        imgFile: reader.result,
                        type: blob.type.split("/")[1],
                      })
                      .then((res) => {
                        const text = [...textarea.value];
                        const markdown_image = `![${fileName}](${res.data.url})\n`;
                        //在光标位置插入 image markdown语法
                        text.splice(textarea.selectionStart, 0, markdown_image);
                        this.text = text.join("");
                        this.convertText();
                      });
                  };
                });
              }
            }
          });
        }
      });
    });

    this.convertText();
    this.isSave = false;
  },
};
</script>

<style lang='less'>
.placeholder {
  height: 75px;
  line-height: 75px;
}

body {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

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