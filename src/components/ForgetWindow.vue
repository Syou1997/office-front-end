<script>
//Pinia 方法
import {mapState,mapActions} from 'pinia'
//自己的資料庫(預設匯入)
import indexStore from '../store/indexStore'

export default {
    props:["inputEmail"],
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState(indexStore,["isShowForgetPwdWindow"])

    },
    methods:{
        ...mapActions(indexStore,["ForgetPwdWindow"])

    }


}

</script>

<template>
    <!-- 外框 -->
    <div v-if="isShowForgetPwdWindow" class="waku">
        <!-- 背景 -->
        <div class="bcg">
            <!-- 彈跳視窗 -->
            <div class="window">
                <h2>您的變更密碼傳連結已傳送至以下信箱:</h2>
                <h3>{{inputEmail}}</h3>
                <p>※如果沒收到請檢查垃圾郵件</p>
                <button v-on:click="ForgetPwdWindow" type="button">關閉視窗</button>
            </div>
        </div>


    </div>
</template>

<style lang="scss" scoped>
.waku {
    width: 100vw;
    height: 100vw;
    // border: 2px solid red;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.95;
 

    .bcg {
        width: 100vw;
        height: 100vw;
        background-color: azure;
        display: flex;
        justify-content: center;

        .window {
            width: 40vw;
            height: 25vw;
            background-image: linear-gradient(to top, rgb(210, 140, 235), rgb(143, 216, 232));
            border: 2px solid black;
            border-radius: 10px;
            margin-top: 12%;
            h2{
                text-align: center;
                margin: 2rem 0;
            }
            h3{
                text-align: center;
                font-weight: bold;
            }
            p{
                text-align: center;
                margin: 2rem 0;
                
            }
            button{
                display: block;
                margin: 0 auto;
                // border: none;
                background-image: linear-gradient(to left, rgb(208, 117, 241), rgb(112, 216, 240));
                color: white;
                margin-top: 80px;
            }
            
        }

    }

}
</style>

