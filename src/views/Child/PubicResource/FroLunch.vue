<script>
import { RouterLink, RouterView } from 'vue-router';
export default {
    data() {
        return {
            menuList: ["拉麵", "蓋飯", "八方雲集", "炒飯", "麥當勞", "肯德基", "鬆餅", "牛肉麵", "雞腿便當", "火鍋", "壽司", "飯糰", "麥片","咖哩飯","義大利麵","鴨肉飯","意麵","7-11","全家","燒肉","雞蛋糕"],
            name: null,
        }
    },
    methods: {
        lunch() {
            let Num = (Math.floor(Math.random() * 100));

            while (Num >= this.menuList.length) {
                Num = (Math.floor(Math.random() * 100));
            }
            this.name = this.menuList[Num];
        }
    },

}

</script>

<template>
    <div class="container">
        <div class="btn_aera">
            <button type="button" class="custom-btn btn-12" @click="lunch"><span>Ready
                    Go!</span><span>今天吃什麼呢?</span></button>
        </div>

        <h2>{{ name }}</h2>




    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 80vw;
    padding: 0;
    // border: 2px solid red;

    .btn_aera {
        display: flex;
        justify-content: center;
        margin-top: 3em;
        button{
            color: white;
        }

    }

    h2 {
        display: flex;
        justify-content: center;
        margin-top: 1em;
        margin-right: 0.4em;
        font-size: 100px;
        font-weight: bold;
    }

    .btn-12 {
        position: relative;
        right: 20px;
        bottom: 20px;
        border: none;
        box-shadow: none;
        width: 130px;
        height: 40px;
        line-height: 42px;
        -webkit-perspective: 230px;
        perspective: 230px;
    }

    .btn-12 span {
        background: rgb(0, 172, 238);
        background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgba(2, 126, 251, 1) 100%);
        display: block;
        position: absolute;
        width: 130px;
        height: 40px;
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
            7px 7px 20px 0px rgba(0, 0, 0, .1),
            4px 4px 5px 0px rgba(0, 0, 0, .1);
        border-radius: 5px;
        margin: 0;
        text-align: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transition: all .3s;
        transition: all .3s;
    }

    .btn-12 span:nth-child(1) {
        box-shadow:
            -7px -7px 20px 0px rgba(255, 255, 255, 0.6),
            -4px -4px 5px 0px #fff9,
            7px 7px 20px 0px #0002,
            4px 4px 5px 0px #0001;
        -webkit-transform: rotateX(90deg);
        -moz-transform: rotateX(90deg);
        transform: rotateX(90deg);
        -webkit-transform-origin: 50% 50% -20px;
        -moz-transform-origin: 50% 50% -20px;
        transform-origin: 50% 50% -20px;
    }

    .btn-12 span:nth-child(2) {
        -webkit-transform: rotateX(0deg);
        -moz-transform: rotateX(0deg);
        transform: rotateX(0deg);
        -webkit-transform-origin: 50% 50% -20px;
        -moz-transform-origin: 50% 50% -20px;
        transform-origin: 50% 50% -20px;
    }

    .btn-12:hover span:nth-child(1) {
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
            7px 7px 20px 0px rgba(0, 0, 0, .1),
            4px 4px 5px 0px rgba(0, 0, 0, .1);
        -webkit-transform: rotateX(0deg);
        -moz-transform: rotateX(0deg);
        transform: rotateX(0deg);
    }

    .btn-12:hover span:nth-child(2) {
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
            7px 7px 20px 0px rgba(0, 0, 0, .1),
            4px 4px 5px 0px rgba(0, 0, 0, .1);
        color: transparent;
        -webkit-transform: rotateX(-90deg);
        -moz-transform: rotateX(-90deg);
        transform: rotateX(-90deg);
    }



}
</style>

