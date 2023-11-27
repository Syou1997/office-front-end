<script>
export default {

}

</script>

<template>
    <!-- 左邊區域定位框 -->
    <div class="left-aera-waku">
        <!-- 左邊區域背景 -->
        <div class="left-aera">
            <h2><i class="fa-solid fa-layer-group"></i><i>Bulletin</i></h2>
            <!-- 左邊區域多層次選單 -->
            <ul class="nav">
                <li>
                    <a href="#"><i class="fa-solid fa-plus"></i>公告專區</a>
                    <!-- 這邊加上子層選單 -->
                    <ul>
                        <li><a href="#">加班相關</a></li>
                        <li><a href="#">寄件相關</a></li>
                        <li><a href="#">疫情相關</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 新增內容 -->
        
    </div>
</template>

<style lang="scss" scoped>
//123
.left-aera-waku {
    display: flex;

    // 左邊區域定位框
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
</style>

