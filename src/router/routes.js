import {
  routesComponents
} from './routesComponents'

export const routes = [

  {
    path: '/index',
    name: 'index',
    redirect: '/environment',
    meta: {
      requiresAuth: true
    }, // 添加表示需要验证
    component: routesComponents.indexComponent,
    children: [{
        path: '/environment',
        name: 'environment',
        component: routesComponents.environmentComponent
      },
      {
        path: '/monitor',
        name: 'monitor',
        component: routesComponents.monitorComponent
      },
      {
        path: '/commodity',
        name: 'commodity',
        component: routesComponents.commodityComponent
      },
      {
        path: '/history',
        name: 'history',
        component: routesComponents.historyComponent
      }
    ]
  },

  ,
  {
    path: '/personal',
    name: 'personal',
    redirect: '/person_info',
    meta: {
      requiresAuth: true
    }, // 添加表示需要验证
    component: routesComponents.personalComponent,
    children: [{
        path: '/person_info',
        name: 'person_info',
        component: routesComponents.personInfoComponent
      },
      {
        path: '/person_device',
        name: 'person_device',
        component: routesComponents.personDeviceComponent
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: routesComponents.loginComponent
  },

  {
    path: '/register',
    name: 'register',
    component: routesComponents.registerComponent
  },

  // 重定向
  {
    path: '*',
    redirect: '/index'
  }

]
