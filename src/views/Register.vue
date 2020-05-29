<template>
  <div class="register">
    <div class="register-box">
      <p class="title">注册</p>
      <div class="form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" placeholder="输入用户名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="fullName">
            <el-input type="text" v-model="ruleForm.fullName" placeholder="输入真实姓名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input type="text" v-model="ruleForm.phone" placeholder="输入手机号码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="ruleForm.email" placeholder="输入邮箱账号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="住址" prop="addr">
            <el-input type="text" v-model="ruleForm.addr" placeholder="输入当前住址" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="输入密码" autocomplete="off" show-password>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" placeholder="密码验证" autocomplete="off" show-password>
            </el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-radio-group v-model="ruleForm.role" style='display: flex; justify-content: space-between;'>
              <el-radio label="系统管理员" />
              <el-radio label="管理员" />
              <el-radio label="普通用户" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button class="regBtn" type="primary" @click="submitForm('ruleForm')" :loading="loading">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="else">
          <span>
            已有账号?&nbsp;
            <a @click="login">登录</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ruleForm, rules } from "../utils/validForm";
  import { Message } from 'element-ui';
  export default {
    name: "register",
    data() {
      return {
        // 表单信息
        ruleForm,
        // 表单验证规则
        rules,
        loading: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let { username, fullName, email, password, addr, phone, role } = this.ruleForm;
            role = role === '普通用户' ? 'USER_ROLE' : (role === '管理员' ? 'ADMIN_ROLE' : 'SYS_ROLE');
            let params = { username, fullName, email, password, addr, phone, role };
            this.loading = true
            this.axios.post('/register', params)
              .then(res => {
                if (res.data.statusCode === 200) {
                  Message({
                    type: 'success',
                    message: '注册成功'
                  })
                  this.loading = false
                  let timer = setTimeout(() => {
                    Message.closeAll();
                    this.$router.push({ name: "login" })
                    clearTimeout(timer);
                  }, 1000);
                }
                if (res.data.statusCode === 1020) {
                  Message({
                    type: 'warning',
                    message: res.data.msg
                  })
                  this.loading = false
                }
                if (res.data.statusCode === 500) {
                  Message({
                    type: 'warning',
                    message: res.data.msg
                  })
                  this.loading = false
                }
              }).catch(err => {
                Message({
                  type: 'warning',
                  message: '网络出错，请稍后重试'
                })
                this.loading = false
              })
          } else {
            return false;
          }
        });
      },
      login() {
        Object.keys(this.ruleForm).map(item => this.ruleForm[item] = "")
        this.$router.push({ name: 'login' })
      },
    }
  };
</script>
<style lang="less" scoped>
  .register {
    background: url('../assets/bg.jpg');
    width: calc(~"100% - 40px");
    height: calc(~"100% - 40px");
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .register-box {
      width: 380px;

      .title {
        font-size: 24px;
        text-align: center;
        color: #fff;
        margin: 0;
        padding: 10px 0;
      }

      .form {
        width: calc(100% - 20px);
        height: calc(100% - 72px);
        padding: 20px 10px;

        .el-form-item__content {
          line-height: 0;
        }

        .error {
          font-size: 12px;
          color: #e4393c;
        }
      }

      .el-form {
        height: inherit;
        position: relative;
      }

      .button .el-button {
        width: 100%;
      }

      .el-form {
        .else {
          font-size: 12px;
          display: flex;
          justify-content: space-between;

        }
      }

      .form>.else {
        font-size: 10px;
        text-align: right;
        color: #fff;

        >span a {
          cursor: pointer;
        }
      }

      .regBtn {
        width: 200px;
        margin-top: 30px;
      }
    }
  }
</style>