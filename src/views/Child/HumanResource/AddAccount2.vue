<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
    data() {
        return {
            //輸入的工號
            inputUserId: null,
            //輸入的姓名
            inputUserName: null,
            //輸入的部門
            inputTeam: null,
            //輸入的公司信箱
            inputEmail: null,
            //輸入的出生年月日
            inputDob: null,
            //輸入的特休剩餘時數
            inputSickLeave: 240,
            //輸入的病假剩餘時數
            inputAnnualLeave: 40,
            //輸入的到職日
            inputInDay: null,
            //輸入的離職日
            inputOutDay: null,
            //輸入的離職原因
            inputResignReason: null,
        }
    },
    methods: {
        InputReset() {
            this.inputUserId = null;
            this.inputUserName = null;
            this.inputTeam = null;
            this.inputEmail = null;
            this.inputDob = null;
            this.inputAnnualLeave = null;
            this.inputSickLeave = null;
            this.inputInDay = null;
            this.inputOutDay = null;
            this.inputResignReason = null;

        },
        addUserInfo() {
            if (this.popsInputUserId === null || this.inputUserName === null || this.inputTeam === null || this.inputEmail === null || this.inputDob === null || this.inputAnnualLeave === null || this.inputSickLeave === null || this.inputInDay === null) {
                alert("除了「離職日」「離職原因」以外所有欄位不可空白");
                return;
            }
            //post請求
            axios.post('http://localhost:8080/add_user_info/', {
                "UserID": this.inputUserId,
                "UserName": this.inputUserName,
                "Team": this.inputTeam,
                "Email": this.inputEmail,
                "Dob": this.inputDob,
                "AnnualLeave": this.inputAnnualLeave,
                "SickLeave": this.inputSickLeave,
                "InDay": this.inputInDay,
                "OutDay": this.inputOutDay,
                "ResignReason": this.inputResignReason,
            })
                .then(data => {
                    //防呆，如果userId已經存在會回傳已經有此帳號的錯誤訊息
                    if (data.data.code === "404") {
                        return alert(data.data.messgae);
                    }
                    alert("新增帳戶資訊成功");
                    this.$router.push({
                        name: "HumanResource",
                    });
                })
        },

    },
    mounted() {
        //   console.log(this.popsInputUserId);
    },

}

</script>

<template>
    <!-- 外層容器 -->
    <div class="container">
        <!-- 標題 -->
        <h1>新增帳戶資訊</h1>
        <!-- 主要區域 -->
        <div class="main_aera">
            <!-- 新增資料區 -->
            <div class="add_aera">
                <!-- 表格區域 -->
                <table class="table">
                    <tr>
                        <td class="title">員工工號</td>
                        <td>
                            <input type="number" placeholder="請輸入「員工工號」" v-model="inputUserId">
                        </td>

                    </tr>
                    <tr>
                        <td class="title">姓名</td>
                        <td><input type="text" placeholder="請輸入「姓名」" v-model="inputUserName"></td>
                    </tr>
                    <tr>
                        <td class="title">部門單位</td>
                        <td>
                            <select name="team" id="team" v-model="inputTeam">
                                <option value="HR" key="item">HR</option>
                                <option value="Preload" key="item">Preload</option>
                                <option value="Driver" key="item">Driver</option>
                                <option value="APP" key="item">APP</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">公司信箱</td>
                        <td><input type="email" placeholder="請輸入「公司信箱」" v-model="inputEmail"></td>
                    </tr>
                    <tr>
                        <td class="title">出生年月日</td>
                        <td><input type="date" v-model="inputDob" placeholder="請輸入「出生年月日」"></td>
                    </tr>
                    <tr>
                        <td class="title">特休剩餘時數</td>
                        <td><input type="number" placeholder="請輸入「特休剩餘時數」" v-model="inputAnnualLeave"></td>
                    </tr>
                    <tr>
                        <td class="title">病假剩餘時數</td>
                        <td><input type="number" placeholder="請輸入「病假剩餘時數」" v-model="inputSickLeave"></td>
                    </tr>
                    <tr>
                        <td class="title">到職日</td>
                        <td><input type="date" v-model="inputInDay" placeholder="請輸入「到職日」"></td>
                    </tr>
                    <tr>
                        <td class="title">離職日</td>
                        <td><input type="date" v-model="inputOutDay" placeholder="請輸入「離職日」(在職員工不需填寫)"></td>
                    </tr>
                    <tr>
                        <td class="title">離職原因</td>
                        <td><input type="text" placeholder="請輸入「離職原因」(在職員工不需填寫)" v-model="inputResignReason"></td>
                    </tr>
                </table>
                <!-- 按鈕區域 -->
                <div class="button_aera">
                    <button @click="addUserInfo" type="button">新增帳戶資訊</button>
                    <button v-on:click="InputReset" type="button">Reset</button>
                </div>


            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.container {
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
                        background-color: #dbf6ff;
                        table-layout: fixed;
                        width: 20%;

                        &:hover {
                            cursor: pointer;
                            background-color: #ffe593;
                        }

                    }
                }
            }

            .button_aera {
                display: flex;
                justify-content: space-around;
                margin-top: 2rem;

                button {
                    width: 110px;
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


        }
    }


}
</style>

