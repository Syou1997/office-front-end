<script>
// vue-router
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
//Pinia
import { mapState, mapActions } from 'pinia';
import indexStore from '../store/indexStore';

export default {
    computed: {
        //Pinia來的變數
        ...mapState(indexStore, ['userId'])

    },
    data() {
        return {
            //後端傳來的userId
            userIdForJava: null,
            //使用者名字
            userName: null,


        }
    },
    methods: {
        ...mapActions(indexStore, ["deleteUserId"]),
        //返回Header
        homeBack() {
            this.$router.push({
                name: "HeaderHome",
            });

        },
        //登出
        logout() {
            //post請求
            axios.post('http://localhost:8080/logout/', {

            })
                .then(data => {
                    this.deleteUserId();
                    alert(data.data.messgae);
                    this.$router.push({
                        name: "home",
                    });
                })
        },
        //元件渲染完成前先確認sessionid有無失效
        sessionidCheck() {

            axios.post('http://localhost:8080/get/userid', {

            },
                { withCredentials: true }
            )
                .then(data => {
                })
                .catch(error => {
                    alert("Please log in first");
                    return this.$router.push({
                        name: "home",
                    });
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
                    //Get User的資訊
                    fetch("http://localhost:8080/get_userinfo/" + this.userIdForJava)
                        .then(res => res.json())
                        .then(data => {
                            this.userName = data.userInfo.userName;

                        })
                })
        }

    },
    beforeMount() {
        this.sessionidCheck();

    },
    mounted() {
        this.getUserId();


    },

}

</script>

<template>
    <!-- 上方header -->
    <div class="header-aera">
        <div class="logo-waku">
            <div class="logo">
                <h1 v-on:click="homeBack">W/X/Y</h1>
            </div>
        </div>
        <!-- Bulletin公告專區 -->
        <div class="bulletin-aera">

            <RouterLink class="link" to="/HeaderView/Bulletin">
                <i class="fa-solid fa-house bulletin-icon icon"></i>
            </RouterLink>
            <h3>Bulletin</h3>
        </div>
        <!-- Pubic Resource公共設施區 -->
        <div class="pubic-resource-aera">
            <RouterLink class="link" to="/HeaderView/PubicResource">
                <i class="fa-solid fa-clock pubic-resource-icon icon"></i>
            </RouterLink>
            <h3>Pubic Resource</h3>
        </div>
        <!-- Human Resource個人專區 -->
        <div class="human-resource-aera">
            <RouterLink class="link" to="/HeaderView/HumanResource">
                <i class="fa-solid fa-user human-resource-icon icon"></i>
            </RouterLink>
            <h3>Human Resource</h3>
        </div>
        <!-- Welcome歡迎登入區 -->
        <div class="welcome-aera">
            <span class="userName">Hi,{{ userName }}</span>
        </div>
        <!-- 登出按鈕 -->
        <button v-on:click="logout" class="logOut-btn" type="button">Log Out</button>
    </div>
    <!-- 左邊區域選單區域 設計用不會用到了 -->
    <!-- <div class="left-aera"></div> -->
    <!-- 左邊選單的Router -->
    <RouterView />
</template>

<style lang="scss" scoped>
.header-aera {
    display: flex;
    justify-content: space-around;
    width: 100%;
    background-image: linear-gradient(to right, rgb(142, 34, 181), rgb(41, 166, 195), rgb(142, 34, 181), rgb(41, 166, 195));

    .logo {
        width: 300px;
        height: 110px;
        padding-top: 1rem;

        h1 {
            color: white;
            font-size: 48pt;
            margin-left: 1rem;

            // transition: 0.2s;
            &:hover {
                cursor: pointer;
                scale: 1.05;
            }

            &:active {
                scale: 1.05;
            }
        }
    }

    .link {
        text-decoration: none;
        font-size: 50px;
        padding-top: 1rem;
        cursor: pointer;
        transition: 0.2s;
        color: rgb(45, 24, 143);

        &:hover {
            scale: 1.05s;
        }

        &:active {
            scale: 0.95;
        }
    }

    .bulletin-aera {
        margin: 0 5rem;

        h3 {
            position: relative;
            right: 16px;
        }

    }

    .pubic-resource-aera {
        margin: 0 4rem;

        h3 {
            position: relative;
            right: 60px;
        }

    }

    .human-resource-aera {
        h3 {
            position: relative;
            right: 75px;
        }

    }

    .welcome-aera {
        margin-top: 1rem;
        width: 20vw;

        .userName {
            background-color: azure;
            border: 2px solid black;
            padding: 4px;
            font-weight: bold;
            font-size: 20px;
            border-radius: 2px;
        }
    }

    .logOut-btn {
        margin-top: 3rem;
        width: 100px;
        height: 10%;
        display: block;
        background-image: linear-gradient(to left, rgb(208, 117, 241), rgb(112, 216, 240));
        color: white;
        border-radius: 1px;
        border: 2px solid white;
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

.music_aera {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20vh;
}

// .left-aera {
//     width: 18%;
//     height: 100vh;
//     background-image: linear-gradient(to top, rgb(208, 117, 241), rgb(112, 216, 240));
// }
</style>
