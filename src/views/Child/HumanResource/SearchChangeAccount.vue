<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
    data() {
        return {
            //後端傳來的userId
            userIdForJava: null,
            //輸入的工號
            inputUserId: null,
        }
    },
    methods: {
        // 清空input欄位
        InputReset() {
            this.inputUserId = null;

        },
        //查詢要修改的帳戶(員工Id)
        searchUserId() {
            if (this.inputUserId === null) {
                alert("請輸入查詢要修改的帳戶的員工Id");
                return;
            }
            //post請求(帳戶的表)
            axios.post('http://localhost:8080/search_account/', {
                "UserID": this.inputUserId,
            })
                .then(data => {
                    //防呆，如果userId不存在會回傳不存在此帳號的錯誤訊息
                    if (data.data === 0) {
                        return alert("查無此帳戶");
                    }
                    //post請求(帳戶資訊的表)
                    axios.post('http://localhost:8080/search_user_info/', {
                        "UserID": this.inputUserId,
                    })
                        .then(data => {
                            //防呆，如果userId不存在會回傳不存在此帳號資訊的錯誤訊息
                            if (data.data === 0) {
                                return alert("查無此帳戶資訊");
                            } else {
                                //通過防呆，表示帳戶表和帳戶資訊表都有資料
                                alert("進入工號:" + this.inputUserId + "的修改頁面");
                                this.$router.push({
                                    name: "ChangeAccount",
                                    params: {
                                        //自動名稱:要帶出去的值
                                        userIdForSearch: this.inputUserId,
                                    }
                                });
                            }
                        })



                })
        },
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
                            //如果不是管理者就會跳轉沒權限的畫面
                            this.accountPermissions = data.account.accountPermissions;
                            if (this.accountPermissions !== 99) {
                                this.$router.push({
                                    name: "NoPermissions",
                                });
                            }


                        })

                })
        },
    },
    mounted() {
        this.getUserId();
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
                    <input class="input_id" type="number" placeholder="請先輸入要修改的「員工工號」" v-model="inputUserId">
                </div>
                <!-- 按鈕區域 -->
                <div class="button_aera">
                    <button @click="searchUserId" type="button">查詢帳戶</button>
                    <button v-on:click="InputReset" type="button">Reset</button>
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
    }
}
</style>

