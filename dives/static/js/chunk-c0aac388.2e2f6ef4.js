(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c0aac388"],{3062:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"building"}},[i("body",[i("el-header",[i("h1",[t._v("数据可视化")]),i("div",{staticClass:"showTime"},[t._v(t._s(t.currentTime))])]),i("section",{staticClass:"mainbox"},[i("div",{staticClass:"column"},[i("div",{staticClass:"panel bar"},[i("h2",[t._v("柱形图-应用行业")]),i("div",{ref:"bar1",staticClass:"chart"}),i("div",{staticClass:"panel-footer"})]),i("div",{staticClass:"panel line"},[t._m(0),i("div",{ref:"line1",staticClass:"chart"},[t._v("图表")]),i("div",{staticClass:"panel-footer"})]),i("div",{staticClass:"panel pie"},[i("h2",[t._v("饼形图-年龄分布")]),i("div",{ref:"pie1",staticClass:"chart"},[t._v("图表")]),i("div",{staticClass:"panel-footer"})])]),t._m(1),i("div",{staticClass:"column"},[i("div",{staticClass:"panel bar2"},[i("h2",[t._v("各项功效使用率")]),i("div",{ref:"bar2",staticClass:"chart"},[t._v("图表")]),i("div",{staticClass:"panel-footer"})]),i("div",{staticClass:"panel line2"},[i("h2",[t._v("折线图-使用量")]),i("div",{ref:"line2",staticClass:"chart"},[t._v("图表")]),i("div",{staticClass:"panel-footer"})]),i("div",{staticClass:"panel pie2"},[i("h2",[t._v("饼形图-地区分布")]),i("div",{ref:"pie2",staticClass:"chart"},[t._v("图表")]),i("div",{staticClass:"panel-footer"})])])])],1)])},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h2",[t._v(" 折线图-人员变化 "),i("a",{attrs:{href:"javacript:;"}},[t._v("2020")]),i("a",{attrs:{href:"javascript:;"}},[t._v("2021")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"column"},[i("div",{staticClass:"no"},[i("div",{staticClass:"no-hd"},[i("ul",[i("li",[t._v("125811")]),i("li",[t._v("100")])])]),i("div",{staticClass:"no-bd"},[i("ul",[i("li",[t._v("总抄写次数")]),i("li",[t._v("今日抄写次数")])])])])])}],o=(i("fb6a"),i("313e")),s=i.n(o),n={data:function(){return{zhu:[712,350,610,793,664],timer:"",currentTime:new Date,chartColumn:null,chart4:null,option:{color:["#2f89cf"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"0%",top:"10px",right:"0%",bottom:"4%",containLabel:!0},xAxis:[{type:"category",data:["旅游行业","教育培训","游戏行业","医疗行业","福利院","社交行业","金融行业"],axisTick:{alignWithLabel:!0},axisLabel:{color:"rgba(255,255,255,.6) ",fontSize:"12"},axisLine:{show:!1}}],yAxis:[{type:"value",axisLabel:{color:"rgba(255,255,255,.6) ",fontSize:12},axisLine:{lineStyle:{color:"rgba(255,255,255,.1)",width:2}},splitLine:{lineStyle:{color:"rgba(255,255,255,.1)"}}}],series:[{name:"直接访问",type:"bar",barWidth:"35%",data:[200,300,300,900,1500,1200,600],itemStyle:{barBorderRadius:5}}]}}},created:function(){var t=this;t.timer=setInterval((function(){var e=(new Date).getFullYear(),i=t.appendZero((new Date).getMonth()+1),a=t.appendZero((new Date).getDate()),r=t.appendZero((new Date).getHours()),o=t.appendZero((new Date).getMinutes()),s=t.appendZero((new Date).getSeconds());t.currentTime=e+"/"+i+"/"+a+" "+r+":"+o+"分"+s+"秒"}),1e3)},beforeDestroy:function(){this.timer&&clearInterval(this.timer)},mounted:function(){this.initChart3(),this.initChart(),this.initChart2(),this.initChart4(),this.initChart5(),this.initChart6()},methods:{appendZero:function(t){return t<10?"0"+t:t},changeOption:function(){var t=Math.floor(12*Math.random()),e=this.data.slice(t,t+6);this.option.series[0].data=e,this.chartColumn.setOption(this.option)},initChart:function(){this.chartColumn=s.a.init(this.$refs.bar1),this.chartColumn.setOption(this.option),window.onresize=function(){this.chart1.resize()}},initChart2:function(){var t=["#1089E7","#F57474","#56D0E3","#F8B448","#8B78F6"],e={grid:{top:"10%",left:"22%",bottom:"10%"},xAxis:{show:!1},yAxis:[{type:"category",inverse:!0,data:["开启智慧","消除罪孽","解除怨结","延延益寿","考试顺利"],axisLine:{show:!1},axisTick:{show:!1},axisLabel:{color:"#fff"}},{data:this.zhu,inverse:!0,axisLine:{show:!1},axisTick:{show:!1},axisLabel:{color:"#fff"}}],series:[{name:"条",type:"bar",data:[70,80,60,78,69],yAxisIndex:0,itemStyle:{barBorderRadius:20,color:function(e){return t[e.dataIndex]}},barCategoryGap:50,barWidth:10,label:{show:!0,position:"inside",formatter:"{c}%"}},{name:"框",type:"bar",barCategoryGap:50,barWidth:15,yAxisIndex:1,data:[100,100,100,100,100],itemStyle:{color:"none",borderColor:"#00c1de",borderWidth:3,barBorderRadius:15}}]};this.echarts2=s.a.init(this.$refs.bar2),this.echarts2.setOption(e),window.onresize=function(){this.chart2.resize()}},initChart3:function(){var t=[{year:"2020",data:[[24,40,101,134,90,230,210,230,120,230,210,120],[40,64,191,324,290,330,310,213,180,200,180,79]]},{year:"2021",data:[[123,175,112,197,121,67,98,21,43,64,76,38],[143,131,165,123,178,21,82,64,43,60,19,34]]}],e={color:["#00f2f1","#ed3f35"],tooltip:{trigger:"axis"},legend:{textStyle:{color:"#4c9bfd"},right:"10%"},grid:{top:"20%",left:"3%",right:"4%",bottom:"3%",show:!0,borderColor:"#012f4a",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],axisTick:{show:!1},axisLabel:{color:"#4c9bfd"},axisLine:{show:!1}},yAxis:{type:"value",axisTick:{show:!1},axisLabel:{color:"#4c9bfd"},axisLine:{show:!1},splitLine:{lineStyle:{color:"#012f4a"}}},series:[{name:"新增会员",type:"line",smooth:!0,data:t[0].data[0]},{name:"新增普通账号",type:"line",smooth:!0,data:t[0].data[1]}]};this.chart3=s.a.init(this.$refs.line1),this.chart3.setOption(e),window.onresize=function(){this.chart3.resize()}},initChart4:function(){var t={color:["#006cff","#60cda0","#ed8884","#ff9f7f","#0096ff","#9fe6b8","#32c5e9","#1d9dff"],tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{bottom:"0%",itemWidth:10,itemHeight:10,textStyle:{color:"rgba(255,255,255,.5)",fontSize:"12"}},series:[{name:"地区分布",type:"pie",radius:["10%","70%"],center:["50%","50%"],roseType:"radius",label:{fontSize:10},labelLine:{length:6,length2:8},data:[{value:20,name:"云南"},{value:26,name:"北京"},{value:24,name:"山东"},{value:25,name:"河北"},{value:20,name:"江苏"}]}]};this.echarts3=s.a.init(this.$refs.pie2),this.echarts3.setOption(t),window.onresize=function(){this.echarts3.resize()}},initChart5:function(){var t={color:["#065aab","#066eab","#0682ab","#0696ab","#06a0ab"],tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{bottom:"0%",itemWidth:10,itemHeight:10,textStyle:{color:"rgba(255,255,255,.5)",fontSize:"12"}},series:[{name:"年龄分布",type:"pie",radius:["40%","60%"],center:["50%","45%"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},labelLine:{show:!1},data:[{value:1,name:"0岁以下"},{value:4,name:"20-29岁"},{value:2,name:"30-39岁"},{value:2,name:"40-49岁"},{value:1,name:"50岁以上"}]}]};this.echarts5=s.a.init(this.$refs.pie1),this.echarts5.setOption(t),window.onresize=function(){this.echarts5.resize()}},initChart6:function(){var t={tooltip:{trigger:"axis"},legend:{top:"0%",data:["平板","手写本"],textStyle:{color:"rgba(255,255,255,.5)",fontSize:"12"}},grid:{left:"10",top:"30",right:"10",bottom:"10",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],axisLabel:{textStyle:{color:"rgba(255,255,255,.6)",fontSize:12}},axisLine:{lineStyle:{color:"rgba(255,255,255,.2)"}}}],yAxis:[{type:"value",axisTick:{show:!1},axisLine:{lineStyle:{color:"rgba(255,255,255,.1)"}},axisLabel:{textStyle:{color:"rgba(255,255,255,.6)",fontSize:12}},splitLine:{lineStyle:{color:"rgba(255,255,255,.1)"}}}],series:[{name:"平板",type:"line",smooth:!0,lineStyle:{color:"#0184d5",width:"2"},areaStyle:{color:new s.a.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(1, 132, 213, 0.4)"},{offset:.8,color:"rgba(1, 132, 213, 0.1)"}],!1),shadowColor:"rgba(0, 0, 0, 0.1)"},symbol:"circle",symbolSize:8,showSymbol:!1,itemStyle:{color:"#0184d5",borderColor:"rgba(221, 220, 107, .1)",borderWidth:12},data:[30,40,30,40,30,40,30,60,20,40,30,40,30,40,30,40,30,60,20,40,30,40,30,40,30,40,20,60,50,40]},{name:"手写本",type:"line",smooth:!0,lineStyle:{normal:{color:"#00d887",width:2}},areaStyle:{normal:{color:new s.a.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(0, 216, 135, 0.4)"},{offset:.8,color:"rgba(0, 216, 135, 0.1)"}],!1),shadowColor:"rgba(0, 0, 0, 0.1)"}},symbol:"circle",symbolSize:5,itemStyle:{color:"#00d887",borderColor:"rgba(221, 220, 107, .1)",borderWidth:12},showSymbol:!1,data:[130,10,20,40,30,40,80,60,20,40,90,40,20,140,30,40,130,20,20,40,80,70,30,40,30,120,20,99,50,20]}]};this.echarts6=s.a.init(this.$refs.line2),this.echarts6.setOption(t),window.onresize=function(){this.echarts6.resize()}}}},l=n,c=(i("3c32"),i("2877")),h=Object(c["a"])(l,a,r,!1,null,null,null);e["default"]=h.exports},"3c32":function(t,e,i){"use strict";i("9675")},9675:function(t,e,i){}}]);