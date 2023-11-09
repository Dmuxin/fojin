<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickname"
        placeholder="用户昵称"
        style="margin-left: 0px; width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.mobile"
        placeholder="种类"
        style="margin-left: 5px; width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        style="margin-left: 5px"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <i class="el-icon-s-shop" style="margin-left: 900px; font-size: 32px"
        >累计捐赠{{ income }}</i
      >
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="selection" align="center" width="40" />
      <el-table-column
        label="照片"
        prop="pic"
        sortable="custom"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.pic }}</span>
        </template>
      </el-table-column>
      <el-table-column label="法号" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="寓意" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.main }}</span>
        </template>
      </el-table-column>
      <el-table-column label="种类" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地点" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传日期" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.time | moment("YYYY-MM-DD ") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享数" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span>{{ row.share }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
        prop="optype"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.describe }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="备注" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="操作角色" prop="optype">
          <el-select
            v-model="temp.optype"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in operationTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

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
import { getWxuserPage, updateWxuser, deleteWxuser } from "@/api/wxusers";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { node } from "clipboard";

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
      return g === 0 ? "普通居士" : "高级居士";
    },
  },
  data() {
    return {
      tableKey: 0,
      nodename: 0,
      income: 2100,
      list: [
        {
          pic: "测试",
          type: "金刚经",
          name: "空安居士",
          main: "求学",
          time: "20230302",
          location: "灵隐寺",
          share: 30,
          describe: "我佛慈悲",
        },
        {
          pic: "测试",
          type: "华心经",
          main: "求子",
          name: "空关居士",
          time: "20230502",
          location: "灵隐寺",
          share: 50,
          describe: "我心向佛",
        },
      ],
      total: 4,
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
    //全局变量
    console.log(this.$userMsg);
    this.nodename = this.$route.query.id;
    console.log(this.nodename);
    this.getList();
  },
  methods: {
    getList() {
      const nodename = this.nodename;
      switch (nodename) {
        case "空安居士":
          this.userlist = this.list[0];
          console.log(this.userlist);
          this.listLoading = true;
          break;
        case "空关居士":
          this.userlist = this.list[1];
          console.log(this.userlist);
          this.listLoading = true;
          break;
      }

      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total

      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
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
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          // console.log(tempData)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateWxuser(tempData).then((response) => {
            this.dialogFormVisible = false;
            const { status } = response;

            if (status === 20000) {
              this.getList();
              this.$notify({
                title: "操作提示",
                message: "修改成功",
                type: "success",
                duration: 3000,
              });
            } else {
              this.$notify({
                title: "操作提示",
                message: "修改失败!",
                type: "success",
                duration: 3000,
              });
            }
          });
        }
      });
    },
    handleDelete(row, index) {
      this.$confirm("确定要删除吗？")
        .then(() => {
          deleteWxuser(row.openid).then((response) => {
            const { status } = response;

            if (status === 20000) {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: "操作提示",
                message: "删除成功",
                type: "success",
                duration: 3000,
              });
            } else {
              this.$notify({
                title: "操作提示",
                message: "删除失败",
                type: "error",
                duration: 3000,
              });
            }
          });
        })
        .catch(() => {});
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
