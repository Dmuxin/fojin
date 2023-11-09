<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickname"
        placeholder="用户id"
        style="margin-left: 0px; width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilterId"
      />
      <el-input
        v-model="listQuery.mobile"
        placeholder="手机号码"
        style="margin-left: 5px; width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- <el-button
        v-waves
        class="filter-item"
        style="margin-left: 5px"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="pageTicket"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="40" />
      <el-table-column
        label="id"
        prop="id"
        sortable="custom"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="法号"
        prop="id"
        sortable="custom"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.discipleName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="id"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.disciplePhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.discipleSex | genderFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学历" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.discipleEducation | genderFilterB }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="性别" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="注册日期" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.discipleCreateTime | moment("YYYY-MM-DD ") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享数" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.discipleShareSum }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="备注" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="看差用户详情"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="details(row)"
          >
            详情
          </el-button>
          <!-- <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col style="text-align: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[10, 20, 50]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    /> -->

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDiscipleAcquire, getDiscipleList } from "@/api/user";
import Vue from "vue";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { get } from "js-cookie";

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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
    genderFilter(g) {
      return g === 0 ? "女" : "男";
    },
    genderFilterB(g) {
      switch (g) {
        case 0:
          return (g = "无");
          break;
        case 1:
          return (g = "小学");
          break;
        case 2:
          return (g = "初中");
          break;
        case 3:
          return (g = "高中");
          break;
        case 4:
          return (g = "本科");
          break;
        case 5:
          return (g = "研究生");
          break;
        case 6:
          return (g = "博士");
          break;
      }
    },
  },
  data() {
    return {
      template: null, // 计时器
      tableKey: 0,
      text: [{}],
      total: 80, //总数据条数
      currentpage: 1, //当前所在页默认是第一页
      pagesize: 10, //每页显示多少行数据 默认设置为10
      ticket: [], //这里是从后端获取的所有数据
      pageTicket: [{}], //分页后的当前页数据
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        nickname: "",
        mobile: "",
        type: undefined,
        sort: "+id",
      },
      importanceOptions: [1, 2, 3],
      operationTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        openid: "",
        nickname: "",
        date_joined: new Date(),
        optype: "",
        img: "",
        sex: "",
        language: "",
        city: "",
        province: "",
        country: "",
        mobile: "",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    Vue.prototype.$userMsg = "abb";
    this.getList();
  },
  methods: {
    details(e) {
      let rod = e.id;
      this.$router.push({
        path: "/details/details",
        query: {
          id: rod,
        },
      });
    },
    getList() {
      this.listLoading = true;
      getDiscipleList().then((response) => {
        const result = JSON.parse(JSON.parse(JSON.stringify(response)).data);
        this.total = result.length;
        this.text = result;
        this.getPageInfo();
        this.listLoading = false;
      });
    },
    getPageInfo() {
      //清空pageTicket中的数据
      this.pageTicket = [];
      // 获取当前页的数据
      for (
        let i = (this.currentpage -1) * this.pagesize;
        i < this.total;
        i++
      ) {
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(this.text[i]);
        //判断是否达到一页的要求
        if (this.pageTicket.length === this.pagesize) break;
      }
    },
    handleSizeChange(size) {
      //修改当前每页的数据行数
      this.pagesize = size;
      //数据重新分页
      this.getPageInfo();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.getPageInfo();
    },
    handleFilterId() {
      let id = this.listQuery.nickname;
      if (id) {
        getDiscipleAcquire(id).then((response) => {
          let res = JSON.parse(JSON.parse(JSON.stringify(response)).data);
          this.text = [res];
          this.currentpage = 1;
          this.total = [res].length;
          this.getPageInfo();
        });
      } else {
        this.getList();
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    // handleModifyStatus(row, status) {
    //   this.$message({
    //     message: "操作Success",
    //     type: "success",
    //   });
    //   row.status = status;
    // },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    // sortByID(order) {
    //   if (order === "ascending") {
    //     this.listQuery.sort = "+id";
    //   } else {
    //     this.listQuery.sort = "-id";
    //   }
    //   this.handleFilter();
    // },//监听 pagesize 改变的事

    // 监听 页码值 改变的事件
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: "",
      };
    },

    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
