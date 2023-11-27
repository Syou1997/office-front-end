<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
export default {
    data() {
        return {
            //後端傳來的userId
            userIdForJava: null,
            isShowHint: false,
            //輸入的工號
            inputUserId: null,
            //輸入的密碼
            inputPwd: null,
            //輸入的密碼2
            inputPwd2: null,
            //輸入的帳戶啟用
            inputAccountState: null,
            //輸入的帳戶權限
            inputAccountPermissions: null,

        }
    },
    methods: {
        InputReset() {
            this.inputUserId = null;
            this.inputPwd = null;
            this.inputPwd2 = null;
            this.inputAccountState = null;
            this.inputAccountPermissions = null;

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
        addUser() {
            if (this.inputUserId === null || this.inputPwd === null || this.inputAccountPermissions === null) {
                alert("所有欄位不可空白");
                return;

            }
            if (this.inputPwd !== this.inputPwd2) {
                alert("「密碼」與「密碼確認」欄位的內容不相同");
                return;
            }
            //post請求
            axios.post('http://localhost:8080/add_account/', {
                "UserID": this.inputUserId,
                "PassWord": this.inputPwd,
                "AccountState": this.inputAccountState,
                "AccountPermissions": this.inputAccountPermissions
            })
                .then(data => {
                    //防呆，如果userId已經存在會回傳已經有此帳號的錯誤訊息
                    if (data.data.code !== "200") {
                        return alert(data.data.messgae);
                    }
                    alert("新增帳戶成功");
                    this.$router.push({
                        name: "AddAccount2",
                    });
                })


        },
        // 出現提示視窗
        showHint() {
            this.isShowHint = !this.isShowHint;

        }

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
        <h1>新增帳戶</h1>
        <!-- 主要區域 -->
        <div class="main_aera">
            <!-- 新增資料區 -->
            <div class="add_aera">
                <!-- 員工工號輸入區 -->
                <div class="input_aera1">
                    <h2>員工ID:</h2>
                    <input class="input_id" type="number" placeholder="請輸入「員工工號」" v-model="inputUserId">
                </div>
                <!-- 密碼輸入區 -->
                <div class="input_aera2">
                    <h2>密碼:</h2>
                    <input class="input_pwd" type="text" placeholder="請輸入「密碼」" v-model="inputPwd">
                </div>
                <!-- 密碼確認的輸入區域 -->
                <div class="input_aera3">
                    <h2>密碼確認:</h2>
                    <input class="input_pwd2" type="text" placeholder="請再次輸入「密碼」" v-model="inputPwd2">
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
                    <button @click="addUser" type="button">新增帳戶</button>
                    <button v-on:click="InputReset" type="button">Reset</button>
                </div>
                <div class="go_page_aera">
                    <!-- 提示視窗-->
                    <div v-show="isShowHint" class="hint">
                        <small>前往「新增帳戶資訊」頁面</small>
                    </div>
                    <!-- 箭頭(前往新增帳戶資訊) -->
                    <RouterLink class="link" to="/HeaderView/HumanResource/AddAccount2">
                        <i v-on:mouseover="showHint" class="fa-solid fa-right-long icon"></i>
                    </RouterLink>


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

                    ;
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

                .link {
                    text-decoration: none;

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
}
</style>

