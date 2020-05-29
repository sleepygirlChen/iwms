export const routesComponents = {

  indexComponent() {
    return import('../views/Index.vue');
  },
  
  environmentComponent() {
    return import('../views/indexComponent/Environment.vue');
  },
  
  monitorComponent() {
    return import('../views/indexComponent/Monitor.vue');
  },
  
  commodityComponent() {
    return import('../views/indexComponent/Commodity.vue');
  },

  historyComponent() {
    return import('../views/indexComponent/History.vue');
  },

  loginComponent() {
    return import('../views/Login.vue');
  },

  registerComponent() {
    return import('../views/Register.vue');
  },

  personalComponent() {
    return import('../views/Personal.vue');
  },

  personInfoComponent() {
    return import('../views/personalComponent/Person_Info.vue')
  },

  personDeviceComponent() {
    return import('../views/personalComponent/Person_Device.vue')
  }

}