(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4493ec82"],{"49d7":function(e,t,n){"use strict";n.r(t);var i=n("7a23"),a={class:"editor-container",ref:"text"},o={class:"navgation-bar"},r={class:"navgation-bar_title"},c=Object(i["q"])(" 标签选择 "),s={class:"navgation-bar_buttonWrap"},l=Object(i["n"])("div",{class:"markdown-body",id:"html"},null,-1),u={class:"stat-panel"},d=Object(i["n"])("span",null,"Markdown",-1),h={class:"tabList"},b=["onClick"],f=Object(i["n"])("span",null,"最多可选择5个标签 ！！",-1),g={class:"dialog-footer"},m=Object(i["q"])("Cancel"),p=Object(i["q"])("Confirm");function j(e,t,n,j,v,O){var w=this,k=Object(i["R"])("el-input"),y=Object(i["R"])("el-button"),x=Object(i["R"])("el-col"),T=Object(i["R"])("el-row"),I=Object(i["R"])("el-checkbox"),L=Object(i["R"])("el-checkbox-group"),_=Object(i["R"])("el-dialog");return Object(i["I"])(),Object(i["m"])("div",a,[Object(i["r"])(T,null,{default:Object(i["eb"])((function(){return[Object(i["r"])(x,{span:24},{default:Object(i["eb"])((function(){return[Object(i["n"])("div",o,[Object(i["n"])("div",r,[Object(i["r"])(k,{type:"text",modelValue:v.title,"onUpdate:modelValue":t[0]||(t[0]=function(e){return v.title=e}),maxlength:"100",placeholder:" 请输入文章标题（5~100个字）","show-word-limit":""},null,8,["modelValue"]),Object(i["r"])(y,{onClick:t[1]||(t[1]=function(e){return v.dialogVisible=!0})},{default:Object(i["eb"])((function(){return[c,Object(i["n"])("i",null,Object(i["V"])(v.checkList.length),1)]})),_:1})]),Object(i["n"])("div",s,[(Object(i["I"])(!0),Object(i["m"])(i["b"],null,Object(i["P"])(v.buttonList,(function(e,t){return Object(i["I"])(),Object(i["m"])("div",{class:"navgation-bar_buttonBox",key:e.id},[Object(i["r"])(y,{class:Object(i["A"])(["navgation-bar_button iconfont",e.icon]),onClick:function(e){return O.handleClick(t)}},{default:Object(i["eb"])((function(){return[Object(i["q"])(Object(i["V"])(e.text),1)]})),_:2},1032,["class","onClick"])])})),128))])])]})),_:1})]})),_:1}),Object(i["r"])(T,null,{default:Object(i["eb"])((function(){return[Object(i["r"])(x,{span:12},{default:Object(i["eb"])((function(){return[Object(i["r"])(k,{type:"textarea",modelValue:v.text,"onUpdate:modelValue":t[2]||(t[2]=function(e){return v.text=e}),onInput:O.convertText,ref:"test"},null,8,["modelValue","onInput"])]})),_:1}),Object(i["r"])(x,{span:12},{default:Object(i["eb"])((function(){return[l]})),_:1})]})),_:1}),Object(i["r"])(T,null,{default:Object(i["eb"])((function(){return[Object(i["r"])(x,{span:24},{default:Object(i["eb"])((function(){return[Object(i["n"])("div",u,[d,Object(i["n"])("span",null,Object(i["V"])(w.wordCount)+" 字数",1),Object(i["n"])("span",null,Object(i["V"])(w.column)+" 行数",1)])]})),_:1})]})),_:1}),Object(i["r"])(_,{modelValue:v.dialogVisible,"onUpdate:modelValue":t[6]||(t[6]=function(e){return v.dialogVisible=e}),title:"文章标题选择",width:"30%"},{footer:Object(i["eb"])((function(){return[f,Object(i["n"])("span",g,[Object(i["r"])(y,{onClick:t[4]||(t[4]=function(e){return v.dialogVisible=!1})},{default:Object(i["eb"])((function(){return[m]})),_:1}),Object(i["r"])(y,{type:"primary",onClick:t[5]||(t[5]=function(e){return v.dialogVisible=!1})},{default:Object(i["eb"])((function(){return[p]})),_:1})])]})),default:Object(i["eb"])((function(){return[Object(i["n"])("div",h,[(Object(i["I"])(!0),Object(i["m"])(i["b"],null,Object(i["P"])(e.tags,(function(e){return Object(i["I"])(),Object(i["m"])("div",{key:e.id,onClick:function(t){return O.showTags(e)}},Object(i["V"])(e.tag),9,b)})),128))]),Object(i["r"])(L,{modelValue:v.checkList,"onUpdate:modelValue":t[3]||(t[3]=function(e){return v.checkList=e}),max:5},{default:Object(i["eb"])((function(){return[(Object(i["I"])(!0),Object(i["m"])(i["b"],null,Object(i["P"])(v.tagList,(function(e){return Object(i["I"])(),Object(i["k"])(I,{key:e.id,label:e},null,8,["label"])})),128))]})),_:1},8,["modelValue"])]})),_:1},8,["modelValue"])],512)}var v=n("2909"),O=n("5530"),w=(n("dca8"),n("498a"),n("caad"),n("2532"),n("ac1f"),n("1276"),n("99af"),n("a434"),n("a15b"),n("5502"));function k(e){console.log(e.selectionEnd);var t=Object(v["a"])(e.value);return t.splice(e.selectionStart,0,"<mark>"),t.splice(e.selectionEnd+1,0,"</mark>"),t.join("")}function y(e){var t=Object(v["a"])(e.value),n="\n```\n\n```\n";return t.splice(e.selectionStart,0,n),x(e,e.selectionStart+5),t.join("")}function x(e,t){var n=e.value,i=n.length;i<t||setTimeout((function(){if(e.focus(),e.setSelectionRange)e.setSelectionRange(t,t);else{var n=e.createTextRange();n.moveStart("character",-i),n.moveEnd("character",-i),n.moveStart("character",t),n.moveEnd("character",0),n.select()}}),10)}var T=n("c466"),I=n("1487"),L=n("0e54");window.onresize=function(){var e=document.body.clientHeight,t=document.querySelector(".el-row:nth-child(2)"),n=document.querySelector(".tab-bar").clientHeight,i=document.querySelector(".navgation-bar").clientHeight||"",a=document.querySelector(".stat-panel").clientHeight;t.style.height="".concat(e-n-i-a,"px")};var _={data:function(){return{html:"",text:" Marked - Markdown Parser\n========================\n\n[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\nHow To Use The Demo\n-------------------\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/",title:"",isSave:!0,draftID:null,checkList:[],tagList:[],dialogVisible:!1,wordCount:"0",column:"0",buttonList:Object.freeze([{text:"标记",icon:"icon-Marker"},{text:"插入代码块",icon:"icon-code"},{text:"存至草稿箱",icon:"icon-edit"},{text:"发表",icon:"icon-publish"}]),isScroll:!0}},computed:Object(O["a"])({},Object(w["b"])(["tags","userInfo"])),watch:{$route:{handler:function(){this.isSave||this.$api.user.updateEditTemp({content:this.text},this.userInfo._id),this.$store.dispatch("change_userInfoTemp",this.text)}},userInfo:function(){this.text=this.userInfo.editTemp}},methods:{convertText:function(){this.wordCount=this.text.length,this.html=L(this.text,{breaks:!0}),document.getElementById("html").innerHTML=this.html,this.isSave&&(this.isSave=!1),I.highlightAll()},handleClick:function(e){var t=this,n=document.getElementById("html").innerHTML,i=document.querySelector(".el-textarea__inner");switch(e){case 0:i.selectionStart!=i.selectionEnd&&(this.text=k(i)),this.convertText();break;case 1:this.text=y(i),this.convertText();break;case 2:this.isSave=!0,this.$loading({fullscreen:!0}),this.$api.user.updateEditTemp({content:null},this.userInfo._id),this.userInfo.editTemp=null,this.draftID?this.$api.article.updateDraft({content:this.text,title:this.title,tags:this.checkList},this.draftID).then((function(){t.$message.success("已保存到草稿箱，可转到后台管理页面查看个人文章 !!!"),t.$loading().close()})).catch((function(){t.$loading().close()})):this.$api.article.publishRequest({content:this.text,uid:this.userInfo._id,title:this.title||" ",tags:this.checkList}).then((function(e){t.$message.success("已保存到草稿箱，可转到后台管理页面查看个人文章 !!!"),t.draftID=e.data._id,t.$loading().close()})).catch((function(){t.$loading().close()}));break;case 3:if(!this.title){this.$message.warning(" 文章的标题不能为空 ！！！");break}if(this.title.length<5){this.$message.warning(" 文章的标题不能少于5个字符 ！！！");break}if(!n.trim()){this.$message.warning("文章内容不能为空 ！！！");break}if(!this.checkList.length>0){this.$message.warning("文章的标签不能为空 ！！！");break}this.$loading({fullscreen:!0}),this.$api.article.publishRequest({content:this.text,uid:this.userInfo._id,title:this.title,tags:this.checkList,status:"published"}).then((function(){t.$message.success("发表成功 !!!"),t.$loading().close()})).catch((function(e){t.$loading().close()}));break}},showTags:function(e){this.tagList=e.tagItems}},mounted:function(){var e=this;window.onresize(),window.addEventListener("beforeunload",(function(t){e.isSave||(t.returnValue=!1,"/edit"!=location.pathname&&e.$router.push("/edit")),e.$api.user.updateEditTemp({content:e.text},e.userInfo._id)}));var t=document.querySelector(".el-textarea__inner"),n=document.querySelector(".markdown-body");t.addEventListener("mousewheel",(function(){var e=Math.ceil(n.scrollHeight/t.scrollHeight);n.scrollTop=t.scrollTop*e})),n.addEventListener("mousewheel",(function(){var e=t.scrollHeight/n.scrollHeight;t.scrollTop=n.scrollTop*e})),t.addEventListener("paste",(function(n){navigator.permissions.query({name:"clipboard-read"}).then((function(n){"granted"!=n.state&&"prompt"!=n.state||navigator.clipboard.read().then((function(n){for(var i=0;i<n.length;i++)n[i].types.includes("image/png")&&n[i].getType("image/png").then((function(n){var i="image-".concat(Object(T["b"])(new Date)),a=new FileReader;a.readAsDataURL(n),a.onload=function(){e.$api.article.uploadImg({uid:e.userInfo._id,fileName:i,imgFile:a.result,type:n.type.split("/")[1]}).then((function(n){var a=Object(v["a"])(t.value),o="![".concat(i,"](").concat(n.data.url,")\n");a.splice(t.selectionStart,0,o),e.text=a.join(""),e.convertText()}))}}))}))}))})),this.convertText(),this.isSave=!1}};n("7336");_.render=j;t["default"]=_},7336:function(e,t,n){"use strict";n("e31d")},"99af":function(e,t,n){"use strict";var i=n("23e7"),a=n("d039"),o=n("e8b5"),r=n("861d"),c=n("7b0b"),s=n("50c4"),l=n("8418"),u=n("65f0"),d=n("1dde"),h=n("b622"),b=n("2d00"),f=h("isConcatSpreadable"),g=9007199254740991,m="Maximum allowed index exceeded",p=b>=51||!a((function(){var e=[];return e[f]=!1,e.concat()[0]!==e})),j=d("concat"),v=function(e){if(!r(e))return!1;var t=e[f];return void 0!==t?!!t:o(e)},O=!p||!j;i({target:"Array",proto:!0,forced:O},{concat:function(e){var t,n,i,a,o,r=c(this),d=u(r,0),h=0;for(t=-1,i=arguments.length;t<i;t++)if(o=-1===t?r:arguments[t],v(o)){if(a=s(o.length),h+a>g)throw TypeError(m);for(n=0;n<a;n++,h++)n in o&&l(d,h,o[n])}else{if(h>=g)throw TypeError(m);l(d,h++,o)}return d.length=h,d}})},a15b:function(e,t,n){"use strict";var i=n("23e7"),a=n("44ad"),o=n("fc6a"),r=n("a640"),c=[].join,s=a!=Object,l=r("join",",");i({target:"Array",proto:!0,forced:s||!l},{join:function(e){return c.call(o(this),void 0===e?",":e)}})},a434:function(e,t,n){"use strict";var i=n("23e7"),a=n("23cb"),o=n("a691"),r=n("50c4"),c=n("7b0b"),s=n("65f0"),l=n("8418"),u=n("1dde"),d=u("splice"),h=Math.max,b=Math.min,f=9007199254740991,g="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!d},{splice:function(e,t){var n,i,u,d,m,p,j=c(this),v=r(j.length),O=a(e,v),w=arguments.length;if(0===w?n=i=0:1===w?(n=0,i=v-O):(n=w-2,i=b(h(o(t),0),v-O)),v+n-i>f)throw TypeError(g);for(u=s(j,i),d=0;d<i;d++)m=O+d,m in j&&l(u,d,j[m]);if(u.length=i,n<i){for(d=O;d<v-i;d++)m=d+i,p=d+n,m in j?j[p]=j[m]:delete j[p];for(d=v;d>v-i+n;d--)delete j[d-1]}else if(n>i)for(d=v-i;d>O;d--)m=d+i-1,p=d+n-1,m in j?j[p]=j[m]:delete j[p];for(d=0;d<n;d++)j[d+O]=arguments[d+2];return j.length=v-i+n,u}})},e31d:function(e,t,n){}}]);
//# sourceMappingURL=chunk-4493ec82.bd3a7dff.js.map