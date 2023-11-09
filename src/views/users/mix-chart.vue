<template>
  <div class="components-container">
    <el-form ref="form" :model="form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" style="width: 200px" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.region" placeholder="请选择性别">
          <el-option label="男" value="shanghai" />
          <el-option label="女" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="民族">
        <el-select v-model="form.region" placeholder="请选择民族">
          <el-option label="男" value="shanghai" />
          <el-option label="女" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.name" style="width: 200px" />
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="form.name" style="width: 200px" />
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="日期" />
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    resize() {
      console.log('resize')
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style  scoped>
  .components-container {
    position: relative;
    height: 100vh;
  }

  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
</style>
