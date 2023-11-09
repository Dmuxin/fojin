<template>
  <div class="app-container common-list-page">
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataFormRules"
      status-icon
      label-width="100px"
    >
      <el-form-item label="旧密码：" prop="password">
        <el-input v-model="dataForm.password" v-focus type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item label="新密码：" prop="newpassword1">
        <el-input v-model="dataForm.newpassword1" type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="newpassword2">
        <el-input v-model="dataForm.newpassword2" type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="doModify">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from '@/store'
import {
  modifypassword
} from '@/api/system'
import md5 from 'js-md5'

export default {
  name: 'ModifyPassword',
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      inserted: function(el) {
        el.querySelector('input').focus()
      }
    }
  },
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error('密码长度为6-18位'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.newpassword1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dataForm: {
        password: '',
        newpassword1: '',
        newpassword2: ''
      },
      dataFormRules: {
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpassword1: [
          { required: true, validator: validatePass1, trigger: 'blur' }
        ],
        newpassword2: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    doModify() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          const userInfo = this.$store.getters.userInfo[0]
          // console.log(userInfo)
          // console.log(this.$md5(this.dataForm.password))

          if (userInfo.Password === this.$md5(this.dataForm.password)) {
            userInfo.Password = this.$md5(this.dataForm.newpassword1)
            modifypassword(userInfo).then(response => {
              if (response.status === 20000) {
                this.$notify({
                  title: '操作提示',
                  message: '密码修改成功！',
                  type: 'success',
                  duration: 3000
                })
                setTimeout(() => {
                  this.logout()
                }, 3000)
              } else {
                this.$message(response.data)
              }
            })
              .catch(() => {})
          } else {
            this.$notify({
              title: '操作提示',
              message: '原密码错误！',
              type: 'error',
              duration: 3000
            })
          }
        }
      })
    },

    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 60%;
  margin: 50px auto 0;
  text-align: center;
  button {
    margin: 20px 0 0;
  }
}
</style>
