<script>
import axios from 'axios';
export default {
     data() {
          return {
               //使用者的員工Id
               userIdForJava: null,
               //使用者的部門
               userTeam: null,
               //使用者的帳戶權限
               userPermissions: null,
               //使用者的自己的請假清單
               userLeaveList: [],
               fullUserLeaveList: [],
               //假單編號
               id: null,
               //假單員工姓名
               name: null,
               //假單員工部門單位
               team: null,
               //假別
               leave: null,
               //請假事由
               leaveReason: "出國",
               //請假開始日
               startDay: null,
               //請假結束日
               endDay: null,
               //請假時數
               time: null,
               //請假證明的圖片Id
               picId: null,
               //備註
               ps: "不方便接電話不方便接電話",
               //審核者姓名
               auditor: null,
               //使審核狀態
               state: null,
               //審核不通過原因
               failReason: "沒有提交證明，請去看醫生後領取收據",
               //假單更新時間
               upTime: null,
               //查看完整留言的變數
               showFullText: false,
               //控制展開全文與收回的變數(請假事由)
               controlShowLeaveReason: false,
               //控制展開全文與收回的變數(備註)
               controlShowPs: false,
               //控制展開全文與收回的變數(審核不通過原因)
               controlShowFailReason: false,


          }
     },
     computed: {
          //產開全文的方法(請假事由)
          truncatedMessage_leaveReason() {
               if (this.leaveReason.length > 4 && !this.showFullText) {
                    this.controlShowLeaveReason = true;
                    return this.leaveReason.slice(0, 4) + '...';
               } else {
                    return this.leaveReason;
               }
          },
          //產開全文的方法(備註)
          truncatedMessage_ps() {
               if (this.ps.length > 4 && !this.showFullText) {
                    this.controlShowPs = true;
                    return this.ps.slice(0, 4) + '...';
               } else {
                    return this.ps;
               }
          },
          //產開全文的方法(審核不通過原因)
          truncatedMessage_failReason() {
               if (this.failReason.length > 4 && !this.showFullText) {
                    this.controlShowFailReason = true;
                    return this.failReason.slice(0, 4) + '...';
               } else {
                    return this.failReason;
               }
          },
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
                         this.getLeaveInfo();
                         //Get 取得使用者的假單資訊
                         fetch("http://localhost:8080/get_leave/" + this.userIdForJava)
                              .then(res => res.json())
                              .then(data => {
                                   this.userLeaveList = data.dayOffList;
                                   this.reviseList();
                                   console.log(this.userLeaveList);
                              })
                         //Get 取得使用者帳戶的部門
                         fetch("http://localhost:8080/get_userinfo/" + this.userIdForJava)
                              .then(res => res.json())
                              .then(data => {
                                   this.userTeam = data.userInfo.team;
                                   console.log(this.userTeam);
                                   //Get 取得使用者帳戶的帳號權限
                                   fetch("http://localhost:8080/get_account_info?userId=" + this.userIdForJava)
                                        .then(res => res.json())
                                        .then(data => {
                                             this.userPermissions = data.account.accountPermissions;
                                             console.log(this.userPermissions);

                                        })
                              })





                    })
          },
          getLeaveInfo() {
               //Get 取得使用者帳戶的假單資訊
               fetch("http://localhost:8080/get_leave/" + this.userIdForJava)
                    .then(res => res.json())
                    .then(data => {
                         this.fullUserLeaveList = data.dayOffList;
                         console.log(this.fullUserLeaveList);
                    })
          },

          toggleText() {
               this.controlShowPs = false;
               console.log(this.fullUserLeaveList);
               this.userLeaveList = this.fullUserLeaveList
          },
          //處理接進來的請假單資訊
          reviseList() {
               console.log(123);
               this.userLeaveList.forEach((item, index) => {
                    const upStartDay = item.startDay.replace("T", " ");
                    const upStartDay2 = upStartDay.slice(0, 16);
                    item.startDay = upStartDay2;

                    const upEndDay = item.endDay.replace("T", " ");
                    const upEndDay2 = upEndDay.slice(0, 16);
                    item.endDay = upEndDay2;

                    const updateTime1 = item.updateTime.replace("T", " ");
                    const updateTime2 = updateTime1.slice(0, 16);
                    item.updateTime = updateTime2;

                    if (item.ps.length > 10) {
                         item.ps = item.ps.slice(0, 4) + "....";
                         this.controlShowPs = true;
                    }






               })


          },


     },
     mounted() {
          this.getUserId();

     },
     beforeUpdate() {

     },
     updated() {

     },

}

</script>

<template>
     <div class="container">
          <h2>假單簽核</h2>
          <div class="main_aera">
               <table>
                    <thead>
                         <tr>
                              <th>假單編號</th>
                              <th>員工工號</th>
                              <th>員工姓名</th>
                              <th>部門單位</th>
                              <th>假別</th>
                              <th>請假事由</th>
                              <th>請假開始日</th>
                              <th>請假結束日</th>
                              <th>請假時數</th>
                              <th>請假證明</th>
                              <th>備註</th>
                              <th>審核者姓名</th>
                              <th>審核狀態</th>
                              <th>審核不通過原因</th>
                              <th>假單更新時間</th>
                              <th>簽核欄位</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr v-for="item, index in userLeaveList">
                              <td>{{ item.id }}</td>
                              <td>{{ item.userId }}</td>
                              <td>{{ item.userName }}</td>
                              <td>{{ item.team }}</td>
                              <td>{{ item.leave }}</td>
                              <td> {{ item.leaveReason }}</td>
                              <td>{{ item.startDay }}</td>
                              <td>{{ item.endDay }}</td>
                              <td>{{ item.time }}</td>
                              <td>{{ picId }}</td>
                              <td>{{ item.ps }}</td>
                              <td>{{ item.auditor }}</td>
                              <td>{{ item.state }}</td>
                              <td>{{ item.failReason }}</td>
                              <td>{{ item.updateTime }}</td>
                              <td>
                                   <button type="button">簽核</button>
                              </td>
                         </tr>
                    </tbody>
               </table>

          </div>
     </div>
</template>


<style lang="scss" scoped>
.container {
     h2 {
          display: inline;
          width: 13%;
     }

     .main_aera {
          margin-top: 2em;
          margin-left: 1%;
          // border: 2px solid red;

          table {

               border-collapse: collapse;

               thead {


                    tr {

                         th {
                              width: 300px;
                              width: 200px;
                              border: 1px solid black;
                              padding: 1em;
                              background-color: #2e7c9f;
                              color: white;
                              font-weight: bold;
                              text-align: center;
                              font-size: 10px;

                         }

                    }

               }

               tbody {

                    tr {

                         td {
                              width: 300px;
                              border: 1px solid black;
                              padding: 1em;
                              text-align: center;
                              font-size: 10px;

                              a {
                                   display: block;
                                   font-weight: bolder;
                                   color: rgb(40, 136, 136);
                                   cursor: pointer;
                              }

                         }

                    }

               }
          }
     }

}
</style>

