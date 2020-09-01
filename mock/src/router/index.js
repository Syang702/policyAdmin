import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// constantRoutes
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        id: 1,
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
          title: "首页",
          icon: "首页"
        }
      }
    ]
  },
  {
    id: 2,
    path: "/member-manage",
    component: Layout,
    redirect: "/member-manage/member-list",
    name: "member-manage",
    meta: {
      title: "会员中心",
      icon: "会员中心"
    },
    children: [
      {
        id: 3,
        path: "/member-list",
        name: "member-list",
        component: () => import("@/views/member-manage/member-list"),
        meta: {
          title: "会员列表"
        }
      },
      {
        id: 4,
        path: "member-level",
        name: "MemberLevel",
        component: () => import("@/views/member-manage/member-level"),
        meta: {
          title: "会员级别"
        }
      },
      {
        id: 5,
        path: "team-map",
        name: "Team-map",
        component: () => import("@/views/member-manage/team-map"),
        meta: {
          title: "团队图谱"
        }
      },
      {
        id: 6,
        path: "/recharge-audio",
        name: "recharge-audio",
        component: () => import("@/views/member-manage/recharge-audio"),
        meta: {
          title: "充值审核"
        }
      },
      {
        id: 7,
        path: "/member-register",
        name: "member-register",
        component: () => import("@/views/member-manage/member-register"),
        meta: {
          title: "会员注册"
        }
      },
      {
        id: 8,
        path: "/protocol",
        name: "protocol",
        component: () => import("@/views/member-manage/protocol"),
        meta: {
          title: "注册协议"
        }
      }
    ]
  },
  {
    id: 9,
    path: "/system-manage",
    component: Layout,
    redirect: "/admin-manage",
    name: "system-manage",
    meta: {
      title: "系统管理",
      icon: "international"
    },
    children: [
      {
        id: 10,
        path: "/role-manage",
        name: "role-manage",
        component: () => import("@/views/system-management/role-manage"),
        meta: {
          title: "角色管理"
        }
      },
      {
        id: 11,
        path: "/admin-manage",
        name: "admin-manage",
        component: () => import("@/views/system-management/admin-manage"),
        meta: {
          title: "管理员管理"
        }
      },
      {
        id: 12,
        path: "/swiper-manage",
        name: "swiper-manage",
        component: () => import("@/views/system-management/swiper-manage"),
        meta: {
          title: "轮播图管理"
        }
      }
    ]
  },
  {
    id: 13,
    path: "/system",
    component: Layout,
    redirect: "/coin-manage",
    name: "system",
    meta: {
      title: "系统参数配置",
      icon: "icon"
    },
    children: [
      {
        id: 14,
        path: "/coin-manage",
        name: "coin-manage",
        component: () => import("@/views/system-query/coin-manage"),
        meta: {
          title: "币种管理"
        }
      },
      {
        id: 15,
        path: "/receipt",
        name: "receipt",
        component: () => import("@/views/system-query/receipt"),
        meta: {
          title: "收款管理"
        }
      },
      {
        id: 16,
        path: "/fiance-query",
        name: "fiance-query",
        component: () => import("@/views/system-query/fiance-query"),
        meta: {
          title: "财务参数设置"
        }
      },
      {
        id: 17,
        path: "/awards-settings",
        name: "awards-settings",
        component: () => import("@/views/system-query/awards-settings"),
        meta: {
          title: "奖金设置"
        }
      },
      {
        id: 18,
        hidden: true,
        path: "/intro-awards",
        name: "intro-awards",
        component: () => import("@/views/system-query/awards/intro-awards"),
        meta: {
          title: "推荐奖"
        }
      },
      {
        id: 19,
        hidden: true,
        path: "/team-awards",
        name: "team-awards",
        component: () => import("@/views/system-query/awards/team-awards"),
        meta: {
          title: "团队奖"
        }
      }
      // {
      //   path: '/usdt-manage',
      //   name: 'usdt-manage',
      //   component: () => import('@/views/system-query/usdt-manage'),
      //   meta: {
      //     title: 'USDT管理',
      //   }
      // },
    ]
  },
  {
    id: 20,
    path: "/pet",
    component: Layout,
    name: "pet",
    redirect: "/pet-breed",
    meta: {
      title: "宠物管理",
      icon: "商城"
    },
    children: [
      {
        id: 21,
        path: "/pet-breed",
        name: "pet-breed",
        component: () => import("@/views/pet-manage/pet-breed"),
        meta: {
          title: "宠物品种"
        }
      },
      {
        id: 22,
        path: "/pet-prev",
        name: "pet-prev",
        component: () => import("@/views/pet-manage/pet-prev"),
        meta: {
          title: "预约列表"
        }
      },
      {
        id: 23,
        path: "/pet-transfer",
        name: "pet-transfer",
        component: () => import("@/views/pet-manage/pet-transfer"),
        meta: {
          title: "转让列表"
        }
      },
      {
        id: 24,
        path: "/pet-makeover",
        name: "pet-makeover",
        component: () => import("@/views/pet-manage/pet-makeover"),
        meta: {
          title: "交易列表"
        }
      },
      {
        id: 25,
        path: "/pet-present",
        name: "pet-present",
        component: () => import("@/views/pet-manage/pet-present"),
        meta: {
          title: "赠送列表"
        }
      }
    ]
  },
  {
    id: 26,
    path: "/finance-manage",
    component: Layout,
    redirect: "/withdraw-audio",
    name: "finance-manage",
    meta: {
      title: "财务管理",
      icon: "skill"
    },
    children: [
      {
        id: 27,
        path: "recharge-recond",
        name: "recharge-recond",
        component: () => import("@/views/finance-manage/recharge-recond.vue"),
        meta: {
          title: "充值记录"
        }
      },
      {
        id: 28,
        path: "fee-deduction-recond",
        name: "fee-deduction-recond",
        component: () =>
          import("@/views/finance-manage/fee-deduction-recond.vue"),
        meta: {
          title: "扣费记录"
        }
      },
      {
        id: 29,
        path: "transfer-recond",
        name: "transfer-recond",
        component: () => import("@/views/finance-manage/transfer-recond.vue"),
        meta: {
          title: "转账记录"
        }
      },
      {
        id: 30,
        path: "financial-statistics",
        name: "financial-statistics",
        component: () =>
          import("@/views/finance-manage/financial-statistics.vue"),
        meta: {
          title: "财务统计"
        }
      },
      {
        id: 31,
        path: "awards-recond",
        name: "awards-recond",
        component: () => import("@/views/finance-manage/awards-recond.vue"),
        meta: {
          title: "奖金明细"
        }
      },
      {
        id: 32,
        path: "bill-running-water",
        name: "BillRunningWater",
        component: () =>
          import("@/views/finance-manage/bill-running-water.vue"),
        meta: {
          title: "账单流水"
        }
      }
    ]
  },
  {
    id: 33,
    path: "/instation-letter",
    component: Layout,
    redirect: "/system-notice",
    name: "instation-letter",
    meta: {
      title: "邮件公告",
      icon: "email"
    },
    children: [
      {
        id: 34,
        path: "/system-notice",
        name: "system-notice",
        component: () => import("@/views/instation-letter/system-notice"),
        meta: {
          title: "系统公告"
        }
      },
      {
        id: 35,
        path: "/send-letter",
        name: "send-letter",
        component: () => import("@/views/instation-letter/send-letter"),
        meta: {
          title: "发件箱"
        }
      },
      {
        id: 36,
        path: "/receipt-letter",
        name: "receipt-letter",
        component: () => import("@/views/instation-letter/receipt-letter"),
        meta: {
          title: "收件箱"
        }
      }
    ]
  },
  {
    id: 37,
    path: "/reset",
    component: Layout,
    redirect: "/initialize",
    name: "reset",
    meta: {
      title: "初始化设置",
      icon: "系统管理"
    },
    children: [
      {
        id: 38,
        path: "/initialize",
        name: "initialize",
        component: () => import("@/views/reset/initialize"),
        meta: {
          title: "初始化"
        }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  }
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },
  // 404 page must be placed at the end !!!
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();

  router.matcher = newRouter.matcher; // reset router
}

export default router;
