<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
     data() {
          return {
               //使用者的員工Id
               userIdForJava: null,
               //使用者的姓名
               name: null,
               //使用者的部門
               team: null,
               //使用者的剩餘年假時數
               annualLeave: null,
               //使用者的剩餘病假時數
               sickLeave: null,
               //假別
               leave: null,
               //請假事由
               leaveReason: null,
               //起始時間
               startDay: null,
               //結束時間
               endDay: null,
               //結束時間-起始時間
               timeDifference: null,
               //備註
               ps: "無",
               //控制計算後的文字的消失與出現
               isShowTime: false,
               //圖片base64
               img64: null,
               //控制出現"查看圖片的視窗"
               showPicControl: false,
               //控制出現圖片
               showPic: false,
               //假單送出時間
               newDate: null,
               //控制出現送出按鈕
               putShow: false,

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
                         //Get 取得帳戶的員工的詳細資訊
                         fetch("http://localhost:8080/get_userinfo/" + this.userIdForJava)
                              .then(res => res.json())
                              .then(data => {
                                   this.name = data.userInfo.userName;
                                   this.team = data.userInfo.team;
                                   this.annualLeave = data.userInfo.annualLeave;
                                   this.sickLeave = data.userInfo.sickLeave;
                              })


                    })
          },
          //重新整理
          reset() {
               window.location.reload();
          },
          //計算請假時間(小時)
          calculate() {
               //起始時間
               const date1 = new Date(this.startDay);
               //結束時間
               const date2 = new Date(this.endDay);
               //總共請幾天

               const days = Math.floor((date2 - date1) / 86400000) + 1; //換算成天
               console.log("總共請了" + days + "天");

               //防呆
               if (date1.getHours() > 18 || date1.getHours() < 9) {
                    alert("所選時間非上班時間");
                    return;
               }
               if (date2.getHours() > 18 || date2.getHours() < 9) {
                    alert("所選時間非上班時間");
                    return;
               }

               if (date2.getHours() === 12) {
                    alert("午休時間不需請假");
                    return;
               }

               if (date1 > date2) {
                    alert("結束時間要大於起始時間");
                    return;
               }
               //通過防呆，出現送出按鈕、時數、小時的文字
               this.putShow = true;
               this.isShowTime = true;
               //開始進入時數的計算(當日)
               if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth()) {
                    //有經過12~13點午休的情況
                    if (date1.getHours() < 12 && date2.getHours() >= 13) {
                         //計算時間去小數點(因為午休，不用減去1小時)
                         if ((date2 - date1) % 3600000 !== 0) {
                              this.timeDifference = Math.floor((date2 - date1) / 3600000)
                         }
                         else {
                              //有經過12~13點午休時間需要減去1小時
                              const res = (date2 - date1) / 3600000;
                              this.timeDifference = res - 1;
                         }

                    }
                    //沒有經過12~13點午休時間的情況
                    else {
                         //計算時間去小數點(多請1分鐘也算1小時，所以要+1)
                         if ((date2 - date1) % 3600000 !== 0) {
                              this.timeDifference = Math.floor((date2 - date1) / 3600000) + 1
                         } else {
                              //正常計算
                              this.timeDifference = (date2 - date1) / 3600000;
                         }
                    }

               }
               //開始進入時數的計算(跨日)
               else {
                    let SSday = "沒跨六日";
                    //有沒有跨六日
                    if (date1.getDay() === 1 && days > 5) {
                         SSday = "跨六日";
                    }
                    if (date1.getDay() === 2 && days > 4) {
                         SSday = "跨六日";
                    }
                    if (date1.getDay() === 3 && days > 3) {
                         SSday = "跨六日";
                    }
                    if (date1.getDay() === 4 && days > 2) {
                         SSday = "跨六日";
                    }
                    if (date1.getDay() === 5 && days > 1) {
                         SSday = "跨六日";
                    }
                    //開始判斷請假有無跨六日
                    if (SSday === "沒跨六日") {
                         console.log("沒跨六日");
                         //有經過12~13點午休的情況
                         if (date1.getHours() < 12) {
                              //有經過12~13點午休時間需要減去1小時
                              this.timeDifference = ((18 - date1.getHours()) - 1) + ((days - 1) * 8);
                         }
                         //沒有經過12~13點午休的情況就正常計算
                         else {
                              this.timeDifference = (18 - date1.getHours()) + ((days - 1) * 8);

                         }
                    }
                    if (SSday === "跨六日") {
                         console.log("跨六日");
                         //有經過12~13點午休的情況
                         if (date1.getHours() < 12) {
                              //有經過12~13點午休時間需要減去1小時
                              let res = ((18 - date1.getHours()) - 1) + ((days - 1) * 8);
                              this.timeDifference = res - 16;
                         }
                         //沒有經過12~13點午休的情況就正常計算
                         else {
                              let res = (18 - date1.getHours()) + ((days - 1) * 8);
                              this.timeDifference = res - 16;

                         }
                    }

               }










          },
          //上傳圖片
          updateImg(e) {

               const file = e.target.files[0]
               const reader = new FileReader()
               reader.readAsDataURL(file);
               reader.onload = (e) => {
                    this.img64 = e.target.result
               }

               this.showPicControl = true;

          },
          //查看上傳圖片
          seePic() {
               this.showPic = !this.showPic;
          },
          //新增假單
          addLeave() {
               //取得當下時間
               this.newDate = new Date();
               //防呆
               if (this.leave === null) {
                    alert("請選擇假別");
                    return;
               }
               if (this.leaveReason === null) {
                    alert("「請假事由」不可空白");
                    return;
               }
               if (this.startDay === null) {
                    alert("「起始時間」不可空白");
                    return;
               }
               if (this.endDay === null) {
                    alert("「結束時間」不可空白");
                    return;
               }
               if (this.timeDifference === null) {
                    alert("請先點擊「計算」按鈕來計算時數");
                    return;
               }
               if (this.timeDifference <= 0) {
                    alert("「請假時間」最少為1小時");
                    return;
               }
               if (this.ps === null) {
                    alert("沒有備註的話「備註」請填寫無");
                    return;
               }
               //請假結束日要大於請假開始日
               if(this.endDay < this.startDay){
                    alert("請假結束日要大於請假開始日");
                         return;  
               }
               //年假時數不夠
               if (this.Leave === "年假") {
                    if (this.annualLeave >= 0) {
                         alert("年假時數不足，請改請事假");
                         return;
                    }
               }
               //病假時數不夠
               if (this.Leave === "病假") {
                    if (this.annualLeave >= 0) {
                         alert("病假時數不足，請改請事假");
                         return;
                    }
               }

               //通過防呆，新增假單
               //Post 將假單資訊傳入後端
               axios.post('http://localhost:8080/add_leave/', {
                    //使用者Id
                    "UserID": this.userIdForJava,
                    //使用者名稱
                    "UserName": this.name,
                    //使用者部門
                    "Team": this.team,
                    //假別
                    "Leave": this.leave,
                    //請假事由
                    "LeaveReason": this.leaveReason,
                    //請假開始日
                    "StartDay": this.startDay,
                    //請假結束日
                    "EndDay": this.endDay,
                    //時(結束時間-起始時間)
                    "Time": this.timeDifference,
                    //圖片的base64
                    "Pic64": this.img64,
                    //備註
                    "Ps": this.ps,
                    //審核狀態
                    "State": "審核中",
                    //假單更新時間
                    "UpdateTime": this.newDate

               })
                    .then(data => {
                         console.log(data);
                         if (data.data.code !== "200") {
                              return alert(data.data.messgae);
                         }
                         alert("假單新增成功");
                         this.reset();
                    })

          },

     },
     mounted() {
          this.getUserId();

     },
}

</script>

<template>
     <div class="container">
          <h1>請假申請單</h1>
          <div class="main_aera">
               <table>
                    <tbody>
                         <tr>
                              <td class="title">申請人資訊
                              </td>
                              <td class="content">
                                   <div class="userinfo_aera">
                                        <div class="userid_aera">
                                             <p>員工工號</p>
                                             <!-- <td>員工工號</td> -->
                                             <input class="noinput" type="number" v-model="userIdForJava" readonly>
                                        </div>
                                        <div class="userid_name">
                                             <p>員工姓名</p>
                                             <input class="noinput" type="text" v-model="name" readonly>
                                        </div>
                                        <div class="userid_team">
                                             <p>部門單位</p>
                                             <input class="noinput" type="text" v-model="team" readonly>
                                        </div>


                                   </div>
                              </td>
                         </tr>
                         <tr>
                              <td class="title">假別</td>
                              <td class="content">
                                   <select name="leave" id="leave" v-model="leave">
                                        <option value="病假" key="leave">病假</option>
                                        <option value="年假" key="leave">年假</option>
                                        <option value="事假" key="leave">事假</option>
                                        <option value="公假" key="leave">公假</option>
                                   </select>
                              </td>
                         </tr>
                         <tr>
                              <td class="title">請假事由</td>
                              <td class="content">
                                   <input type="text" v-model="leaveReason">
                              </td>
                         </tr>
                         <tr>
                              <td class="title">起始時間</td>
                              <td class="content">
                                   <input type="datetime-local" v-model="startDay">
                              </td>

                         </tr>
                         <tr>
                              <td class="title">結束時間</td>
                              <td class="content">
                                   <input type="datetime-local" v-model="endDay">
                              </td>
                         </tr>
                         <tr>
                              <td class="title">請假時間合計</td>
                              <td class="content">
                                   <button class="totalbtn" @click="calculate" type="button">計算</button>
                                   <span class="time">{{ timeDifference }}</span><span v-show="isShowTime">小時</span>
                              </td>
                         </tr>
                         <tr>
                              <td class="title">上傳附件檔案</td>
                              <td class="content">
                                   <div class="updatefile_aera">
                                        <input type="file" class="inputfile" @change="updateImg">
                                        <img :src=img64 v-if="showPic" class="pic">
                                        <span v-if="showPicControl" @click="seePic" class="see_pic">點我查看上傳圖片</span>
                                   </div>

                              </td>
                         </tr>
                         <tr>
                              <td class="title">備註</td>
                              <td class="content">
                                   <input type="text" v-model="ps" placeholder="若無備註請填寫「無」">
                              </td>
                         </tr>
                    </tbody>
               </table>
               <div class="button_aera">
                    <button v-if="putShow" v-on:click="addLeave" type="button">送出</button>
                    <button @click="reset" type="button">Reset</button>
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
          padding-left: 14rem;

          table {
               border-collapse: collapse;

               tbody {
                    tr {
                         td {

                              border: 1px solid black;
                              padding: 1em;

                              .noinput {
                                   border: none;
                                   outline: none;
                                   width: 100%;

                                   &::-webkit-inner-spin-button,
                                   &::-webkit-outer-spin-button {
                                        appearance: none;
                                   }

                                   outline: none;
                              }

                              input {
                                   width: 100%;
                              }

                              //上傳圖片的區域
                              .updatefile_aera {
                                   position: relative;
                                   display: flex;

                                   //上傳圖片的input
                                   .inputfile {
                                        width: 80%;

                                   }

                                   //上傳的圖片
                                   .pic {
                                        position: absolute;
                                        width: 500px;
                                        height: 500px;
                                        bottom: 30px;
                                        right: 0px;
                                        object-fit: contain;
                                   }

                                   //"點我查看圖片"的文字
                                   .see_pic {
                                        cursor: pointer;
                                   }
                              }
                         }

                         //標題
                         .title {
                              background-color: #2e7c9f;
                              color: white;
                              font-weight: bold;
                         }

                         //內容
                         .content {
                              background-color: white;

                              .totalbtn {
                                   margin-right: 20px;
                                   border: 1px solid black;
                              }

                              .time {
                                   font-weight: bold;
                              }

                              .userinfo_aera {
                                   display: flex;

                                   .userid_aera {
                                        display: flex;

                                        p {
                                             width: 50%;
                                             margin-top: 15px;
                                             padding-top: 2px;
                                             text-align: center;
                                             background-color: #ffe593;
                                        }
                                   }

                                   .userid_name {
                                        display: flex;

                                        p {
                                             width: 50%;
                                             margin-top: 15px;
                                             padding-top: 2px;
                                             text-align: center;
                                             background-color: #ffe593;

                                        }
                                   }

                                   .userid_team {
                                        display: flex;

                                        p {
                                             width: 50%;
                                             margin-top: 15px;
                                             padding-top: 2px;
                                             text-align: center;
                                             background-color: #ffe593;

                                        }
                                   }

                              }
                         }

                    }
               }
          }

          .button_aera {
               // border: 2px solid red;
               width: 85%;
               margin-top: 30px;
               display: flex;
               justify-content: space-evenly;


               button {
                    width: 100px;
                    // display: block;
                    display: inline;
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
</style>

