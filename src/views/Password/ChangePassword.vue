<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';
//Pinia 方法
import { mapState, mapActions } from 'pinia'
//自己的資料庫(預設匯入)
import indexStore from '../../store/indexStore';
//子元件
import ChangeWindow from '../../components/ChangeWindow.vue'



export default {
    components: {
        ChangeWindow

    },
    data() {
        return {
            userId: null,
            inputOldPwd: null,
            inputNewPwd: null,
            inputNewPwd2: null,



        }
    },
    computed: {
        ...mapState(indexStore, ["isShowChangePwdWindow"])


    },
    methods: {
        cancel() {
            this.$router.push({ name: "home" })
        },

        passwordCheck() {
            if (this.userId === null || this.inputOldPwd === null || this.inputNewPwd === null || this.inputNewPwd2 == null) {
                return alert("所有欄位不能空白");
            }
            if (this.inputNewPwd !== this.inputNewPwd2) {
                return alert("您輸入的密碼有誤");

            } else {
                //防呆通過執行變更密碼的程式
                axios.post('http://localhost:8080/change_password/', {

                    "UserID": this.userId,
                    "OldPassWord": this.inputOldPwd,
                    "NewPassWord": this.inputNewPwd,

                })
                    .then(data => {
                        // console.log(data);
                        if(data.data.code !== "200"){
                            return alert(data.data.messgae);

                        }
                        this.ChangePwdWindow();
                    })

            }

        },
        ...mapActions(indexStore, ["ChangePwdWindow"])


    },


}

</script>

<template>
    <div class="container">
        <!-- 標題區域 -->
        <div class="title-aere">
            <h1>W/X/Y Online System</h1>
            <img class="logo-pic" src="../../../public/img/Logo.jpg" alt="Logo">
        </div>
        <!-- 黑線 -->
        <div class="kurosenn-futo"></div>
        <!-- 登入區域 -->
        <div class="main">
            <h2>ChangePassword</h2>
            <hr>
            <div class="login">
                <div class="login-aera">
                    <div class="input-aera1">
                        <span>User ID</span>
                        <input v-model="userId" class="input-id" type="number" placeholder="請輸入「員工工號」">
                    </div>
                    <div class="input-aera2">
                        <span>原始密碼</span>
                        <input v-model="inputOldPwd" class="input-pwd" type="email" placeholder="請輸入「原始密碼」">
                    </div>
                    <div class="input-aera3">
                        <span>新密碼</span>
                        <input v-model="inputNewPwd" class="input-newPwd" type="email" placeholder="請輸入「新密碼」">
                    </div>
                    <div class="input-aera4">
                        <span>確認新密碼</span>
                        <input v-model="inputNewPwd2" class="input-newPwd2" type="email" placeholder="請再次輸入「新密碼」">
                    </div>
                    <div class="button-aera">
                        <button @click="passwordCheck" type="button">變更密碼</button>
                        <button v-on:click="cancel" type="button">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ChangeWindow />
</template>

<style lang="scss" scoped>
.container {
    margin: 0;
    margin: 0 auto;

    .title-aere {
        // border:  2px solid black;
        display: flex;
        justify-content: space-between;

        h1 {
            margin: auto 0;
            font-style: italic;
            font-weight: bold;
            background: linear-gradient(to top, rgb(208, 117, 241), rgb(112, 216, 240));
            background: -webkit-linear-gradient(to top, rgb(208, 117, 241), rgb(112, 216, 240));
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        .logo-pic {
            width: 30%;
            height: 30%;
        }
    }

    .kurosenn-futo {
        border-bottom: 5px solid black;
        margin: 2rem 0;
        width: 100%;

    }

    .main {
        background-color: white;
        border: 1px solid black;
        width: 40vw;
        height: 60vh;
        margin: 0 auto;
        border-radius: 6px;
        box-shadow: 1px 1px 1px black;

        h2 {
            margin-top: 1rem;
            text-align: center;
            font-weight: bold;
            background: linear-gradient(to top, rgb(162, 74, 195), rgb(61, 172, 197));
            background: -webkit-linear-gradient(to top, rgb(162, 74, 195), rgb(61, 172, 197));
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        .login {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;

            .login-aera {
                span {
                    font-weight: bold;
                }

                input {
                    width: 300px;

                    &::-webkit-inner-spin-button,
                    &::-webkit-outer-spin-button {
                        appearance: none;
                    }
                }

                .input-aera1 {
                    .input-id {
                        margin-left: 16px;
                        margin-bottom: 1rem;

                    }
                }

                .input-aera2 {
                    .input-pwd {
                        margin-left: 8px;
                        margin-bottom: 1rem;

                    }
                }

                .input-aera3 {
                    .input-newPwd {
                        margin-left: 23px;
                        margin-bottom: 1rem;
                        width: 302px;
                    }
                }

                .input-aera4 {
                    position: relative;
                    right: 30px;


                    span {
                        margin-right: 10px;

                    }

                    .input-newPwd2 {
                        margin-left: 10px;
                        margin-bottom: 1rem;
                        width: 305px;



                    }

                }

                .button-aera {
                    display: flex;
                    justify-content: space-between;

                    button {
                        width: 100px;
                        display: block;
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

    }


    .link {
        text-decoration: none;
        color: white;
    }
}
</style>

