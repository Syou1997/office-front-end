<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
     // 從元件SearchChangeAccount過帶來的員工工號
     props: ["userIdForSearch"],
     data() {
          return {
               //提示視窗
               isShowHint: false,
               inputAccountState: null,
               //輸入的帳戶權限
               inputAccountPermissions: null,

          }
     },
     methods: {
          InputReset() {
               this.inputAccountState = null;
               this.inputAccountPermissions = null;

          },
          // 修改帳戶
          updateUser() {
               if (this.inputAccountState === null || this.inputAccountPermissions === null) {
                    alert("所有欄位不可空白");
                    return;
               }
               //post請求
               axios.post('http://localhost:8080/update_account/', {
                    "UserID": this.userIdForSearch,
                    "AccountState": this.inputAccountState,
                    "AccountPermissions": this.inputAccountPermissions
               })
                    .then(data => {
                         //防呆，如果userId不存在會回傳不存在此帳號的錯誤訊息
                         if (data.data.code !== "200") {
                              return alert(data.data.messgae);
                         }
                         alert("更新帳戶成功");
                         this.$router.push({
                              name: "ChangeAccount2",
                              params: {
                                   //自動名稱:要帶出去的值
                                   userIdForSearch2: this.userIdForSearch,
                              }
                         });
                    })

          },
          go_to_next_page() {
               this.$router.push({
                    name: "ChangeAccount2",
                    params: {
                         //自動名稱:要帶出去的值
                         userIdForSearch2: this.userIdForSearch,
                    }
               })
          },
          // 出現提示視窗
          showHint() {
               this.isShowHint = !this.isShowHint;

          }

     },
     mounted() {
          //Get 取得帳戶的員工Id、密碼、啟用狀態、權限
          fetch("http://localhost:8080/get_account_info?userId=" + this.userIdForSearch)
               .then(res => res.json())
               .then(data => {
                    this.pwdData = data.account.pwd;
                    this.inputAccountState = data.account.accountState;
                    this.inputAccountPermissions = data.account.accountPermissions;


               })
     },

}

</script>

<template>
     <!-- 外層容器 -->
     <div class="container">
          <!-- 標題 -->
          <h1>修改帳戶</h1>
          <!-- 主要區域 -->
          <div class="main_aera">
               <!-- 新增資料區 -->
               <div class="add_aera">
                    <!-- 員工工號輸入區 -->
                    <div class="input_aera1">
                         <h2>員工ID:</h2>
                         <input class="input_id" type="number" :value="userIdForSearch" readonly>
                    </div>
                    <!-- 帳戶啟用區域 -->
                    <div class="account_state_aera">
                         <h2>帳戶啟用:</h2>
                         <div>
                              <label for="account_state_e">
                                   <h3>啟用</h3>
                              </label>
                              <input type="radio" name="account_state" id="account_state_e" v-model="inputAccountState"
                                   value=true>
                         </div>
                         <div>
                              <label for="account_state_d">
                                   <h3>停用</h3>
                              </label>
                              <input type="radio" name="account_state" id="account_state_d" v-model="inputAccountState"
                                   value=false>
                         </div>

                    </div>
                    <!-- 帳戶權限區域 -->
                    <div class="account_permissions_aera">
                         <h2>帳戶權限:</h2>
                         <div>
                              <label for="account_permissions_1">
                                   <h3>員工</h3>
                              </label>
                              <input type="radio" name="account_permissions" id="account_permissions_1"
                                   v-model="inputAccountPermissions" value="1">
                         </div>
                         <div>
                              <label for="account_permissions_2">
                                   <h3>主管</h3>
                              </label>
                              <input type="radio" name="account_permissions" id="account_permissions_2"
                                   v-model="inputAccountPermissions" value="2">
                         </div>
                    </div>
                    <!-- 按鈕區域 -->
                    <div class="button_aera">
                         <button @click="updateUser" type="button">修改帳戶</button>
                         <button v-on:click="InputReset" type="button">Reset</button>
                    </div>
                    <div class="go_page_aera">
                         <!-- 提示視窗-->
                         <div v-show="isShowHint" class="hint">
                              <small>前往「修改帳戶資訊」頁面</small>
                         </div>
                         <!-- 箭頭(前往新增帳戶資訊) -->
                         <i v-on:mouseover="showHint" @click="go_to_next_page" class="fa-solid fa-right-long icon"></i>


                    </div>

               </div>

          </div>

     </div>
</template>

<style lang="scss" scoped>
.container {
     margin: 0;
     h1 {
          font-weight: bold;
     }

     .main_aera {
          background-color: white;
          border: 1px solid black;
          width: 40vw;
          height: 60vh;
          margin: 0 auto;
          border-radius: 6px;
          box-shadow: 1px 1px 1px black;

          .add_aera {
               // border: 2px solid red;
               margin: 0 auto;
               margin-top: 15%;
               width: 70%;

               .input_aera1 {
                    display: flex;
                    margin-bottom: 1em;

                    h2 {
                         font-weight: bold;
                         font-size: 20px;
                         margin-right: 29px;
                    }

                    .input_id {
                         width: 20vw;
                         border: none;

                         &::-webkit-inner-spin-button,
                         &::-webkit-outer-spin-button {
                              appearance: none;

                         }

                         outline: none;


                    }
               }

               .input_aera2 {
                    display: flex;
                    margin-bottom: 1em;

                    h2 {
                         font-weight: bold;
                         font-size: 20px;
                         margin-right: 50px;
                    }

                    .input_pwd {
                         width: 20vw;
                    }
               }

               .input_aera3 {
                    display: flex;
                    margin-bottom: 1em;

                    h2 {
                         font-weight: bold;
                         font-size: 20px;
                         margin-right: 0.5em;
                    }

                    .input_pwd2 {
                         width: 20vw;
                    }
               }

               .account_state_aera {
                    display: flex;
                    margin-bottom: 1em;

                    h2 {
                         font-weight: bold;
                         font-size: 20px;
                         margin-right: 0.5em;
                    }

                    h3 {
                         font-size: 15px;

                    }

                    input {
                         margin-left: 2px;
                         margin-right: 50px;
                    }
               }

               .account_permissions_aera {
                    display: flex;
                    margin-bottom: 1em;

                    h2 {
                         font-weight: bold;
                         font-size: 20px;
                         margin-right: 0.5em;
                    }

                    h3 {
                         font-size: 15px;
                    }

                    input {
                         margin-left: 2px;
                         margin-right: 50px;
                    }
               }

               .button_aera {
                    display: flex;
                    justify-content: space-around;


                    text-decoration: none;

                    button {
                         width: 100px;
                         display: block;
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

               .go_page_aera {
                    margin-top: 2rem;
                    position: relative;
                    // border: 2px solid red;
                    display: flex;
                    justify-content: end;

                    .hint {
                         position: absolute;
                         bottom: 30px;
                         left: 400px;
                         border: 1px dashed rgb(104, 102, 102);
                         background-color: rgb(255, 252, 164);
                         padding-left: 10px;
                         width: 170px;
                         height: 30px;

                         small {
                              font-style: oblique;
                              color: rgb(104, 102, 102);
                              font-size: 10px;
                         }


                    }


                    .icon {
                         color: pink;
                         font-size: 30px;
                         cursor: pointer;
                         display: block;

                         &:hover {
                              color: rgb(117, 232, 151);
                         }

                         &:active {
                              padding-left: 10px;
                         }
                    }



               }



          }
     }
}
</style>

