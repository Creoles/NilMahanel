/**
 * Created by rancongjie@126.com 17/1/18.
 */
import Vue from 'vue'
import VueRoute from "vue-router"
import Sign from '../views/account/sign.vue'
import Home from '../views/admin/Home.vue'
import HotelOrder from '../views/admin/seller/hotel/order.vue'
import Customer from "../views/admin/manager/Customer.vue"
import RoomMonitor from "../views/admin/manager/RoomMonitor.vue"
import GroupMonitor from "../views/admin/manager/GroupMonitor.vue"
Vue.use(VueRoute);

function generateRoutes() {

}
export default new VueRoute({
  // mode:"history",//todo
  routes: [
    {
      name: 'sign',
      path: '/sign',
      component: Sign
    },
    {
      name:'home',
      path:'/admin',
      component:Home
    },
    {
      name:'ORDER SYSTEM',
      path:'/admin/hotel/order',
      component:HotelOrder
    },
    {
      name:'CUSTOMER MANAGE',
      path:'/admin/manager/customer',
      component:Customer
    },
    {
      name:"ROOM MONITOR",
      path:'/admin/manager/room-monitor',
      component:RoomMonitor
    },
    {
      name:"Group Monitor",
      path:"/admin/manager/group-service-monitoring",
      component:GroupMonitor
    }
    // ...generateRoutes(),
  ]
});



