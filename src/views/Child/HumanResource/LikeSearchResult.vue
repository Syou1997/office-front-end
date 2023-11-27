<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
     // 從元件QueryAccount過帶來的員工工號
     props: ["userNameForSearch"],
     data() {
          return {
               //從JAVA抓過來的userId
               userIdForJava: null,
               //登入帳號的權限
               accountPermissions: null,
               //登入帳號的部門
               team: null,
               //查詢後回傳的List
               userInfoList: [],
               //回傳後排除別的部門的List
               newUserInfoList: [],
               //查詢後回傳的List的比數
               listAmount: null,
               //查詢的姓名
               inputUserId: null,
               //查詢的姓名
               inputUserName: null,
               //查詢的部門
               inputTeam: null,

          }
     },
     methods: {
          //Get UserId
          getUserId() {
               axios.post('http://localhost:8080/get/userid', {

               },
                    { withCredentials: true }
               )
                    .then(data => {
                         this.userIdForJava = data.data.account.userId;
                         //Get 取得帳戶的員工Id、密碼、啟用狀態、權限
                         fetch("http://localhost:8080/get_account_info?userId=" + this.userIdForJava)
                              .then(res => res.json())
                              .then(data => {
                                   //如果不是管理者就會隱藏某些欄位
                                   this.accountPermissions = data.account.accountPermissions;
                                   if (this.accountPermissions !== 99) {
                                        this.isShow = false;
                                   }
                                   //防有不好想法的一般員工，會跳轉沒權限的畫面
                                   if (this.accountPermissions == 1) {
                                        this.$router.push({
                                             name: "NoPermissions",
                                        });
                                   }
                                   //Get 取得帳戶的員工的詳細資訊
                                   fetch("http://localhost:8080/get_userinfo/" + this.userIdForJava)
                                        .then(res => res.json())
                                        .then(data => {
                                             this.team = data.userInfo.team;
                                             // console.log(this.team);
                                             this.getLikeSearchResult();

                                        })

                              })

                    })
          },
          //Get 被查詢者的資訊
          getLikeSearchResult() {
               axios.post('http://localhost:8080/like_search/', {
                    "UserName": this.userNameForSearch,

               })
                    .then(data => {
                         this.userInfoList = data.data.userInfoList;

                         //如果不是admin就要排除別的部門的資料
                         if (this.userIdForJava !== 99999999) {
                              this.newUserInfoList = this.userInfoList.filter(item => {
                                   return item.team === this.team;
                                   
                              })
                         }
                         //如果是管理者就不用從組List
                         else{
                              this.newUserInfoList = this.userInfoList
                         }






                    })

          },
          //查看被查詢者的詳細資訊
          details(userId) {
               this.$router.push({
                    name: "SearchUserInfoResult",
                    params: {
                         //自動名稱:要帶出去的值
                         userIdForSearch: userId,
                    }
               });


          },
          //取得查詢筆數
          getListAmount(){
               console.log(123);
               this.listAmount = this.newUserInfoList.length;
          }

     },
     mounted() {
          this.getUserId();
          
     },
     beforeUpdate() {
          this.getListAmount();
     },



}

</script>

<template>
     <!-- 外層容器 -->
     <div class="container">
          <!-- 標題 -->
          <h1>模糊查詢結果</h1>
          <h4>{{ userNameForSearch }} 的結果共有 {{ listAmount }} 筆</h4>
          <!-- 主要區域 -->
          <div class="main_aera">
               <!-- 資料區 -->
               <div class="frame">
                    <!-- 表格區域 -->
                    <table>
                         <thead>
                              <tr>
                                   <th>員工工號</th>
                                   <th>姓名</th>
                                   <th>部門</th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr v-for="item in newUserInfoList">
                                   <td>{{ item.userId }}</td>
                                   <td>{{ item.userName }}</td>
                                   <td>{{ item.team }}</td>
                                   <button @click="details(item.userId)" type="button"></button>
                              </tr>
                         </tbody>


                    </table>

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
          margin: 0 auto;
          border-radius: 6px;
          box-shadow: 1px 1px 1px black;

          .frame {
               padding: 20px;

               table {
                    width: 100%;
                    border-collapse: collapse;

                    thead {
                         background-color: #4cb9eb;

                         tr {

                              th {
                                   border: 1px solid black;
                                   padding: 1em;
                              }

                         }
                    }

                    tbody {
                         tr {
                              position: relative;

                              &:hover {
                                   cursor: pointer;
                                   background-color: #ffe593;
                              }

                              td {
                                   border: 1px solid black;
                                   padding: 1em;
                              }

                              button {
                                   position: absolute;
                                   top: 0px;
                                   right: 0px;
                                   width: 100%;
                                   height: 100%;
                                   opacity: 0.0;
                                   opacity: 0;
                              }
                         }
                    }



               }

          }
     }


}
</style>

