<script>
import { RouterLink,RouterView } from 'vue-router';
export default {

}

</script>

<template>
    <!-- 左邊區域定位框 -->
    <div class="left-aera-waku">
        <!-- 左邊區域背景 -->
        <div class="left-aera">
            <h2><i class="fa-solid fa-layer-group"></i><i>Human Resource</i></h2>
            <!-- 左邊區域多層次選單 -->
            <!-- 帳戶管理 -->
            <ul class="nav">
                <li>
                    <a href="#"><i class="fa-solid fa-plus"></i>帳戶管理</a>
                    <!-- 這邊加上子層選單 -->
                    <ul>
                        <RouterLink to="/HeaderView/HumanResource/PersonalInformation" ><li><a href="#">個人資料</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/AddAccount" ><li><a href="#">新增帳戶</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/SearchChangeAccount" ><li><a href="#">修改帳戶</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/QueryAccount" ><li><a href="#">帳戶查詢</a></li></RouterLink>
                        
                    </ul>
                </li>
            </ul>
            <!-- 請假申請 -->
            <ul class="nav">
                <li>
                    <a href="#"><i class="fa-solid fa-plus"></i>請假申請</a>
                    <!-- 這邊加上子層選單 -->
                    <ul>
                        <RouterLink to="/HeaderView/HumanResource/LeaveForm" ><li><a href="#">請假申請單</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/LeaveQuery" ><li><a href="#">個人假單查詢</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/ApprovalLeave" ><li><a href="#">假單簽核</a></li></RouterLink>
                    </ul>
                </li>
            </ul>
            <!-- 簽到系統 -->
            <ul class="nav">
                <li>
                    <a href="#"><i class="fa-solid fa-plus"></i>簽到系統</a>
                    <!-- 這邊加上子層選單 -->
                    <ul>
                        <RouterLink to="/HeaderView/HumanResource/CheckIn" ><li><a href="#">簽到/簽退</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/CheckInQuery" ><li><a href="#">個人差勤查詢</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/OtherCheckInQuery" ><li><a href="#">員工差勤查詢</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/ReSign" ><li><a href="#">補簽</a></li></RouterLink>
                    </ul>
                </li>
            </ul>
            <!-- 薪資管理 -->
            <ul class="nav">
                <li>
                    <a href="#"><i class="fa-solid fa-plus"></i>薪資管理</a>
                    <!-- 這邊加上子層選單 -->
                    <ul>
                        <RouterLink to="/HeaderView/HumanResource/SalaryManage" ><li><a href="#">個人薪資查詢</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/OhterSalaryManage" ><li><a href="#">員工薪資查詢</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/AddSalary" ><li><a href="#">薪資建立</a></li></RouterLink>
                        <RouterLink to="/HeaderView/HumanResource/SalaryChange" ><li><a href="#">薪資調整</a></li></RouterLink>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 子路由內容 -->
        <RouterView />
    </div>
    
</template>

<style lang="scss" scoped>
//左邊區域定位框
.left-aera-waku {
    // border: 2px solid red;
    display: flex;
    .left-aera {
        width: 18%;
        height: 100vh;
        background-image: linear-gradient(to top, rgb(208, 117, 241), rgb(112, 216, 240));

        // 左邊區域多層次選單
        h2 {
            text-align: left;
            background-color: #5a8fda;
            font-size: 26px;

        }

        li {
            // display: block;
            // color: #e02828;
            padding: 20px 10px;
            position: relative;
            cursor: pointer;

            a {
                text-decoration: none;
                color: black;
            }

            &:hover,
            >li {
                background-color: #2bdcbc;
                transition: all 0.6s;
            }

            &:hover>ul {
                display: block;
            }

            ul {
                display: none;
                position: absolute;
                left: 100%;
                width: 300px;
                background-color: rgba(#ffffff, 0.7);
                top: 15px;
                box-shadow: 5px 5px 10px rgba(112, 216, 240, 0.6);
            }
        }
    }
}

// 左邊區域背景
</style>

