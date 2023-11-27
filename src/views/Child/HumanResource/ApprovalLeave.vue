<script>
import axios from 'axios';
export default {
     data() {
          return {
               //使用者的員工Id
               userIdForJava: null,
               //使用者的姓名(審核者)
               userName: null,
               //使用者的權限
               userPermissions: null,
               //使用者的部門
               userTeam: null,
               //簽核的請假清單
               userLeaveList: [],
               userLeaveListBackup1: [], //給篩選器用的
               userLeaveListBackup2: [], //給篩選器用的
               userLeaveListBackup3: [], //給篩選器用的
               userLeaveListBackup4: [], //給篩選器用的
               userLeaveListBackup5: [], //給篩選器用的
               fullUserLeaveList: [],
               //請假事由(全部內容)
               leaveReasonFullText: null,
               //請假證明的圖片Id
               picId: null,
               //圖片保存路徑
               img64: null,
               //控制圖片出現與消失
               picShow: false,
               //備註(全部內容)
               psFullText: null,
               //審核不通過原因(全部內容)
               failReasonFullText: null,
               //以下的資訊全都識別的使用者的
               //假單員工部門單位
               team: null,
               //以下的變數是分頁用的
               perpage: 8, //一頁的資料數
               currentPage: 1, //預設分頁
               //表單篩選器的編號
               selectNum: null,
               //是否能簽核的變數
               signCHK: false,

          }
     },
     computed: {
          totalPage() {
               return Math.ceil(this.userLeaveList.length / this.perpage)
               //Math.ceil()取最小整數(無條件進位，例如:16.2就會印出17)
          },
          pageStart() {
               return (this.currentPage - 1) * this.perpage
               //取得該頁第一個值的index
          },
          pageEnd() {
               return this.currentPage * this.perpage
               //取得該頁最後一個值的index
          }
     },
     methods: {
          setPage(page) {
               if (page <= 0 || page > this.totalPage) {
                    return
               }
               this.currentPage = page
          },
          //Get UserId
          getUserId() {
               axios.post('http://localhost:8080/get/userid', {

               },
                    { withCredentials: true }
               )
                    .then(data => {
                         this.userIdForJava = data.data.account.userId;
                         //Get 取得使用者帳戶的部門
                         fetch("http://localhost:8080/get_userinfo/" + this.userIdForJava)
                              .then(res => res.json())
                              .then(data => {
                                   this.userTeam = data.userInfo.team;
                                   //Get 取得使用者帳戶的帳號權限
                                   fetch("http://localhost:8080/get_account_info?userId=" + this.userIdForJava)
                                        .then(res => res.json())
                                        .then(data => {
                                             this.userPermissions = data.account.accountPermissions;
                                             //取得簽核假單資訊(完整)
                                             //如果是HR(人資部門)會顯示所有人假單
                                             if (this.userTeam === "HR" || this.userPermissions === 99) {
                                                  //取得簽核假單資訊(完整)
                                                  this.getLeaveInfoHR();
                                                  //取得簽核假單資訊(裁切)
                                                  fetch("http://localhost:8080/get_leave/all/")
                                                       .then(res => res.json())
                                                       .then(data => {
                                                            this.userLeaveList = data.dayOffList.filter((item) => {
                                                                 return this.userIdForJava !== item.userId;
                                                            })
                                                            this.reviseList();

                                                       })
                                             }
                                             else {
                                                  //如果不是HR(人資部門)，就再判斷是不是主管，是就會顯示同部門的成員的假單
                                                  if (this.userPermissions >= 2) {
                                                       //取得簽核假單資訊(完整)
                                                       this.getLeaveInfo();
                                                       fetch("http://localhost:8080/get_leave_by/" + this.userTeam)
                                                            .then(res => res.json())
                                                            .then(data => {
                                                                 this.userLeaveList = data.dayOffList.filter((item) => {
                                                                      return this.userIdForJava !== item.userId;
                                                                 })


                                                                 this.reviseList();

                                                            })

                                                  }
                                                  //連主管都不是，顯示沒權限的畫面
                                                  else {
                                                       this.$router.push({
                                                            name: "NoPermissions",
                                                       });

                                                  }
                                             }



                                        })
                              })

                    })
          },
          //取得簽核假單資訊(完整(人資部門用))
          getLeaveInfoHR() {
               fetch("http://localhost:8080/get_leave/all/")
                    .then(res => res.json())
                    .then(data => {
                         this.fullUserLeaveList = data.dayOffList.filter((item) => {
                              return this.userIdForJava !== item.userId;
                         })

                    })
          },

          //取得簽核假單資訊(完整(主管用))
          getLeaveInfo() {
               fetch("http://localhost:8080/get_leave_by/" + this.userTeam)
                    .then(res => res.json())
                    .then(data => {
                         data.dayOffList.forEach((item) => {
                              console.log(item);
                         });
                         this.fullUserLeaveList = data.dayOffList.filter((item) => {
                              return this.userIdForJava !== item.userId;
                         })

                    })
          },


          //處理接進來的請假單資訊
          reviseList() {
               //切割時間
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

                    //請假事由的字數太多
                    if (item.leaveReason.length > 10) {
                         item.leaveReason = item.leaveReason.slice(0, 10) + "...";
                    }
                    //備註的字數太多
                    if (item.ps.length > 10) {
                         item.ps = item.ps.slice(0, 10) + "...";
                    }
                    //不通過理由的字數太多
                    if (item.failReason === null) {

                    } else {
                         if (item.failReason.length > 10) {
                              item.failReason = item.failReason.slice(0, 10) + "...";
                         }

                    }



               })


          },
          //查看完整訊息(請假事由)
          showLeaveReasonFull(item) {
               this.fullUserLeaveList.forEach((info) => {
                    if (info.id === item.id) {
                         this.leaveReasonFullText = info.leaveReason;
                    }
               })
          },
          //查看完整訊息(備註)
          showPsFull(item) {
               this.fullUserLeaveList.forEach((info) => {
                    if (info.id === item.id) {
                         this.psFullText = info.ps;
                    }
               })
          },
          //查看完整訊息(請假不通過理由)
          showFailReasonFull(item) {
               this.fullUserLeaveList.forEach((info) => {
                    if (info.id === item.id) {
                         this.failReasonFullText = info.failReason;
                    }
               })
          },
          //查看圖片(請假證明)
          seePic(item) {
               this.picId = item.picId;
               //沒有請假證明沒有圖片
               //有請假證明有圖片
               if (this.picId === 0) {
                    alert("無請假證明");
                    return;
               }
               //有請假證明有圖片的情況
               else {
                    //取得base64格式的圖片
                    fetch("http://localhost:8080/get_pic_path/" + this.picId)
                         .then(res => res.json())
                         .then(data => {
                              this.img64 = data.img64;
                              // console.log(this.img64);
                              // 將base64Image設置為Vue數據屬性
                              this.imageData = `data:image/jpeg;base64,${this.img64}`;
                              this.picShow = !this.picShow;


                         })



               }

          },
          //關閉請假證明的圖片的方法
          clsPic() {
               this.picShow = !this.picShow;
          },
          //取得假單編號的方法(接著進修改假單的畫面，也就是審核)
          geyLeaveNum(index,chk) {
               //先判斷是否結案
               if(chk === "結案"){
                    alert("此假單已結案");
                    return;

               }
               if(chk === "駁回"){
                    alert("此假單已駁回");
                    return;

               }
               this.$router.push({
                    name: "LeaveChange",
                    params: {
                         //自動名稱:要帶出去的值
                         leaveId: index,
                    }
               });

          },
          //篩選器的方法
          selectGo() {
               if (this.selectNum === null) {
                    // 把切割完的的資料做深層拷貝
                    this.userLeaveListBackup1 = JSON.parse(JSON.stringify(this.userLeaveList));
                    this.userLeaveListBackup2 = JSON.parse(JSON.stringify(this.userLeaveList));
                    this.userLeaveListBackup3 = JSON.parse(JSON.stringify(this.userLeaveList));
                    this.userLeaveListBackup4 = JSON.parse(JSON.stringify(this.userLeaveList));
                    this.userLeaveListBackup5 = JSON.parse(JSON.stringify(this.userLeaveList));
               }

               if (this.selectNum === "1") {
                    this.userLeaveList = this.userLeaveListBackup1;
               }
               if (this.selectNum === "2") {
                    this.userLeaveList = this.userLeaveListBackup2;
                    this.userLeaveList.forEach((item, index) => {
                         if (item.state === "審核中") {

                         } else {
                              this.userLeaveList.splice(index, 1);
                         }

                    })

               }
               if (this.selectNum === "3") {
                    this.userLeaveList = this.userLeaveListBackup3;
                    this.userLeaveList.forEach((item, index) => {
                         if (item.state === "駁回") {

                         } else {
                              this.userLeaveList.splice(index, 1);
                         }

                    })

               }
               if (this.selectNum === "4") {
                    this.userLeaveList = this.userLeaveListBackup4;
                    this.userLeaveList.forEach((item, index) => {
                         if (item.state === "單位主管審核通過") {

                         } else {
                              this.userLeaveList.splice(index, 1);
                         }

                    })

               }
               if (this.selectNum === "5") {
                    console.log("方法5");
                    this.userLeaveList = this.userLeaveListBackup5;
                    this.userLeaveList.forEach((item, index) => {
                         if (item.state === "結案") {

                         } else {
                              this.userLeaveList.splice(index, 1);
                         }

                    })

               }
          },
          //是否能簽核的方法
          sign(){

          }


     },
     mounted() {
          this.getUserId();

     },

     updated() {
          this.selectGo();


     },

}

</script>

<template>
     <div class="container">
          <div v-if="picShow" class="pic-aera">
               <img id="img" v-if="picShow" class="pic" :src="imageData" alt="圖片載入失敗">
               <button @click="clsPic" v-if="picShow" type="button" class="clsPicBtn">關閉</button>
          </div>
          <div class="top_aera">
               <h1>假單簽核</h1>
               <div class="select_aera">
                    <label for="full">全部</label>
                    <input class="full" type="radio" name="filter" id="full" v-model="selectNum" value="1">

                    <label for="ing">審核中</label>
                    <input class="ing" type="radio" name="filter" id="ing" v-model="selectNum" value="2">

                    <label for="ng">駁回</label>
                    <input class="ng" type="radio" name="filter" id="ng" v-model="selectNum" value="3">

                    <label for="pass">單位主管審核通過</label>
                    <input class="pass" type="radio" name="filter" id="pass" v-model="selectNum" value="4">


                    <label for="fullPass">結案</label>
                    <input class="fullPass" type="radio" name="filter" id="fullPass" v-model="selectNum" value="5">
               </div>

          </div>

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
                              <th>審核人</th>
                              <th>審核狀態</th>
                              <th>駁回原因</th>
                              <th>更新時間</th>
                              <th>簽核欄位</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr v-for="item, index in userLeaveList.slice(pageStart, pageEnd)">
                              <td>{{ item.id }}</td>
                              <td>{{ item.userId }}</td>
                              <td>{{ item.userName }}</td>
                              <td>{{ item.team }}</td>
                              <td>{{ item.leave }}</td>
                              <td> {{ item.leaveReason }}
                                   <button class="fullBtn" 
                                        @mouseover="showLeaveReasonFull(item)" href="#" :title="leaveReasonFullText">
                                   </button>
                              </td>
                              <td>{{ item.startDay }}</td>
                              <td>{{ item.endDay }}</td>
                              <td>{{ item.time }}</td>
                              <td><button @click="seePic(item)" type="button">點我查看</button></td>
                              <td>{{ item.ps }}
                                   <button class="fullBtn"  @mouseover="showPsFull(item)"
                                        href="#" :title="psFullText">
                                   </button>
                              </td>
                              <td>{{ item.auditor }}</td>
                              <td>{{ item.state }}</td>
                              <td>{{ item.failReason }}
                                   <button class="fullBtn"
                                   @mouseover="showFailReasonFull(item)" href="#" :title="failReasonFullText">
                                   </button>
                              </td>
                              <td>{{ item.updateTime }}</td>
                              <td>
                                   <button :disabled = "signCHK"   @click="geyLeaveNum(item.id,item.state)" type="button">簽核</button>
                              </td>
                         </tr>
                    </tbody>
               </table>



          </div>
          <!-- pagination -->
          <ul class="pagination">
               <li class="page-item" @click.prevent="setPage(currentPage - 1)">
                    <a class="page-link" href="#" aria-label="Previous">
                         <span aria-hidden="true">&laquo;</span>
                    </a>
               </li>
               <li class="page-item" :class="{ 'active': (currentPage === (n)) }" v-for="(n, index) in totalPage"
                    :key="index" @click.prevent="setPage(n)">
                    <a class="page-link" href="#">{{ n }}</a>
               </li>
               <li class="page-item" @click.prevent="setPage(currentPage + 1)">
                    <a class="page-link" href="#" aria-label="Next">
                         <span aria-hidden="true">&raquo;</span>
                    </a>
               </li>
          </ul>
     </div>
</template>


<style lang="scss" scoped>
.container {
     position: relative;
     max-height: 100vh;
     margin: 0px;

     .pic-aera {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          // border: 2px solid red;
          background-color: rgba(126, 154, 239, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
          

          .pic {

               width: 60%;
               height: 60%;

          }

          .clsPicBtn {
               position: absolute;
               bottom: 5em;
               left: 50%;
               transform: translate(-50%, -50%);
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

     .top_aera {
          display: flex;
          justify-content: space-between;

          h1 {
               display: inline;
               width: 13%;
               font-weight: bold;
          }

          .select_aera {
               margin-top: 1em;

               .full,
               .ing,
               .ng,
               .pass,
               .fullPass {
                    margin-right: 15px;

               }

          }

     }

     //表格
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
                              position: relative;
                              width: 300px;
                              border: 1px solid black;
                              padding: 1em;
                              text-align: center;
                              font-size: 10px;

                              .fullBtn {
                                   position: absolute;
                                   top: 0px;
                                   left: 0px;
                                   width: 100%;
                                   height: 100%;
                                   display: block;
                                   font-weight: bolder;
                                   font-size: 30px;
                                   opacity: 0.0;
                                   cursor: pointer;
                                   
                              }

                              button {
                                   border: none;
                                   background-color: #5ca4c5;
                                   border-radius: 5px;
                                   cursor: pointer;
                                   transition: 0.2s;
                                   color: white;

                                   &:hover {
                                        scale: 1.05s;
                                        background-color: #9acae2;

                                   }

                                   &:active {
                                        scale: 0.95s;
                                        background-color: #5ca4c5;
                                   }
                              }

                         }

                    }

               }
          }


     }

     .pagination {
          position: absolute;
          bottom: 50%;
          left: 50%;
          bottom: -3%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          margin-top: 1em;
          box-shadow: 1px 1px 3px rgb(112, 216, 240);


     }

}
</style>

