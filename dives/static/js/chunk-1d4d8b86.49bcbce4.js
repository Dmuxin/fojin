(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d4d8b86"],{"1c18":function(e,t,a){},"333d":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},n=[];a("a9e3");Math.easeInOutQuad=function(e,t,a,i){return e/=i/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var l=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function s(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(e,t,a){var i=o(),n=e-i,r=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=r;var o=Math.easeInOutQuad(c,i,n,t);s(o),c<t?l(e):a&&"function"===typeof a&&a()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&r(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&r(0,800)}}},u=c,d=(a("e498"),a("2877")),p=Object(d["a"])(u,i,n,!1,null,"6af373ef",null);t["a"]=p.exports},"4e82":function(e,t,a){"use strict";var i=a("23e7"),n=a("1c0b"),l=a("7b0b"),s=a("d039"),o=a("a640"),r=[],c=r.sort,u=s((function(){r.sort(void 0)})),d=s((function(){r.sort(null)})),p=o("sort"),m=u||!d||!p;i({target:"Array",proto:!0,forced:m},{sort:function(e){return void 0===e?c.call(l(this)):c.call(l(this),n(e))}})},6724:function(e,t,a){"use strict";a("8d41");var i="@@wavesContext";function n(e,t){function a(a){var i=Object.assign({},t.value),n=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),l=n.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var s=l.getBoundingClientRect(),o=l.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":(o=document.createElement("span"),o.className="waves-ripple",o.style.height=o.style.width=Math.max(s.width,s.height)+"px",l.appendChild(o)),n.type){case"center":o.style.top=s.height/2-o.offsetHeight/2+"px",o.style.left=s.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(a.pageY-s.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(a.pageX-s.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=n.color,o.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=a:e[i]={removeHandle:a},a}var l={bind:function(e,t){e.addEventListener("click",n(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",n(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},s=function(e){e.directive("waves",l)};window.Vue&&(window.waves=l,Vue.use(s)),l.install=s;t["a"]=l},"8d41":function(e,t,a){},e05a:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{"margin-left":"0px",width:"200px"},attrs:{placeholder:"设备ID"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.device_id,callback:function(t){e.$set(e.listQuery,"device_id",t)},expression:"listQuery.device_id"}}),a("el-input",{staticClass:"filter-item",staticStyle:{"margin-left":"5px",width:"200px"},attrs:{placeholder:"设备名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.device_name,callback:function(t){e.$set(e.listQuery,"device_name",t)},expression:"listQuery.device_name"}}),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"5px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" 搜索 ")]),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"5px"},attrs:{type:"info",icon:"el-icon-circle-plus"},on:{click:e.handleCreate}},[e._v(" 新增 ")]),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"5px"},attrs:{type:"danger",icon:"el-icon-delete"},on:{click:e.handleBatchDelete}},[e._v(" 删除 ")]),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"5px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v(" 导出 ")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center",width:"40"}}),a("el-table-column",{attrs:{label:"设备ID",sortable:"custom",align:"center",width:"110"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.device_id))])]}}])}),a("el-table-column",{attrs:{label:"设备名称",align:"center","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.device_name))])]}}])}),a("el-table-column",{attrs:{label:"日期",width:"160px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(e._f("moment")(i.date,"YYYY-MM-DD HH:mm:ss")))])]}}])}),a("el-table-column",{attrs:{label:"状态","class-name":"status-col",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("el-tag",{attrs:{type:e._f("statusFilter")(i.status)}},[e._v(" "+e._s(i.status)+" ")])]}}])}),a("el-table-column",{attrs:{label:"备注","class-name":"status-col",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(" "+e._s(a.remarks)+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"180","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row,n=t.$index;return[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(t){return e.handleUpdate(i)}}},[e._v(" 编辑 ")]),"deleted"!=i.status?a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(t){return e.handleDelete(i,n)}}},[e._v(" 删除 ")]):e._e()]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"70px"}},[a("el-form-item",{attrs:{label:"设备ID",prop:"device_id"}},[a("el-input",{model:{value:e.temp.device_id,callback:function(t){e.$set(e.temp,"device_id",t)},expression:"temp.device_id"}})],1),a("el-form-item",{attrs:{label:"设备名称",prop:"device_name"}},[a("el-input",{model:{value:e.temp.device_name,callback:function(t){e.$set(e.temp,"device_name",t)},expression:"temp.device_name"}})],1),a("el-form-item",{attrs:{label:"日期",prop:"date"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"Please pick a date"},model:{value:e.temp.date,callback:function(t){e.$set(e.temp,"date",t)},expression:"temp.date"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择"},model:{value:e.temp.status,callback:function(t){e.$set(e.temp,"status",t)},expression:"temp.status"}},e._l(e.statusOptions,(function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"请输入"},model:{value:e.temp.remarks,callback:function(t){e.$set(e.temp,"remarks",t)},expression:"temp.remarks"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(" 取消 ")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v(" 确定 ")])],1)],1),a("el-dialog",{attrs:{visible:e.dialogPvVisible,title:"Reading statistics"},on:{"update:visible":function(t){e.dialogPvVisible=t}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.pvData,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"key",label:"Channel"}}),a("el-table-column",{attrs:{prop:"pv",label:"Pv"}})],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogPvVisible=!1}}},[e._v("Confirm")])],1)],1)],1)},n=[],l=(a("4e82"),a("159b"),a("d3b7"),a("3ca3"),a("ddb0"),a("d81d"),a("99af"),a("b775")),s=a("3a89"),o=s["a"].baseURL1;function r(e){return Object(l["a"])({url:"".concat(o,"/v1/switch/page"),method:"get",params:e})}function c(e){return Object(l["a"])({url:"".concat(o,"/v1/switch"),method:"post",data:e})}function u(e){return Object(l["a"])({url:"".concat(o,"/v1/switch"),method:"put",data:e})}function d(e){return Object(l["a"])({url:"".concat(o,"/v1/switch/").concat(e),method:"delete"})}function p(e){return Object(l["a"])({url:"".concat(o,"/v1/switch/batchdelete"),method:"delete",data:e})}var m=a("6724"),f=a("ed08"),h=a("333d"),g=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],v=g.reduce((function(e,t){return e[t.key]=t.display_name,e}),{}),y={name:"ComplexTable",components:{Pagination:h["a"]},directives:{waves:m["a"]},filters:{statusFilter:function(e){var t={used:"已启用",unused:"未启用"};return t[e]},typeFilter:function(e){return v[e]}},data:function(){return{tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,device_id:"",device_name:"",type:void 0,sort:"+id"},importanceOptions:[1,2,3],calendarTypeOptions:g,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["已启用","未启用"],showReviewer:!1,temp:{device_id:"",device_name:"",date:new Date,status:"",remarks:""},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"新增"},dialogPvVisible:!1,pvData:[],rules:{device_id:[{required:!0,message:"type is required",trigger:"change"}],date:[{type:"date",required:!0,message:"Date is required",trigger:"change"}]},downloadLoading:!1}},setup:function(){},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,r(this.listQuery).then((function(t){var a=t.status,i=t.data;2e4===a&&(e.list=i.items,e.total=i.total,e.listLoading=!1)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"操作Success",type:"success"}),e.status=t},sortChange:function(e){var t=e.prop,a=e.order;"id"===t&&this.sortByID(a)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={device_id:"",device_name:"",date:new Date,status:"",remarks:""}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&c(e.temp).then((function(t){var a=t.status;2e4===a&&(e.dialogFormVisible=!1,e.getList(),e.$notify({title:"操作提示",message:"新增成功",type:"success",duration:3e3}))}))}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.date=new Date(this.temp.date),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var a=Object.assign({},e.temp);u(a).then((function(t){var a=t.status;2e4===a&&(e.dialogFormVisible=!1,e.getList(),e.$notify({title:"操作提示",message:"修改成功",type:"success",duration:3e3}))}))}}))},handleDelete:function(e,t){var a=this;this.$confirm("确定要删除吗？").then((function(){d(e.device_id).then((function(e){var t=e.status;2e4===t&&(a.dialogFormVisible=!1,a.getList(),a.$notify({title:"操作提示",message:"删除成功",type:"success",duration:3e3}))}))})).catch((function(){}))},handleBatchDelete:function(){var e=this;void 0!==this.multipleSelection&&0!==this.multipleSelection.length?this.$confirm("确定要删除吗？").then((function(){var t=[];e.multipleSelection.forEach((function(e){t.push(e.device_id)})),p(t).then((function(t){var a=t.status;2e4===a&&(e.dialogFormVisible=!1,e.getList(),e.$notify({title:"操作提示",message:"批量删除成功",type:"success",duration:3e3}))}))})).catch((function(){})):this.$notify({title:"操作提示",message:"请选择记录！",type:"success",duration:3e3})},handleFetchPv:function(e){var t=this;fetchPv(e).then((function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0}))},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([a.e("chunk-0143048a"),a.e("chunk-2133cd4f")]).then(a.bind(null,"4bf8")).then((function(t){var a=["timestamp","title","type","importance","status"],i=["timestamp","title","type","importance","status"],n=e.formatJson(i);t.export_json_to_excel({header:a,data:n,filename:"table-list"}),e.downloadLoading=!1}))},formatJson:function(e){return this.list.map((function(t){return e.map((function(e){return"timestamp"===e?Object(f["d"])(t[e]):t[e]}))}))},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"},handleSelectionChange:function(e){this.multipleSelection=e}}},b=y,w=a("2877"),_=Object(w["a"])(b,i,n,!1,null,null,null);t["default"]=_.exports},e498:function(e,t,a){"use strict";a("1c18")}}]);