(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b5968"],{"1a13":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"ID",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index)+" ")]}}])}),a("el-table-column",{attrs:{label:"用户"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticStyle:{display:"flex",gap:"20px"}},[a("div",[a("img",{staticStyle:{height:"40px"},attrs:{src:e.row.avatar,alt:""}})]),a("div",{staticStyle:{height:"40px","line-height":"40px"}},[t._v(" "+t._s(e.row.username)+" ")])])]}}])}),a("el-table-column",{attrs:{label:"邮箱"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.email)+" ")]}}])}),a("el-table-column",{attrs:{"class-name":"status-col",label:"用户权限",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:t.roleComputed(e.row.role),effect:"dark"}},[t._v(t._s(e.row.role))])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"created_at",label:"操作",width:"200"}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:""}}),a("el-button",{attrs:{type:"warning",icon:"el-icon-star-off",circle:""}}),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""}})],1)],1)],1)},n=[],i=a("c24f"),r={data:function(){return{list:null,listLoading:!0}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.listLoading=!0,Object(i["d"])().then((function(e){console.log(e),t.list=e.data,t.listLoading=!1}))},roleComputed:function(t){var e={normal:"",admin:"warning"};return e[t]}}},o=r,s=a("2877"),c=Object(s["a"])(o,l,n,!1,null,null,null);e["default"]=c.exports}}]);