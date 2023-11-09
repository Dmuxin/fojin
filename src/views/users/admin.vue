<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.Account" placeholder="帐号" style="margin-left: 0px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.Mobile" placeholder="手机" style="margin-left: 5px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" style="margin-left: 5px;" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 5px;" type="info" icon="el-icon-circle-plus" @click="handleCreate">
        新增
      </el-button>
      <el-button class="filter-item" style="margin-left: 5px;" type="danger" icon="el-icon-delete" @click="handleBatchDelete">
        删除
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" style="margin-left: 5px;" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="40"
      />
      <el-table-column label="帐号" sortable="custom" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="日期" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.date | moment("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="性别" class-name="status-col" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Gender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Roles }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" class-name="status-col" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" class-name="status-col" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Remarks }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.Date_joined | moment("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="帐号" prop="Account">
          <el-input v-model="temp.Account" />
        </el-form-item>
        <el-form-item label="设置默认密码" prop="Password">
          <el-checkbox v-model="checked">123456</el-checkbox>
        </el-form-item>
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="temp.Name" />
        </el-form-item>
        <el-form-item label="性别" prop="Gender">
          <el-select v-model="temp.Gender" class="filter-item" placeholder="请选择">
            <el-option v-for="item in genderOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="Mobile">
          <el-input v-model="temp.Mobile" />
        </el-form-item>
        <el-form-item label="状态" prop="Status">
          <el-input v-model="temp.Status" />
        </el-form-item>
        <el-form-item label="备注" prop="Remarks">
          <el-input v-model="temp.Remarks" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="创建日期" prop="date_start">
          <el-date-picker v-model="temp.Date_joined" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUsersPage, updateUser, addUser, deleteUser, batchDeleteUsers } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        used: '已启用',
        unused: '未启用'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        Account: '',
        Mobile: '',
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      genderOptions: ['男', '女'],
      showReviewer: false,
      temp: {
        Account: '',
        Name: '',
        Gender: '',
        Roles: '',
        Mobile: '',
        Date_joined: new Date(),
        Status: '',
        Remarks: ''
      },
      checked: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        Account: [{ required: true, message: 'type is required', trigger: 'change' }]
        // date_start: [{ type: 'date', required: true, message: 'Date is required', trigger: 'change' }],
        // date_end: [{ type: 'date', required: true, message: 'Date is required', trigger: 'change' }],
      },
      downloadLoading: false
    }
  },
  setup() {

  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true

      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total

      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })

      getAllUsersPage(this.listQuery).then((response) => {
        const { status, data } = response

        if (status === 20000) {
          this.list = data.items
          this.total = data.total

          this.listLoading = false
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        Account: '',
        Name: '',
        Gender: '',
        Roles: '',
        Mobile: '',
        Date_joined: new Date(),
        Status: '',
        Remarks: ''
      }
      this.checked = true
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.checked) {
            this.temp.Password = this.$md5('123456')
          }
          addUser(this.temp).then((response) => {
            const { status, data } = response

            if (status === 20000) {
              this.dialogFormVisible = false
              if (data === '1') {
                this.getList()
                this.$notify({
                  title: '操作提示',
                  message: '新增成功',
                  type: 'success',
                  duration: 3000
                })
              } else if (data === '0') {
                this.$notify({
                  title: '操作提示',
                  message: '该帐户已存在，请重新添加！',
                  type: 'error',
                  duration: 3000
                })
              } else {
                this.$notify({
                  title: '操作提示',
                  message: '新增失败！',
                  type: 'error',
                  duration: 3000
                })
              }
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.date = new Date(this.temp.date)
      this.dialogStatus = 'update'
      this.checked = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.checked) {
            this.temp.Password = this.$md5('123456')
          }
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then((response) => {
            this.dialogFormVisible = false
            const { status } = response

            if (status === 20000) {
              this.getList()
              this.$notify({
                title: '操作提示',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
            } else {
              this.$notify({
                title: '操作提示',
                message: '修改失败!',
                type: 'error',
                duration: 3000
              })
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('确定要删除吗？').then(() => {
        deleteUser(row.Account).then((response) => {
          const { status } = response

          if (status === 20000) {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '操作提示',
              message: '删除成功',
              type: 'success',
              duration: 3000
            })
          } else {
            this.$notify({
              title: '操作提示',
              message: '删除失败',
              type: 'error',
              duration: 3000
            })
          }
        })
      }).catch(() => {
      })
    },
    handleBatchDelete() {
      if (this.multipleSelection === undefined || this.multipleSelection.length === 0) {
        this.$notify({
          title: '操作提示',
          message: '请选择记录！',
          type: 'success',
          duration: 3000
        })
        return
      }
      this.$confirm('确定要删除吗？').then(() => {
        const ids = []
        this.multipleSelection.forEach(el => {
          ids.push(el.Account)
        })

        batchDeleteUsers(ids).then((response) => {
          const { status } = response

          if (status === 20000) {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '操作提示',
              message: '批量删除成功',
              type: 'success',
              duration: 3000
            })
          }
        })
      }).catch(() => {
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
