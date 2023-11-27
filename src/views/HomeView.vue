<script>
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
//Pinia 方法
import { mapState, mapActions } from 'pinia'
//自己的資料庫
import indexStore from '../store/indexStore';
//axios
import axios from 'axios';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      inputUserId: null,
      inputPwd: null,
      isEye: false,

    }
  },
  computed: {
    //Pinia來的變數
    ...mapState(indexStore, ["userId"])

  },
  methods: {
    //Pinia來的方法
    ...mapActions(indexStore, ["updateUserId"]),
    //此元件的方法
    InputReset() {
      this.inputUserId = null;
      this.inputPwd = null;


    },
    // 顯示密碼與隱藏
    eye_open_off() {
      if (this.isEye === false) {
        this.isEye = !this.isEye;

      } else {
        this.isEye = !this.isEye;
      }


    },
    //登入
    signLogin() {
      //防呆帳號密碼欄位不可空白
      if (this.inputUserId === null || this.inputPwd === null) {
        alert("帳號密碼欄位不可空白");
        return;
      }
      //post請求
      axios.post(
        'http://localhost:8080/login/', 
      {
        "userId": this.inputUserId,
        "pwd": this.inputPwd,
      },
      {withCredentials: true}
      )
        .then(data => {
          // console.log(data);
          //防呆，後端錯誤訊息
          if (data.data.userId !== 200) {
            return alert(data.data.pwd);
          }
          //使用Pinia裡面的方法將登入者的員工IDt傳到Pinia的userId
          this.updateUserId(this.inputUserId);

          alert(data.data.pwd);
          this.$router.push({
            name: "HeaderHome",
          });

        })
    },


  },
  mounted() {
    // console.log("登入前" + this.userId);
  },

}

</script>

<template>
  <div class="container">
    <!-- 標題區域 -->
    <div class="title_aere">
      <h1>W/X/Y Online System</h1>
      <img class="logo_pic" src="../../public/img/Logo.jpg" alt="Logo">
    </div>
    <!-- 黑線 -->
    <div class="kurosenn_futo"></div>
    <!-- 登入區域 -->
    <div class="main">
      <div class="login">
        <div class="login_aera">
          <div class="input_aera1">
            <span>User ID</span>
            <input v-model="inputUserId" class="input_id" type="number" placeholder="請輸入「員工工號」">
          </div>
          <div class="input_aera2">
            <span>Password</span>
            <!-- 輸入密碼欄位(隱藏) -->
            <input v-model="inputPwd" v-if="!isEye" class="input_pwd" type="password" placeholder="請輸入「密碼」">
            <!-- 閉眼的icon -->
            <Icon v-on:click="eye_open_off" v-if="!isEye" class="eye_off" icon="iconamoon:eye-off" />
            <!-- 輸入密碼欄位(顯示) -->
            <input v-model="inputPwd" v-if="isEye" class="input_pwd" type="text" placeholder="請輸入「密碼」">
            <!-- 睜眼的icon -->
            <Icon v-on:click="eye_open_off" v-if="isEye" class="eye_off" Icon icon="ph:eye" />
          </div>
          <div class="button_aera">
            <button @click="signLogin" type="button">Log in</button>
            <button v-on:click="InputReset" type="button">Reset</button>
          </div>
        </div>
      </div>
      <hr>
      <!-- 區域二 忘記密碼和變更密碼 -->
      <div class="aera2">
        <div class="forget_pwd_aera">
          <i class="fa-solid fa-right-long icon"></i>
          <RouterLink to="/ForgetPassword">
            <button class="aera2_btn" type="button">Forget Password</button>
          </RouterLink>
        </div>
        <div class="change_pwd_aera">
          <i class="fa-solid fa-right-long icon"></i>
          <RouterLink to="/ChangePassword">
            <button class="aera2_btn" type="button">Change Password</button>
          </RouterLink>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0;
  margin: 0 auto;

  .title_aere {
    // border:  2px solid black;
    display: flex;
    justify-content: space-between;

    h1 {
      margin: auto 0;
      font-style: italic;
      font-weight: bold;
      background: linear-gradient(to top, rgb(208, 117, 241), rgb(112, 216, 240));
      background: -webkit-linear-gradient(to top, rgb(208, 117, 241), rgb(112, 216, 240));
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }

    .logo_pic {
      width: 30%;
      height: 30%;
    }
  }

  .kurosenn_futo {
    border-bottom: 5px solid black;
    margin: 2rem 0;
    width: 100%;

  }

  .main {
    background-color: white;
    border: 1px solid black;
    width: 40vw;
    height: 60vh;
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: 1px 1px 1px black;

    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 110px;

      .login_aera {
        span {
          font-weight: bold;
        }

        input {
          width: 30vh;

          &::-webkit-inner-spin-button,
          &::-webkit-outer-spin-button {
            appearance: none;
          }
        }

        .input_aera1 {
          .input_id {
            margin-left: 24px;
            margin-bottom: 1rem;
          }
        }

        .input_aera2 {
          position: relative;

          .input_pwd {
            margin-left: 7px;
            margin-bottom: 2rem;
          }

          .eye_off {
            position: absolute;
            top: 6px;
            right: 6px;
            cursor: pointer;
          }
        }

        .button_aera {
          display: flex;
          justify-content: space-between;

          button {
            width: 100px;
            display: block;
            // background-color: rgb(207, 107, 243);
            background-image: linear-gradient(to left, rgb(208, 117, 241), rgb(112, 216, 240));
            color: white;
            border-radius: 1px;
            border: none;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
              scale: 1.05;
            }

            &:active {
              scale: 0.95;
            }
          }
        }
      }
    }

  }

  .aera2 {
    text-align: center;

    .forget_pwd_aera {
      margin: 1.5rem 0;
      margin-right: 7px;

    }

    .aera2_btn {
      border: none;
      background-color: transparent;
      font-style: italic;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        scale: 1.05;
      }

      &:active {
        scale: 0.95;
      }
    }

    .icon {
      color: pink;
      font-size: 18px;
    }

  }

  .music {
    position: absolute;
    top: 520px;
    right: 0px;

    width: 200px;
    height: 200px;
  }
}
</style>

