<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="姓名" style="margin-left: 0px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.tel" placeholder="手机号码" style="margin-left: 5px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.address" placeholder="地址" style="margin-left: 5px;width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" style="margin-left: 5px;" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      z
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
      <el-table-column v-if="false" label="Id" prop="id" sortable="custom" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" sortable="custom" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" sortable="custom" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.province+(row.city===row.province?"辖区":row.city)+row.county+row.addressdetail }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" label="省份" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" label="市区" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" label="城区" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.county }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" label="详细地址" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.addressdetail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮编" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.postalcode }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" label="地区编码" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.areacode }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="性别" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column v-if="false" label="日期" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.date | moment("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" label="状态" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" label="备注" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.remarks }}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="temp.tel" />
        </el-form-item>
        <el-form-item label="省市区" prop="areacode">
          <el-cascader
            v-model="temp.selectedaddress"
            size="large"
            :options="options"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="addressdetail">
          <el-input v-model="temp.addressdetail" />
        </el-form-item>
        <el-form-item label="邮编" prop="postalcode">
          <el-input v-model="temp.postalcode" />
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
import { getAllAddressPage, updateAddress, deleteAddress } from '@/api/address'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import { regionDataPlus, CodeToText } from 'element-china-area-data'

const operationTypeOptions = [
  { key: '主申请人', display_name: '主申请人' },
  { key: '被申请人', display_name: '被申请人' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = operationTypeOptions.reduce((acc, cur) => {
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
        published: 'success',
        draft: 'info',
        deleted: 'danger'
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
        name: '',
        tel: '',
        address: '',
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      operationTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: 0,
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressdetail: '',
        postalcode: '',
        areacode: '',
        status: '',
        remarks: '',
        isdefault: '',
        date: new Date(),
        selectedaddress: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,

      options: regionDataPlus
    }
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

      getAllAddressPage(this.listQuery).then((response) => {
        // console.log(response)
        if (response !== null) {
          const { status, data } = response
          if (status === 20000) {
            this.list = data.items
            this.total = data.total

            // 将地区码：areacode (330603) 转换为数组：selectedaddress ['330000','330600','330603']
            this.list.forEach(e => {
              const selectedaddress = []
              const pcc = e.areacode
              // console.log(pcc)
              let province = pcc.substring(0, 2)
              province = province + '0000'
              let city = pcc.substring(0, 4)
              city = city + '00'
              const county = pcc
              selectedaddress.push(province, city, county)

              e.selectedaddress = selectedaddress
            })
          }
        }
        this.listLoading = false
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

    handleChange(value) {
      // 转换地址
      this.temp.province = CodeToText[value[0]]
      this.temp.city = CodeToText[value[1]]
      this.temp.county = CodeToText[value[2]]
      this.temp.areacode = value[2]
      // console.log(this.temp)
    },

    resetTemp() {
      this.temp = {
        id: 0,
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressdetail: '',
        postalcode: '',
        areacode: '',
        status: '',
        remarks: '',
        isdefault: '',
        date: new Date(),
        selectedaddress: []
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
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
          // console.log(tempData)

          updateAddress(tempData).then((response) => {
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
        deleteAddress(row.id).then((response) => {
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

<style scoped>
.area-select.large {
  width: 100%;
  line-height: 20px;
}
</style>
