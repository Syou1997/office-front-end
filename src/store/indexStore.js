// vue-router
import { RouterLink, RouterView } from 'vue-router';
//狀態資料庫
import { defineStore } from "pinia";
export default defineStore("indexStore",{
    state:() => ({
        isShowForgetPwdWindow : false,
        isShowChangePwdWindow : false,
        //員工工號(userId)
        userId: null,
        
    }),
    getters:{

    },
    actions: {
        ForgetPwdWindow(){
            this.isShowForgetPwdWindow = !this.isShowForgetPwdWindow;
        },
        ChangePwdWindow(){
            this.isShowChangePwdWindow = !this.isShowChangePwdWindow;
        },
        //儲存登入時的員工工號(userId)
        updateUserId(inputId){
            this.userId = inputId;

        },
        //登出時清空入員工工號
        deleteUserId(){
            this.userId = null;

        }

        
    },





})