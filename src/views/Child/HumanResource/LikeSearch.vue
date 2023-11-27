<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
    data() {
        return {
            //後端傳來的userId
            userIdForJava: null,
            //輸入的姓名
            inputUserName: null,
            //帳號權限
            accountPermissions: null,
            //箭頭的提示框
            hint: "返回查詢頁面",
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
                            //如果不是管理者或是主管就會跳轉沒權限的畫面
                            this.accountPermissions = data.account.accountPermissions;
                            if (this.accountPermissions == 1) {
                                this.$router.push({
                                    name: "NoPermissions",
                                });
                            }


                        })

                })
        },
        // 清空input欄位
        InputReset() {
            this.inputUserName = null;

        },
        //查詢要修改的帳戶(員工Id)
        searchUserName() {
            if (this.inputUserName === null) {
                alert("請輸入要查詢的員工姓名");
                return;
            }
            //通過防呆，進入查詢結果的頁面
            this.$router.push({
                name: "LikeSearchResult",
                params: {
                    //自動名稱:要帶出去的值
                    userNameForSearch: this.inputUserName,
                }
            });

        },
    },
    mounted() {
        this.getUserId();
    },
}
</script>

<template>
    <!-- <p>{{ inputUserName }}</p> -->
    <!-- 外層容器 -->
    <div class="container">
        <!-- 標題 -->
        <h1>模糊查詢帳戶</h1>
        <!-- 主要區域 -->
        <div class="main_aera">
            <!-- 新增資料區 -->
            <div class="add_aera">
                <!-- 員工工號輸入區 -->
                <div class="input_aera1">
                    <h2>員工姓名:</h2>
                    <input class="input_id" type="text" placeholder="請先輸入要查詢的「員工姓名」" v-model="inputUserName">
                </div>
                <!-- 按鈕區域 -->
                <div class="button_aera">
                    <button @click="searchUserName" type="button">查詢帳戶</button>
                    <button v-on:click="InputReset" type="button">Reset</button>
                </div>

            </div>
            <!-- 箭頭(返回查詢頁面) -->
            <RouterLink class="link" to="/HeaderView/HumanResource/QueryAccount">
                <i v-bind:title="hint" class="fa-solid fa-left-long icon"></i>
            </RouterLink>

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
        position: relative;
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

                    &::-webkit-inner-spin-button,
                    &::-webkit-outer-spin-button {
                        appearance: none;
                    }

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

        }

        .icon {
            color: pink;
            font-size: 30px;
            cursor: pointer;
            position: absolute;
            bottom: 50px;
            left: 70px;
        }
    }
}
</style>


