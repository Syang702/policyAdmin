import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Layout from "@/layout";
// constantRoutes
export const asyncRoutes = [
  {
    //首页
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {
      title: "首页",
      icon: "首页"
    },
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
      //   {
      //     id: 1,
      //     path: "/dashboard/personal-center",
      //     name: "Dashboard",
      //     component: () => import("@/views/dashboard/personal-center"),
      //     meta: {
      //       title: "个人中心",
      //       icon: "首页"
      //     }
      //   }
    ]
  },
  {
    //系统管理
    id: 2,
    path: "/system-manage",
    component: Layout,
    redirect: "/system-manage/admin-manage",
    name: "member-manage",
    meta: {
      title: "系统管理",
      icon: "会员中心"
    },
    children: [
      {
        id: 3,
        path: "admin-manage",
        name: "admin-manage",
        component: () => import("@/views/system-manage/admin-manage"),
        meta: {
          title: "管理员管理"
        }
      },
      {
        id: 4,
        path: "role-manage",
        name: "role-manage",
        component: () => import("@/views/system-manage/role-manage"),
        meta: {
          title: "角色管理"
        }
      },
      {
        id: 5,
        path: "swiper-manage",
        name: "swiper-manage",
        component: () => import("@/views/system-manage/swiper-manage"),
        meta: {
          title: "轮播图管理"
        }
      },
      {
        id: 6,
        path: "service-manage",
        name: "service-manage",
        component: () => import("@/views/system-manage/service-manage"),
        meta: {
          title: "客服管理"
        }
      },
      {
        id: 7,
        path: "news-manage",
        name: "news-manage",
        component: () => import("@/views/system-manage/news-manage"),
        meta: {
          title: "最新资讯"
        }
      },
      {
        id: 8,
        path: "template-manage",
        name: "template-manage",
        component: () => import("@/views/system-manage/template-manage"),
        meta: {
          title: "企业模板"
        }
      },
      {
        id: 9,
        path: "agency-manage",
        name: "agency-manage",
        component: () => import("@/views/system-manage/agency-manage"),
        meta: {
          title: "代理机构"
        }
      }
    ]
  },
  {
    //搜索设置
    id: 11,
    path: "/search-Manage",
    component: Layout,
    redirect: "/search-Manage/search-Manage",
    meta: {
      title: "搜索管理",
      icon: "搜索管理"
    },
    children: [
      {
        id: 11,
        path: "/search-Manage/search-Manage",
        name: "search-Manage",
        component: () => import("@/views/search-Manage/search-Manage"),
        meta: {
          title: "搜索管理",
          icon: "搜索管理"
        }
      }
    ]
  },
  {
    //评估设置
    id: 11,
    path: "/evaluate-manage",
    component: Layout,
    redirect: "/evaluate-manage/evaluate-manage",
    meta: {
      title: "评估管理",
      icon: "评估管理"
    },
    children: [
      {
        id: 11,
        path: "/evaluate-manage/evaluate-manage",
        name: "evaluate-manage",
        component: () => import("@/views/evaluate-manage/evaluate-manage"),
        meta: {
          title: "评估管理",
          icon: "评估管理"
        }
      }
    ]
  },
  {
    //公司列表
    // id: 10,
    path: "/company-list",
    component: Layout,
    redirect: "/company-list/company-list",
    meta: {
      title: "公司列表",
      icon: "公司列表"
    },
    children: [
      {
        id: 10,
        path: "/company-list/company-list",
        name: "company-list",
        component: () => import("@/views/company-list/company-list"),
        meta: {
          title: "公司列表",
          icon: "公司列表"
        }
      },
      {
        id: 10,
        path: "/company-list/company-detail",
        name: "company-detail",
        component: () => import("@/views/company-list/company-detail"),
        hidden: true,
        meta: {
          title: "公司详情",
          icon: "公司详情",
          activeMenu: "/company-list/company-list"
        }
      }
    ]
  },
  {
    //行业管理
    id: 11,
    path: "/industry-manage",
    component: Layout,
    redirect: "/industry-manage/industry-manage",
    meta: {
      title: "行业管理",
      icon: "行业管理"
    },
    children: [
      {
        id: 11,
        path: "/industry-manage/industry-manage",
        name: "industry-manage",
        component: () => import("@/views/industry-manage/industry-manage"),
        meta: {
          title: "行业管理",
          icon: "行业管理"
        }
      }
    ]
  },
  {
    //主管部门管理
    id: 12,
    path: "/depart-manage",
    component: Layout,
    redirect: "/depart-manage/depart-manage",
    meta: {
      title: "部门管理",
      icon: "部门管理"
    },
    children: [
      {
        id: 12,
        path: "/depart-manage/depart-manage",
        name: "depart-manage",
        component: () => import("@/views/depart-manage/depart-manage"),
        meta: {
          title: "部门管理",
          icon: "部门管理"
        }
      }
    ]
  },
  {
    //政策管理
    id: 13,
    path: "/policy-manage",
    component: Layout,
    redirect: "/policy-manage/policy-manage",
    meta: {
      title: "政策管理",
      icon: "政策管理"
    },
    children: [
      {
        id: 13,
        path: "/policy-manage/policy-manage",
        name: "policy-manage",
        component: () => import("@/views/policy-manage/policy-manage"),
        meta: {
          title: "政策管理",
          icon: "政策管理"
        }
      },
      {
        id: 13,
        path: "/policy-manage/add-policy",
        name: "add-policy",
        component: () => import("@/views/policy-manage/add-policy"),
        hidden: true,
        meta: {
          title: "添加政策",
          icon: "添加政策",
          activeMenu: "/policy-manage/policy-manage"
        }
      }
    ]
  },
  {
    //提交资料管理
    id: 14,
    path: "/data-manage",
    component: Layout,
    redirect: "/data-manage/data-manage",
    meta: {
      title: "资料管理",
      icon: "资料管理"
    },
    children: [
      {
        id: 14,
        path: "/data-manage/data-manage",
        name: "data-manage",
        component: () => import("@/views/data-manage/data-manage"),
        meta: {
          title: "资料管理",
          icon: "资料管理"
        }
      },
      {
        id: 14,
        path: "/data-manage/add-data",
        name: "add-data",
        component: () => import("@/views/data-manage/add-data"),
        hidden: true,
        meta: {
          title: "添加资料",
          icon: "添加资料",
          activeMenu: "/data-manage/data-manage"
        }
      }
    ]
  },
  {
    //报表管理
    id: 15,
    path: "/report-manage",
    component: Layout,
    redirect: "/report-manage/report-manage",
    meta: {
      title: "报表管理",
      icon: "报表管理"
    },
    children: [
      {
        id: 15,
        path: "/report-manage/report-manage",
        name: "report-manage",
        component: () => import("@/views/report-manage/report-manage"),
        meta: {
          title: "报表管理",
          icon: "报表管理"
        }
      },
      {
        id: 15,
        path: "/report-manage/add-report",
        name: "add-report",
        component: () => import("@/views/report-manage/add-report"),
        hidden: true,
        meta: {
          title: "添加报表",
          icon: "添加报表",
          activeMenu: "/report-manage/report-manage"
        }
      }
    ]
  },
  {
    //评分管理
    id: 16,
    path: "/score-manage",
    component: Layout,
    redirect: "/score-manage/score-manage",
    meta: {
      title: "评分管理",
      icon: "评分管理"
    },
    children: [
      {
        id: 16,
        path: "/score-manage/score-manage",
        name: "score-manage",
        component: () => import("@/views/score-manage/score-manage"),
        meta: {
          title: "评分管理",
          icon: "评分管理"
        }
      },
      {
        id: 16,
        path: "/score-manage/add-score",
        name: "add-score",
        component: () => import("@/views/score-manage/add-score"),
        hidden: true,
        meta: {
          title: "管理评分标准",
          icon: "管理评分标准",
          activeMenu: "/score-manage/score-manage"
        }
      }
    ]
  },
  {
    //查询记录
    id: 17,
    path: "/inquiry-record",
    component: Layout,
    redirect: "/inquiry-record/view-report",
    meta: {
      title: "查询记录",
      icon: "查询记录"
    },
    children: [
      {
        id: 17,
        path: "/inquiry-record/view-report",
        name: "view-report",
        component: () => import("@/views/inquiry-record/view-report"),
        meta: {
          title: "查询记录",
          icon: "查询记录"
        }
      },
      {
        id: 17,
        path: "/inquiry-record/view-score",
        name: "view-score",
        component: () => import("@/views/inquiry-record/view-score"),
        hidden: true,
        meta: {
          title: "查看评分",
          icon: "查看评分",
          activeMenu: "/inquiry-record/view-report"
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
  //   {
  //     path: "/404",
  //     component: () => import("@/views/404"),
  //     hidden: true
  //   },
  //   404 page must be placed at the end !!!
  //   {
  //     path: "*",
  //     redirect: "/404",
  //     hidden: true
  //   }
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
