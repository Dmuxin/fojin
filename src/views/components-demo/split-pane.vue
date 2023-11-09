<template>
  <div class="components-container">
    <el-form ref="form" :model="form" style="width: 100%">
      <el-form-item label="设备">
        <el-select v-model="form.region" placeholder="请选择设备">
          <el-option label="设备1" value="shanghai" />
          <el-option label="设备2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名：" />
      <el-form-item label="体温：" />
      <el-form-item label="日期：" />
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
