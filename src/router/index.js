import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HeaderView from '../components/HeaderView.vue'
//密碼相關
import ForgetPassword from '../views/Password/ForgetPassword.vue'
import ChangePassword from '../views/Password/ChangePassword.vue'
import ForgetChangePassword from '../views/Password/ForgetChangePassword.vue'
//Header區域裡的原件
import Bulletin from '../views/Bulletin.vue'
import PubicResource from '../views/PubicResource.vue'
import HumanResource from '../views/HumanResource.vue'
import HeaderHome from '../views/HeaderHome.vue'
//PubicResource多層選單的細項元件
//餐點決定器
import FroLunch from '../views/Child/PubicResource/FroLunch.vue'


//HumanResource多層選單的細項元件
//帳戶管理
import PersonalInformation from '../views/Child/HumanResource/PersonalInformation.vue'
import AddAccount from '../views/Child/HumanResource/AddAccount.vue'
import AddAccount2 from '../views/Child/HumanResource/AddAccount2.vue'
import SearchChangeAccount from '../views/Child/HumanResource/SearchChangeAccount.vue'
import ChangeAccount from '../views/Child/HumanResource/ChangeAccount.vue'
import ChangeAccount2 from '../views/Child/HumanResource/ChangeAccount2.vue'
import QueryAccount from '../views/Child/HumanResource/QueryAccount.vue'
import SearchUserInfoResult from '../views/Child/HumanResource/SearchUserInfoResult.vue'
import LikeSearch from '../views/Child/HumanResource/LikeSearch.vue'
import LikeSearchResult from '../views/Child/HumanResource/LikeSearchResult.vue'
//請假申請
import LeaveForm from '../views/Child/HumanResource/LeaveForm.vue'
import ApprovalLeave from '../views/Child/HumanResource/ApprovalLeave.vue'
import LeaveChange from '../views/Child/HumanResource/LeaveChange.vue'
import LeaveQuery from '../views/Child/HumanResource/LeaveQuery.vue'
//簽到/簽退
import CheckIn from '../views/Child/HumanResource/CheckIn.vue'
import CheckInQuery from '../views/Child/HumanResource/CheckInQuery.vue'
import OtherCheckInQuery from '../views/Child/HumanResource/OtherCheckInQuery.vue'
import ReSign from '../views/Child/HumanResource/ReSign.vue'
//薪資管理
import SalaryManage from '../views/Child/HumanResource/SalaryManage.vue'
import OhterSalaryManage from '../views/Child/HumanResource/OhterSalaryManage.vue'
import AddSalary from '../views/Child/HumanResource/AddSalary.vue'
import SalaryChange from '../views/Child/HumanResource/SalaryChange.vue'
//沒有此頁面的權限
import NoPermissions from '../views/Child/HumanResource/NoPermissions.vue'

//路油表
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ForgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/ForgetChangePassword',
      name: 'ForgetChangePassword',
      component: ForgetChangePassword
    },
    {
      path: '/HeaderView',
      name: 'HeaderView',
      component: HeaderView,
      //子路由
      children: [
        {
          path: 'HeaderHome',
          name: 'HeaderHome',
          component: HeaderHome,
        },
        {
          path: 'Bulletin',
          name: 'Bulletin',
          component: Bulletin,
        },
        {
          path: 'PubicResource',
          name: 'PubicResource',
          component: PubicResource,
          //子路由
          children: [
            {
              path: 'FroLunch',
              name: 'FroLunch',
              component: FroLunch,
            },]
        },
        {
          path: 'HumanResource',
          name: 'HumanResource',
          component: HumanResource,
          //子路由
          children: [
            {
              path: 'PersonalInformation',
              name: 'PersonalInformation',
              component: PersonalInformation,
            },
            {
              path: 'AddAccount',
              name: 'AddAccount',
              component: AddAccount,
            },
            {
              path: 'AddAccount2',
              name: 'AddAccount2',
              component: AddAccount2,
            },
            {
              path: 'SearchChangeAccount',
              name: 'SearchChangeAccount',
              component: SearchChangeAccount,
            },
            {
              path: 'ChangeAccount/:userIdForSearch',
              name: 'ChangeAccount',
              component: ChangeAccount,
              props: true
            },
            {
              path: 'ChangeAccount2/:userIdForSearch2',
              name: 'ChangeAccount2',
              component: ChangeAccount2,
              props: true
            },
            {
              path: 'QueryAccount',
              name: 'QueryAccount',
              component: QueryAccount,
            },
            {
              path: 'SearchUserInfoResult/:userIdForSearch',
              name: 'SearchUserInfoResult',
              component: SearchUserInfoResult,
              props: true
            },
            {
              path: 'LikeSearch',
              name: 'LikeSearch',
              component: LikeSearch,
            },
            {
              path: 'LikeSearchResult/:userNameForSearch',
              name: 'LikeSearchResult',
              component: LikeSearchResult,
              props: true
            },
            {
              path: 'LeaveForm',
              name: 'LeaveForm',
              component: LeaveForm,
            },
            {
              path: 'ApprovalLeave',
              name: 'ApprovalLeave',
              component: ApprovalLeave,
            },
            {
              path: 'LeaveChange/:leaveId',
              name: 'LeaveChange',
              component: LeaveChange,
              props: true
            },
            {
              path: 'LeaveQuery',
              name: 'LeaveQuery',
              component: LeaveQuery,
            },
            {
              path: 'CheckIn',
              name: 'CheckIn',
              component: CheckIn,
            },
            {
              path: 'CheckInQuery',
              name: 'CheckInQuery',
              component: CheckInQuery,
            },
            {
              path: 'OtherCheckInQuery',
              name: 'OtherCheckInQuery',
              component: OtherCheckInQuery,
            },
            {
              path: 'ReSign',
              name: 'ReSign',
              component: ReSign,
            },
            {
              path: 'SalaryManage',
              name: 'SalaryManage',
              component: SalaryManage,
            },
            {
              path: 'OhterSalaryManage',
              name: 'OhterSalaryManage',
              component: OhterSalaryManage,
            },
            {
              path: 'AddSalary',
              name: 'AddSalary',
              component: AddSalary,
            },
            {
              path: 'SalaryChange',
              name: 'SalaryChange',
              component: SalaryChange,
            },
            {
              path: 'NoPermissions',
              name: 'NoPermissions',
              component: NoPermissions,
            },
          ]
        },
      ]
    },


  ]
})


export default router
