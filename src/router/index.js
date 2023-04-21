import { createRouter, createWebHashHistory } from "vue-router";

import layout from "@/layout/index";

//做动态路由，权限相关导入
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'
import UserManage from "./modules/UserManage";
import PermissionList from "./modules/PermissionList";
import Article from "./modules/Article";


// 这个私有路由表在 store/modules/permission.js里使用
export const privateRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

// 菜单结构

// -user
//   -- UserManage
//   -- PermissionList
// -article
//   -- articleRanking
//   -- articleCreate



/**
 * 私有路由表 有权限得路由
 */
// export const privateRoutes = [
//   {
//     path: "/user",
//     component: layout,
//     redirect: "/user/manage",
//     meta: {
//       title: "user",
//       icon: "personnel",
//     },
//     children: [
//       {
//         path: "/user/manage",
//         component: () => import("@/views/user-manage/index"),
//         meta: {
//           title: "userManage",
//           icon: "personnel-manage",
//         },
//       },
//       {
//         path: "/user/role",
//         component: () => import("@/views/role-list/index"),
//         meta: {
//           title: "roleList",
//           icon: "role",
//         },
//       },
//       {
//         path: "/user/permission",
//         component: () => import("@/views/permission-list/index"),
//         meta: {
//           title: "permissionList",
//           icon: "permission",
//         },
//       },
//       {
//         path: "/user/info/:id",
//         name: "userInfo",
//         component: () => import("@/views/user-info/index"),
//         meta: {
//           title: "userInfo",
//         },
//       },
//       {
//         path: "/user/import",
//         name: "import",
//         component: () => import("@/views/import/index"),
//         meta: {
//           title: "excelImport",
//         },
//       },
//     ],
//   },
//   {
//     path: "/article",
//     component: layout,
//     redirect: "/article/ranking",
//     meta: {
//       title: "article",
//       icon: "article",
//     },
//     children: [
//       {
//         path: "/article/ranking",
//         component: () => import("@/views/article-ranking/index"),
//         meta: {
//           title: "articleRanking",
//           icon: "article-ranking",
//         },
//       },
//       {
//         path: "/article/:id",
//         component: () => import("@/views/article-detail/index"),
//         meta: {
//           title: "articleDetail",
//         },
//       },
//       {
//         path: "/article/create",
//         component: () => import("@/views/article-create/index"),
//         meta: {
//           title: "articleCreate",
//           icon: "article-create",
//         },
//       },
//       {
//         path: "/article/editor/:id",
//         component: () => import("@/views/article-create/index"),
//         meta: {
//           title: "articleEditor",
//         },
//       },
//     ],
//   },
// ];

/**
 * 公开路由表 无权限得路由
 */
export var publicRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/",
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: "/profile",
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile/index"),
        meta: {
          title: "profile",
          icon: "el-icon-user",
        },
      },
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404"),
      },
      {
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  //routes: [...publicRoutes, ...privateRoutes], //为了做权限 私有路由表根据权限用addRoutes动态添加
   routes:publicRoutes,
   scrollBehavior(to, from, savedPosition) {
    console.log('savedPosition',savedPosition)
    if (savedPosition) {
      console.log('有')
      return savedPosition
    } else {
      console.log('无')
      return { top: 0 }
    }
  }
});


/**
 * 初始化路由表,解决退出后需要重置路由表，否则下次登录还是之前的路由表
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}


export default router;
