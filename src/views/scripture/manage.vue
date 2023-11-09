<template>
  <div class="app-container">
    <el-button
      v-for="item of text"
      :key="item.key"
      type="success"
      @click="change(item.id)"
    >
      {{ item.scriptureName }}
    </el-button>
  </div>
</template>
  
  <script>
import { getAcquire } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const operationTypeOptions = [
  { key: "主申请人", display_name: "主申请人" },
  { key: "被申请人", display_name: "被申请人" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = operationTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {

  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      text: [{}],
      btnList: [
        { key: 1, name: "王羲之" },
        { key: 2, name: "颜真卿" },
        { key: 3, name: "欧阳询" },
        { key: 4, name: "王献之" },
        { key: 5, name: "柳公权" },
        { key: 6, name: "苏轼" },
      ],
    };
  },
  created() {
    //全局变量
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getAcquire().then((response) => {
        const result = JSON.parse(JSON.parse(JSON.stringify(response)).data);
        this.text = result;
        this.total = result.length;
        this.listLoading = false;
        // 需节流不然会一直卡在加载
      });
    },
    change(e) {
      let id=e
      this.$router.push({
        path: "/details/ScriptureDetailed",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
  