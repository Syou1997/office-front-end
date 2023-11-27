<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
    // 從元件ApprovalLeave過帶來的假單編號
    props: ["leaveId"],
    data() {
        return {
            //使用者的員工Id
            userIdForJava: null,
            //使用者的姓名
            userName: null,
            //使用者的部門
            userTeam: null,
            //請假者工號
            getId: null,
            //請假者姓名
            getName: null,
            //請假者部門
            getTeam: null,
            //假別
            getLeave: null,
            //請假事由
            getLeaveReason: null,
            //起始時間
            getStartDay: null,
            //結束時間
            getEndDay: null,
            //結束時間-起始時間(請假時數)
            getTimeDifference: null,
            //備註
            getPs: null,
            //假單簽核時間
            newDate: null,
            //審核不通過原因
            failReason: "無",


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
                            this.userName = data.userInfo.userName;
                            this.userTeam = data.userInfo.team;
                            //Get取得假單資訊
                            fetch("http://localhost:8080/get_leave_one/" + this.leaveId)
                                .then(res => res.json())
                                .then(data => {
                                    this.getId = data.dayOff.userId;
                                    this.getName = data.dayOff.userName;
                                    this.getTeam = data.dayOff.team;
                                    this.getLeave = data.dayOff.leave;
                                    this.getLeaveReason = data.dayOff.leaveReason;
                                    this.getStartDay = data.dayOff.startDay;
                                    this.getEndDay = data.dayOff.endDay;
                                    this.getTimeDifference = data.dayOff.time
                                    this.getPs = data.dayOff.ps;

                                })

                        })


                })
        },

        //簽核假單
        LeavePass() {
            //取得當下時間
            this.newDate = new Date();
            // console.log(this.newDate);
            //防呆
            if (this.failReason === null) {
                alert("「審核不通過原因」請勿空白");
                return;
            }
            //如果是HR(人資部門)就是直接"結案"
            if (this.userTeam === "HR") {
                //Post 將假單資訊傳入後端
                axios.post('http://localhost:8080/update_leave/', {

                    //假單Id
                    "Id": this.leaveId,
                    //審核者
                    "Auditor": this.userName,
                    //審核狀態
                    "State": "結案",
                    //審核不通過原因
                    "FailReason": this.failReason,
                    //假單更新時間
                    "UpdateTime": this.newDate,

                })
                    .then(data => {
                        // console.log(this.newDate);
                        if (data.data.code !== "200") {
                            return alert(data.data.messgae);
                        }
                        alert("假單已審核");
                        this.$router.push({
                            name: "ApprovalLeave",
                        });
                        //用員工的年假時數來減去請假時數
                        if (this.getLeave === "年假") {
                            axios.post('http://localhost:8080/annual_leave_update/', {

                                //請假員工的工號(Id)
                                "UserID": this.getId,
                                //請假時數(傳到後端後不是直接存，而是拿來減原本的)
                                "AnnualLeave": this.getTimeDifference,


                            })
                                .then(data => {
                                    if (data.data.code !== "200") {
                                        return alert(data.data.messgae);
                                    }
                                })

                        }
                        //用員工的病假時數來減去請假時數
                        if (this.getLeave === "病假") {
                            axios.post('http://localhost:8080/sick_leave_update/', {

                                //請假員工的工號(Id)
                                "UserID": this.getId,
                                //請假時數(傳到後端後不是直接存，而是拿來減原本的)
                                "SickLeave": this.getTimeDifference,


                            })
                                .then(data => {
                                    if (data.data.code !== "200") {
                                        return alert(data.data.messgae);
                                    }
                                })

                        }
                    })


            }
            //如果是主管就是"單位主管審核通過"
            else {
                //Post 將假單資訊傳入後端
                axios.post('http://localhost:8080/update_leave/', {

                    //假單Id
                    "Id": this.leaveId,
                    //審核者
                    "Auditor": this.userName,
                    //審核狀態
                    "State": "單位主管審核通過",
                    //審核不通過原因
                    "FailReason": this.failReason,
                    //假單更新時間
                    "UpdateTime": this.newDate,

                })
                    .then(data => {
                        if (data.data.code !== "200") {
                            return alert(data.data.messgae);
                        }
                        alert("假單已審核");
                        this.$router.push({
                            name: "ApprovalLeave",
                        });
                    })
            }



        },
        //駁回假單
        LeaveFail() {
            //取得當下時間
            this.newDate = new Date();
            //防呆
            if (this.failReason === null) {
                alert("「審核不通過原因」請勿空白");
                return;
            }
            if (this.failReason === "無") {
                alert("「審核不通過原因」不可為無");
                return;
            }
            //Post 將假單資訊傳入後端
            axios.post('http://localhost:8080/update_leave/', {

                //假單Id
                "Id": this.leaveId,
                //審核者
                "Auditor": this.userName,
                //審核狀態
                "State": "駁回",
                //審核不通過原因
                "FailReason": this.failReason,
                //假單更新時間
                "UpdateTime": this.newDate,

            })
                .then(data => {
                    if (data.data.code !== "200") {
                        return alert(data.data.messgae);
                    }
                    alert("假單已駁回");
                    this.$router.push({
                        name: "ApprovalLeave",
                    });
                })


        }

    },
    mounted() {
        this.getUserId();
    },
}

</script>

<template>
    <div class="container">
        <h1>簽核單號 {{ leaveId }}</h1>
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
                                    <input class="noinput" type="number" v-model="getId" readonly>
                                </div>
                                <div class="userid_name">
                                    <p>員工姓名</p>
                                    <input class="noinput" type="text" v-model="getName" readonly>
                                </div>
                                <div class="userid_team">
                                    <p>部門單位</p>
                                    <input class="noinput" type="text" v-model="getTeam" readonly>
                                </div>


                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">假別</td>
                        <td class="content">
                            <input class="noinput" type="text" v-model="getLeave" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">請假事由</td>
                        <td class="content">
                            <input class="noinput" type="text" v-model="getLeaveReason" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">起始時間</td>
                        <td class="content">
                            <input class="noinput" type="datetime-local" v-model="getStartDay" readonly>
                        </td>

                    </tr>
                    <tr>
                        <td class="title">結束時間</td>
                        <td class="content">
                            <input class="noinput" type="datetime-local" v-model="getEndDay" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">請假時間合計</td>
                        <td class="content">
                            <span>{{ getTimeDifference }} 小時</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">備註</td>
                        <td class="content">
                            <input class="noinput" type="text" v-model="getPs" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">駁回原因</td>
                        <td class="content">
                            <input type="text" v-model="failReason" placeholder="若審核通過請填寫「無」">
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="button_aera">
                <button v-on:click="LeavePass" type="button">簽核</button>
                <button @click="LeaveFail" type="button">駁回</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    margin: 0;
    h1{
        font-weight: bold;
    }
    .main_aera {
        padding-left: 11rem;

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

