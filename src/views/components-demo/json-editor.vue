<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.device_id" placeholder="设备ID" style="margin-left: 0px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.device_name" placeholder="设备名称" style="margin-left: 5px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="设备ID" sortable="custom" align="center" width="110">
        <template slot-scope="{row}">
          <span>{{ row.device_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名称" align="center" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.device_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.date | moment("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" class-name="status-col" width="100">
        <template slot-scope="{row}">
          {{ row.remarks }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备ID" prop="device_id">
          <el-input v-model="temp.device_id" />
        </el-form-item>
        <el-form-item label="设备名称" prop="device_name">
          <el-input v-model="temp.device_name" />
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="temp.date" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.remarks" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
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
import { getSwitchPage, updateSwitch, addSwitch, deleteSwitch, batchDeleteSwitches } from '@/api/switch'
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
        device_id: '',
        device_name: '',
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['已启用', '未启用'],
      showReviewer: false,
      temp: {
        device_id: '',
        device_name: '',
        date: new Date(),
        status: '',
        remarks: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        device_id: [{ required: true, message: 'type is required', trigger: 'change' }],
        date: [{ type: 'date', required: true, message: 'Date is required', trigger: 'change' }]
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

      getSwitchPage(this.listQuery).then((response) => {
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
        device_id: '',
        device_name: '',
        date: new Date(),
        status: '',
        remarks: ''
      }
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
          addSwitch(this.temp).then((response) => {
            const { status } = response

            if (status === 20000) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '操作提示',
                message: '新增成功',
                type: 'success',
                duration: 3000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.date = new Date(this.temp.date)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateSwitch(tempData).then((response) => {
            const { status } = response

            if (status === 20000) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '操作提示',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('确定要删除吗？').then(() => {
        deleteSwitch(row.device_id).then((response) => {
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
          ids.push(el.device_id)
        })

        batchDeleteSwitches(ids).then((response) => {
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
