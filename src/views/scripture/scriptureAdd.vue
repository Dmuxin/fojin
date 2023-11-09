<template>
  <div class="app-container">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="temp"
      label-position="left"
      label-width="100px"
      style="width: 400px; margin-left: 50px"
    >
      <el-form-item label="名字" prop="Account" name="Account">
        <el-input v-model="temp.Account" />
      </el-form-item>

      <el-form-item type="textarea" label="佛经简介" prop="content">
        <el-input v-model="temp.content" type="textarea" :rows="3" />
      </el-form-item>
      <!--       表单提交后通过submitUpload() {
        }, -->
      <el-form-item label="照片">
        <el-upload
          ref="upload"
          class="upload-demo"
          inline-block
          action="#"
          :on-change="changeFile"
          multiple
          :limit="5"
          :auto-upload="false"
          list-type="picture-card"
        >
          <el-button slot="trigger" size="small" type="primary"
            >上传照片</el-button
          >
          <div
            slot="tip"
            class="el-upload__tip"
            style="float: right; color: #e6a23c"
          >
            只能上传jpg/png/gif文件，且不超过10Mb
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          ref="upload"
          class="upload-demo"
          inline-block
          action="#"
          :on-change="changeFileTxt"
          multiple
          :limit="5"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >上传附件</el-button
          >
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="功效" prop="function" name="function">
        <div class="body-content-checkbox-wrapper">
          <el-checkbox-group v-model="temp.function" size="small">
            <!-- 设置div 样式让标签在同一列显示 -->
            <div style="display: flex">
              <el-checkbox label="身体健康" />
              <el-checkbox label="求子" />
              <el-checkbox label="消除罪孽" />
              <el-checkbox label="解除怨结" />
              <el-checkbox label="延延益寿" />
              <el-checkbox label="考试顺利" />
            </div>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false"> 取消 </el-button>
      <el-button type="primary" @click="submitOrder"> 上传公告 </el-button>
    </div>

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
import {
  getAllUsersPage,
  updateUser,
  addUser,
  deleteUser,
  batchDeleteUsers,
  addScripture,
} from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { fetchList } from "@/api/article";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
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
        used: "已启用",
        unused: "未启用",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      f1: 0,
      f2: 0,
      orderId: "",
      userId: "",
      userName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      uploadAction:
        "/inner/event/order/submit/submit" +
        "&accessToken=" +
        this.$store.getters.token,
      tableKey: 0,
      list: null,
      content: "",
      total: 0,
      listLoading: true,
      calendarTypeOptions,
      showReviewer: false,
      temp: {
        function: [],
        Account: "",
        content: " ",
      },
      checked: false,
      dialogFormVisible: false,
      dialogStatus: "",
      dialogPvVisible: false,
      pvData: [],
      rules: {
        Account: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        // date_start: [{ type: 'date', required: true, message: 'Date is required', trigger: 'change' }],
        // date_end: [{ type: 'date', required: true, message: 'Date is required', trigger: 'change' }],
      },
      downloadLoading: false,
    };
  },
  setup() {},
  created() {
    this.getList();
  },
  methods: {
    // 监听上传文件，当文件有变化时触发函数
    changeFile(file, fileListx) {
      this.f1 = 1;
      const fileName = file.name;
      // 利用正则表达式，a定义合法的文件后缀
      const regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(fileName.toLowerCase())) {
        // 文件类型合法，存储文件
        this.fileListx = fileListx;
      } else {
        this.$message.error("请选择图片文件");
      }
      console.log(`fileList:${this.fileListx}`);
    },
    // 上传附件change时回调函数
    changeFileTxt(file, fileList2) {
      this.f2 = 1;
      const fileName = file.name;
      const regex = /(.txt|.docx|.doc|.word)$/;
      if (regex.test(fileName.toLowerCase())) {
        this.fileList2 = fileList2;
      } else {
        this.$message.error("请选择文件");
      }
      console.log(`fileList2:${this.fileList2}`);
    },
    // 提交照片和表单内容
    submitOrder() {
      // 创建新的formData来存储表单的数据，把附件和文字转为二进制上传到formData
      var formData = new FormData();
      if (this.f1) {
        for (let i = 0; i < this.fileListx.length; i++) {
          formData.append("file", this.fileListx[i].raw);
        }
        console.log(`数据：${formData.get("file")}`);
      }
      if (this.f1) {
        for (let r = 0; r < this.fileList2.length; r++) {
          formData.append("image", this.fileList2[r].raw);
        }
      }
      formData.append("Account", this.temp.Account); // 其他参数
      formData.append("content", this.temp.content); // 其他参数
      formData.append("function", this.temp.function);
      for (const [a, b] of formData.entries()) {
        console.log(a, ":", b);
      }
      // formData.append("userName", this.user.username); // 其他参数
      addScripture(formData).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );``
    },

    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },



    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.date = new Date(this.temp.date);
      this.dialogStatus = "update";
      this.checked = false;
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
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
  <style scoped     >
.body-content-checkbox-wrapper {
  /* 未选中时的样式 */
  /* 选中状态时的样式 */
  /* 选中状态、同时设置了disabled为true的复选框的样式（HTML代码中第一个checkbox的disabled设置为了true */
  /* 选中状态、且disabled设置为true的checkbox的文本的样式 */
  /* 选中状态、disabled设置为true的复选框，设置其可勾选方框的样式 */
}
.body-content-checkbox-wrapper /deep/ .el-checkbox {
  background: #fff;
  padding: 10px 10px;
  line-height: 100%;
  border-radius: 4px;
  margin-right: 10px;
}
.body-content-checkbox-wrapper /deep/ .el-checkbox.is-checked {
  background: #edf6f2;
  border: 1px solid #47a87d;
  padding: 10px 10px;
  border-radius: 4px;
}
.body-content-checkbox-wrapper /deep/ .el-checkbox.is-disabled.is-checked {
  padding: 10px 10px;
  border-radius: 4px;
}
.body-content-checkbox-wrapper
  /deep/
  .el-checkbox__input.is-disabled
  + span.el-checkbox__label {
  color: #47a87d;
  cursor: not-allowed;
}
.body-content-checkbox-wrapper
  /deep/
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner {
  background-color: #47a87d;
  border-color: #47a87d;
}
</style>

