<script>
import { RouterLink } from 'vue-router';
//Pinia 方法
import { mapState, mapActions } from 'pinia'
import axios from 'axios';
//自己的資料庫(預設匯入)
import indexStore from '../../store/indexStore';
//子元件
import ForgetWindow from '../../components/ForgetWindow.vue'



export default {
    components: {
        ForgetWindow

    },
    data() {
        return {
            userId: null,
            email: null,
            inputCaptcha: null,
            captcha: null,
            //Email的正規
            emailStyle : new RegExp("\\w+@\\w+\\."),
            // emailStyle : new RegExp("^\\w+([\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\.\\w{2,3})+$"),
            isShowEmailErroeMeg: false,



        }
    },
    computed: {
        ...mapState(indexStore, ["isShowForgetPwdWindow"])


    },
    methods: {
        cancel() {
            this.$router.push({ name: "home" })
        },
        randomNumber() {
            this.captcha = Math.floor(Math.random() * 1000000);
        },
        reset() {
            userId = null;
            email = null;
            inputCaptcha = null;
        },
        ChangePasswordCheck() {
            if (this.userId === null || this.email === null || this.inputCaptcha === null) {
                alert("所有欄位不可空白");
            }
            if (this.inputCaptcha !== this.captcha) {
                alert("您輸入的驗證碼有誤");
            }
            //通過防呆開始進入發送郵件的方法
            axios.post('http://localhost:8080/mail/', {

                "UserID": this.userId,
                "Email": this.email,

            })
                .then(data => {
                    if (data.data.code !== "200") {
                        return alert(data.data.messgae);

                    }
                    this.ForgetPwdWindow();
                })


        },
        //檢查信箱的方法
        emailCheck(){
            
            if(!this.emailStyle.test(this.email)){
                this.isShowEmailErroeMeg = true;

            }else{
                this.isShowEmailErroeMeg = false;
            }
        },
        ...mapActions(indexStore, ["ForgetPwdWindow"])


    },
    mounted() {
        this.randomNumber();
    },


}

</script>

<template>
    <div class="container">
        <!-- 標題區域 -->
        <div class="title_aere">
            <h1>W/X/Y Online System</h1>
            <img class="logo_pic" src="../../../public/img/Logo.jpg" alt="Logo">
        </div>
        <!-- 黑線 -->
        <div class="kurosenn_futo"></div>
        <!-- 登入區域 -->
        <div class="main">
            <h2>ForgetPassword</h2>
            <hr>
            <div class="login">
                <div class="login_aera">
                    <div class="input_aera1">
                        <span>User ID</span>
                        <input v-model="userId" class="input_id" type="number" placeholder="請輸入「員工工號」">
                    </div>
                    <div class="input_aera2">
                        <span>公司信箱</span>
                        <input @input="emailCheck" v-model="email" class="input_pwd" type="email" placeholder="請輸入「公司信箱」">
                        <p style="color: red;" v-if="isShowEmailErroeMeg">email格式錯誤</p>
                    </div>
                    <div class="input_aera4">
                        <span>驗證碼</span>
                        <input v-model="inputCaptcha" class="input_captcha" type="number" placeholder="請輸入下方「數字驗證碼」">
                    </div>
                    <div class="captcha_aera">
                        <i v-on:click="randomNumber" class="fa-solid fa-repeat icon"></i>
                        <div class="captcha">{{ captcha }}</div>
                    </div>
                    <div class="button_aera">
                        <button @click="ChangePasswordCheck" type="button">找回密碼</button>
                        <button v-on:click="cancel" type="button">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ForgetWindow :inputEmail="email" />
</template>

<style lang="scss" scoped>
.container {
    margin: 0;
    margin: 0 auto;

    .title_aere {
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

        .logo_pic {
            width: 30%;
            height: 30%;
        }
    }

    .kurosenn_futo {
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

            .login_aera {
                span {
                    font-weight: bold;
                }

                input {
                    width: 20vw;

                    &::-webkit-inner-spin-button,
                    &::-webkit-outer-spin-button {
                        appearance: none;
                    }
                }

                .input_aera1 {
                    .input_id {
                        margin-left: 16px;
                        margin-bottom: 1rem;
                    }
                }

                .input_aera2 {

                    .input_pwd {
                        margin-left: 8px;
                        margin-bottom: 1rem;
                    }

                }

                .input_aera4 {
                    .input_captcha {
                        margin-left: 22px;
                        margin-bottom: 1rem;
                    }
                }

                .captcha_aera {
                    margin-bottom: 2rem;
                    display: flex;
                    justify-content: right;

                    .icon {
                        font-size: 20px;
                        margin: auto 0;
                        margin-right: 1rem;
                        transition: 0.2s;
                        cursor: pointer;

                        &:hover {
                            scale: 1.05s;
                        }

                        &:active {
                            scale: 0.95s;
                        }

                    }

                    .captcha {
                        width: 35%;
                        height: 10%;
                        font-size: 2rem;
                        background-color: white;
                        border-radius: 2px;
                        border: 2px solid black;
                        text-align: center;
                        background: linear-gradient(to left, red, orange, yellow, green, blue, indigo, purple);
                        background: -webkit-linear-gradient(to left, red, orange, yellow, green, blue, indigo, purple);
                        background-clip: text;
                        -webkit-background-clip: text;
                        color: transparent;
                    }
                }


                .button_aera {
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

