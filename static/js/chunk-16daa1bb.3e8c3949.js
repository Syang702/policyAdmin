(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16daa1bb"],{"0a49":function(t,e,n){"use strict";var a=n("7e3e"),i=n.n(a);i.a},"11e9":function(t,e,n){var a=n("52a7"),i=n("4630"),r=n("6821"),l=n("6a99"),o=n("69a8"),s=n("c69a"),u=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?u:function(t,e){if(t=r(t),e=l(e,!0),s)try{return u(t,e)}catch(n){}if(o(t,e))return i(!a.f.call(t,e),t[e])}},"28e1":function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"d",function(){return r}),n.d(e,"e",function(){return l}),n.d(e,"m",function(){return o}),n.d(e,"o",function(){return s}),n.d(e,"k",function(){return u}),n.d(e,"p",function(){return c}),n.d(e,"i",function(){return d}),n.d(e,"n",function(){return p}),n.d(e,"h",function(){return f}),n.d(e,"g",function(){return m}),n.d(e,"f",function(){return v}),n.d(e,"l",function(){return _}),n.d(e,"j",function(){return h}),n.d(e,"b",function(){return g}),n.d(e,"c",function(){return b});var a=n("b775");function i(){return Object(a["a"])({url:"admin/Vip/classifyList",method:"get"})}function r(t){return Object(a["a"])({url:"admin/Vip/classifyDel",method:"get",params:{id:t}})}function l(){return Object(a["a"])({url:"admin/Vip/getDistribution",method:"get"})}function o(t){return Object(a["a"])({url:"admin/Vip/setDistribution",method:"get",params:t})}function s(t){return Object(a["a"])({url:"admin/Vip/classifyEdit",method:"get",params:t})}function u(t){return Object(a["a"])({url:"admin/user/bill",method:"get",params:t})}function c(t){return Object(a["a"])({url:"admin/Classify/uploadClassify",method:"post",data:t})}function d(t){return Object(a["a"])({url:"admin/Vip/orderList",method:"get",params:t})}function p(t){return Object(a["a"])({url:"admin/Vip/allocationOrder",method:"get",params:t})}function f(t){return Object(a["a"])({url:"admin/Vip/consultList",method:"get",params:t})}function m(t){return Object(a["a"])({url:"admin/Vip/consultDel",method:"get",params:{id:t}})}function v(t){return Object(a["a"])({url:"admin/Vip/consultAdd",method:"post",data:t})}function _(t){return Object(a["a"])({url:"admin/Car/orderList",method:"get",params:t})}function h(t){return Object(a["a"])({url:"admin/Car/orderRetreat",method:"get",params:t})}function g(){return Object(a["a"])({url:"admin/Car/costGet",method:"get"})}function b(t){return Object(a["a"])({url:"admin/Car/costSet",method:"post",data:t})}},"333d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},i=[];n("c5f6");Math.easeInOutQuad=function(t,e,n,a){return t/=a/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function l(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(t,e,n){var a=o(),i=t-a,s=20,u=0;e="undefined"===typeof e?500:e;var c=function t(){u+=s;var o=Math.easeInOutQuad(u,a,i,e);l(o),u<e?r(t):n&&"function"===typeof n&&n()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&s(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&s(0,800)}}},c=u,d=(n("396c"),n("2877")),p=Object(d["a"])(c,a,i,!1,null,"078961d9",null);e["a"]=p.exports},"396c":function(t,e,n){"use strict";var a=n("9ee7"),i=n.n(a);i.a},"5dbc":function(t,e,n){var a=n("d3f4"),i=n("8b97").set;t.exports=function(t,e,n){var r,l=e.constructor;return l!==n&&"function"==typeof l&&(r=l.prototype)!==n.prototype&&a(r)&&i&&i(t,r),t}},"730d":function(t,e,n){},"7e3e":function(t,e,n){},"8b97":function(t,e,n){var a=n("d3f4"),i=n("cb7c"),r=function(t,e){if(i(t),!a(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,a){try{a=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,n){return r(t,n),e?t.__proto__=n:a(t,n),t}}({},!1):void 0),check:r}},9093:function(t,e,n){var a=n("ce10"),i=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return a(t,i)}},"9ee7":function(t,e,n){},aa77:function(t,e,n){var a=n("5ca1"),i=n("be13"),r=n("79e5"),l=n("fdef"),o="["+l+"]",s="​",u=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),d=function(t,e,n){var i={},o=r(function(){return!!l[t]()||s[t]()!=s}),u=i[t]=o?e(p):l[t];n&&(i[n]=u),a(a.P+a.F*o,"String",i)},p=d.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(c,"")),t};t.exports=d},be4c:function(t,e,n){"use strict";n.d(e,"d",function(){return i}),n.d(e,"h",function(){return r}),n.d(e,"a",function(){return l}),n.d(e,"g",function(){return o}),n.d(e,"e",function(){return s}),n.d(e,"b",function(){return u}),n.d(e,"f",function(){return c});var a=n("b775");function i(t){return Object(a["a"])({url:"admin/User/rechargeFeeDeduction",method:"post",data:t})}function r(t){return Object(a["a"])({url:"admin/Vehicle/vehicleAudit",method:"get",params:t})}function l(t){return Object(a["a"])({url:"admin/Vehicle/vehicleAuditYesNo",method:"get",params:t})}function o(t){return Object(a["a"])({url:"admin/User/userList",method:"get",params:t})}function s(t){return Object(a["a"])({url:"admin/Vehicle/vehicleOwnerList",method:"get",params:t})}function u(t){return Object(a["a"])({url:"admin/User/freeze",method:"post",data:t})}function c(t){return Object(a["a"])({url:"admin/User/editUser",method:"post",data:t})}},c5f6:function(t,e,n){"use strict";var a=n("7726"),i=n("69a8"),r=n("2d95"),l=n("5dbc"),o=n("6a99"),s=n("79e5"),u=n("9093").f,c=n("11e9").f,d=n("86cc").f,p=n("aa77").trim,f="Number",m=a[f],v=m,_=m.prototype,h=r(n("2aeb")(_))==f,g="trim"in String.prototype,b=function(t){var e=o(t,!1);if("string"==typeof e&&e.length>2){e=g?e.trim():p(e,3);var n,a,i,r=e.charCodeAt(0);if(43===r||45===r){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+e}for(var l,s=e.slice(2),u=0,c=s.length;u<c;u++)if(l=s.charCodeAt(u),l<48||l>i)return NaN;return parseInt(s,a)}}return+e};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof m&&(h?s(function(){_.valueOf.call(n)}):r(n)!=f)?l(new v(b(e)),n,m):b(e)};for(var y,w=n("9e1e")?u(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;w.length>S;S++)i(v,y=w[S])&&!i(m,y)&&d(m,y,c(v,y));m.prototype=_,_.constructor=m,n("2aba")(a,f,m)}},dc1a:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container",attrs:{align:"right"}},[n("el-input",{staticClass:"margin",staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"请输入用户手机号"},model:{value:t.listQuery.userPhone,callback:function(e){t.$set(t.listQuery,"userPhone",e)},expression:"listQuery.userPhone"}}),t._v(" "),n("el-select",{attrs:{placeholder:"请选择专车类型"},model:{value:t.listQuery.type,callback:function(e){t.$set(t.listQuery,"type",e)},expression:"listQuery.type"}},t._l(t.typeOptions,function(t){return n("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})}),1),t._v(" "),n("el-date-picker",{staticClass:"margin",attrs:{type:"datetime",placeholder:"开始时间","value-format":"yyyy-MM-dd HH:mm:ss",size:"small"},model:{value:t.listQuery.start,callback:function(e){t.$set(t.listQuery,"start",e)},expression:"listQuery.start"}}),t._v(" "),n("el-date-picker",{staticClass:"margin",attrs:{type:"datetime",placeholder:"结束时间","value-format":"yyyy-MM-dd HH:mm:ss",size:"small"},model:{value:t.listQuery.end,callback:function(e){t.$set(t.listQuery,"end",e)},expression:"listQuery.end"}}),t._v(" "),n("el-button",{staticClass:"button",attrs:{size:"small",round:"",plain:"",icon:"el-icon-search"},on:{click:function(e){return t.getList()}}},[t._v("搜索")])],1),t._v(" "),n("Magnify",{attrs:{vSrc:t.imgSrc,vShow:t.imgShow},on:{close:t.closeBigImg}}),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",stripe:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"序号",prop:"id",width:"50"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"会员账号",prop:"userPhone"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"会员昵称",prop:"user_nick_name"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"车主电话",prop:"vehiclePhone"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"车主姓名",prop:"vehicleName"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"车辆型号",prop:"model"}}),t._v(" "),0==t.listQuery.type?n("el-table-column",{attrs:{align:"center",label:"起点位置"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.depart))])]}}],null,!1,1169241328)}):t._e(),t._v(" "),0==t.listQuery.type?n("el-table-column",{attrs:{align:"center",label:"终点位置"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.destination))])]}}],null,!1,3829181146)}):t._e(),t._v(" "),1==t.listQuery.type?n("el-table-column",{attrs:{align:"center",label:"用车时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.use_time))])]}}],null,!1,3669002223)}):t._e(),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"交车时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.type?n("span",[t._v(t._s(e.row.retreat_time))]):t._e()]}}])}),t._v(" "),2==t.listQuery.type?n("el-table-column",{attrs:{align:"center",label:"旅游地点"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.destination))])]}}],null,!1,3829181146)}):t._e(),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"订单类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.type?n("span",[t._v("豪华专车")]):t._e(),t._v(" "),1==e.row.type?n("span",[t._v("预约包车")]):t._e(),t._v(" "),2==e.row.type?n("span",[t._v("旅游专车")]):t._e(),t._v(" "),3==e.row.type?n("span",[t._v("婚庆专车")]):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"订单金额",prop:"money"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"下单时间",prop:"create_time"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"订单状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?n("span",[t._v("待分配")]):t._e(),t._v(" "),1==e.row.status?n("span",[t._v("进行中")]):t._e(),t._v(" "),2==e.row.status?n("span",[t._v("已完成")]):t._e(),t._v(" "),3==e.row.status?n("span",[t._v("已退单")]):t._e(),t._v(" "),5==e.row.status?n("span",[t._v("待支付")]):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"210"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-row",{attrs:{type:"flex",justify:"space-around"}},[n("el-button",{attrs:{size:"small",icon:"el-icon-document",round:"",plain:""},on:{click:function(n){return t.detail(e.row,"详情")}}},[t._v("详情")]),t._v(" "),0==e.row.status?n("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-edit-outline",round:"",plain:""},on:{click:function(n){return t.toShipOrder(e.row.id)}}},[t._v("分配订单")]):t._e()],1)]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.count>0,expression:"count > 0"}],attrs:{total:t.count,page:t.listQuery.pageindex,limit:t.listQuery.pagesize},on:{"update:page":function(e){return t.$set(t.listQuery,"pageindex",e)},"update:limit":function(e){return t.$set(t.listQuery,"pagesize",e)},pagination:t.getList}}),t._v(" "),n("el-dialog",{staticClass:"detailsForm",attrs:{title:"详情",visible:t.detailDialog,width:"40%",center:""},on:{"update:visible":function(e){t.detailDialog=e}}},[n("el-form",{ref:"form",attrs:{model:t.detailData,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"用户手机号"}},[n("div",{staticClass:"el-input__text"},[t._v(t._s(t.detailData.userPhone))])]),t._v(" "),n("el-form-item",{attrs:{label:"用户昵称"}},[n("div",{staticClass:"el-input__text"},[t._v(t._s(t.detailData.user_nick_name))])]),t._v(" "),n("el-form-item",{attrs:{label:"车主手机号"}},[n("div",{staticClass:"el-input__text"},[t._v(t._s(t.detailData.vehiclePhone))])]),t._v(" "),n("el-form-item",{attrs:{label:"车主姓名"}},[n("div",{staticClass:"el-input__text"},[t._v(t._s(t.detailData.vehicleName))])]),t._v(" "),n("el-form-item",{attrs:{label:"车辆型号"}},[n("div",{staticClass:"el-input__text"},[t._v(t._s(t.detailData.model))])]),t._v(" "),n("el-form-item",{attrs:{label:"订单金额"}},[n("div",{staticClass:"el-input__text"},[t._v(t._s(t.detailData.money))])]),t._v(" "),n("el-form-item",{attrs:{label:"订单类型"}},[n("div",{staticClass:"el-input__text"},[0==t.detailData.type?n("span",[t._v("豪华专车")]):t._e(),t._v(" "),1==t.detailData.type?n("span",[t._v("预约包车")]):t._e(),t._v(" "),2==t.detailData.type?n("span",[t._v("旅游专项")]):t._e(),t._v(" "),3==t.detailData.type?n("span",[t._v("婚庆专车")]):t._e()])]),t._v(" "),n("el-form-item",{attrs:{label:"订单状态"}},[n("div",{staticClass:"el-input__text"},[0==t.detailData.status?n("span",[t._v("待分配")]):t._e(),t._v(" "),1==t.detailData.status?n("span",[t._v("进行中")]):t._e(),t._v(" "),2==t.detailData.status?n("span",[t._v("已完成")]):t._e(),t._v(" "),3==t.detailData.status?n("span",[t._v("已退单")]):t._e(),t._v(" "),5==t.detailData.status?n("span",[t._v("待支付")]):t._e()])])],1)],1),t._v(" "),n("el-dialog",{staticClass:"detailsForm",attrs:{title:"分配订单",visible:t.shipmentsDialog,width:"30%",center:""},on:{"update:visible":function(e){t.shipmentsDialog=e}}},[n("el-form",{ref:"shipForm",attrs:{model:t.shipForm,"label-width":"120px",rules:t.rules}},[n("el-form-item",{attrs:{label:"订单ID",prop:"id"}},[n("el-input",{attrs:{disabled:!0},model:{value:t.shipForm.id,callback:function(e){t.$set(t.shipForm,"id",t._n(e))},expression:"shipForm.id"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"车主"}},[n("v-selectpage",{staticClass:"form-control",attrs:{data:t.ownerList,"key-field":"id",title:"请选择车主","show-field":"phone"},model:{value:t.shipForm.vid,callback:function(e){t.$set(t.shipForm,"vid",e)},expression:"shipForm.vid"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",plain:"",round:""},on:{click:function(e){return t.shipSubmit("shipForm")}}},[t._v("提 交")]),t._v(" "),n("el-button",{attrs:{plain:"",round:""},on:{click:function(e){t.shipmentsDialog=!1}}},[t._v("取 消")])],1)],1)],1)],1)},i=[],r=n("cebc"),l=n("28e1"),o=n("be4c"),s=n("333d"),u=n("f158"),c={components:{Pagination:s["a"],Magnify:u["a"]},data:function(){return{imgSrc:"",imgShow:!1,currencyList:[],dialogFormVisible:!1,listQuery:{page:1,size:10,userPhone:"",start:"",end:"",type:""},ownerList:[],count:0,temp:{},title:"",listLoading:!1,list:[],id:null,activateId:null,typeOptions:[{id:"",label:"全部"},{id:0,label:"豪华专车"},{id:1,label:"预约包车"},{id:2,label:"旅游专车"},{id:3,label:"婚庆专车"}],orderdetail:[],detailDialog:!1,detailData:{},shipmentsDialog:!1,shipForm:{id:"",vid:""},rules:{vid:[{required:!0,message:"请选择车主",trigger:"blur"}]},vidQuery:{page:1,size:10,phone:"",start:"",end:"",status:""}}},created:function(){var t=this;Object(o["e"])(this.vidQuery).then(function(e){t.ownerList=e.data}),this.getList()},methods:{enlargeImg:function(t){this.imgSrc=t,this.imgShow=!0},closeBigImg:function(){this.imgShow=!1},getList:function(){var t=this;this.listLoading=!0,null==this.listQuery.end?this.listQuery.end="":null==this.listQuery.start&&(this.listQuery.start=""),Object(l["l"])(this.listQuery).then(function(e){t.list=e.data,t.count=e.count,t.listLoading=!1})},detail:function(t){this.detailDialog=!0,this.detailData=Object(r["a"])({},t)},toShipOrder:function(t){this.shipmentsDialog=!0,this.shipForm={id:"",vid:""},this.shipForm.id=t},shipSubmit:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;Object(l["n"])(e.shipForm).then(function(t){e.shipmentsDialog=!1,e.getList()})})}}},d=c,p=(n("edf7"),n("2877")),f=Object(p["a"])(d,a,i,!1,null,"65b71e0c",null);e["default"]=f.exports},edf7:function(t,e,n){"use strict";var a=n("730d"),i=n.n(a);i.a},f158:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.vShow,expression:"vShow"}],staticClass:"originImgBg",on:{click:function(e){return t.close()}}},[n("div",{staticClass:"box"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:t.vSrc,alt:"",title:"点击缩小"}})])])])},i=[],r={name:"OriginImg",props:["vSrc","vShow"],methods:{close:function(){this.$emit("close")}}},l=r,o=(n("0a49"),n("2877")),s=Object(o["a"])(l,a,i,!1,null,"92616786",null);e["a"]=s.exports},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);