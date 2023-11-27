<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
    data() {
        return {
            //從JAVA抓過來的userId
            userIdForJava: null,
            //登入帳號權限
            accountPermissions: null,
            //隱藏資訊用的變數
            isShow: true,
            //輸入的姓名
            inputUserName: null,
            //輸入的部門
            inputTeam: null,
            //輸入的公司信箱
            inputEmail: null,
            //輸入的出生年月日
            inputDob: null,
            //輸入的特休剩餘時數
            inputSickLeave: null,
            //輸入的病假剩餘時數
            inputAnnualLeave: null,
            //輸入的到職日
            inputInDay: null,
            //輸入的離職日
            inputOutDay: null,
            //輸入的離職原因
            inputResignReason: null,

        }
    },
    methods: {
        //跟後端要UserID(透過sessionid)
        getUserId() {
            axios.post('http://localhost:8080/get/userid', {

            },
                { withCredentials: true }
            )
                .then(data => {
                    this.userIdForJava = data.data.account.userId;
                    //Get User的資訊
                    fetch("http://localhost:8080/get_userinfo/" + this.userIdForJava)
                        .then(res => res.json())
                        .then(data => {
                            this.inputUserName = data.userInfo.userName;
                            this.inputTeam = data.userInfo.team;
                            this.inputEmail = data.userInfo.email;
                            this.inputDob = data.userInfo.dob.slice(0, 10);
                            this.inputAnnualLeave = data.userInfo.annualLeave;
                            this.inputSickLeave = data.userInfo.sickLeave;
                            this.inputInDay = data.userInfo.inDay.slice(0, 10);
                            this.inputOutDay = data.userInfo.outDay.slice(0, 10);
                            this.inputResignReason = data.userInfo.resignReason;

                        })
                    //Get 取得帳戶的員工Id、密碼、啟用狀態、權限
                    fetch("http://localhost:8080/get_account_info?userId=" + this.userIdForJava)
                        .then(res => res.json())
                        .then(data => {
                            //如果不是管理者就會隱藏某些欄位
                            this.accountPermissions = data.account.accountPermissions;
                            if (this.accountPermissions !== 99) {
                                this.isShow = false;
                            }

                        })

                })


        },


    },
    mounted() {
        //Get UserId
        this.getUserId();



    },

}

</script>

<template>
    <!-- 外層容器 -->
    <div class="container">
        <!-- 標題 -->
        <h1>個人資料</h1>
        <!-- 主要區域 -->
        <div class="main_aera">
            <!-- 新增資料區 -->
            <div class="add_aera">
                <!-- 表格區域 -->
                <table class="table">
                    <tr>
                        <td class="title">員工工號</td>
                        <td>
                            <input type="number" :value="userIdForJava" readonly>
                        </td>

                    </tr>
                    <tr>
                        <td class="title">姓名</td>
                        <td><input type="text" v-model="inputUserName" readonly></td>
                    </tr>
                    <tr>
                        <td class="title">部門單位</td>
                        <td><input type="text" v-model="inputTeam" readonly></td>
                    </tr>
                    <tr>
                        <td class="title">公司信箱</td>
                        <td><input type="email" v-model="inputEmail" readonly></td>
                    </tr>
                    <tr>
                        <td class="title">出生年月日</td>
                        <td><input type="date" v-model="inputDob" readonly></td>
                    </tr>
                    <tr>
                        <td class="title">特休剩餘時數</td>
                        <td><input type="number" v-model="inputAnnualLeave" readonly></td>
                    </tr>
                    <tr>
                        <td class="title">病假剩餘時數</td>
                        <td><input type="number" v-model="inputSickLeave" readonly></td>
                    </tr>
                    <tr>
                        <td class="title">到職日</td>
                        <td><input type="date" v-model="inputInDay" readonly></td>
                    </tr>
                    <tr>
                        <td v-if="isShow" class="title">離職日</td>
                        <td v-if="isShow"><input type="date" v-model="inputOutDay" readonly></td>
                    </tr>
                    <tr>
                        <td v-if="isShow" class="title">離職原因</td>
                        <td v-if="isShow"><input type="text" v-model="inputResignReason"></td>
                    </tr>
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

        .add_aera {
            padding: 20px;

            table {

                tr {
                    td {
                        border: 1px solid black;

                        input {
                            border: none;
                            outline: none;
                            width: 100%;

                            &::-webkit-inner-spin-button,
                            &::-webkit-outer-spin-button {
                                appearance: none;
                            }
                        }

                    }

                    .title {
                        background-color: #4cb9eb;
                        font-weight: bold;
                        table-layout: fixed;
                        width: 20%;

                        &:hover {
                            cursor: pointer;
                            background-color: #ffe593;
                        }

                    }
                }
            }

        }
    }


}
</style>

