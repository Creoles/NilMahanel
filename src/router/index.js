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
import HotelMangaer from "../views/admin/manager/resource/hotel/Hotel.vue"
import EditHotel from "../views/admin/manager/resource/hotel/EditHotel.vue"
import HotelList from "../views/admin/manager/resource/hotel/HotelList.vue"
import VehicleMangaer from "../views/admin/manager/resource/vehicle/Vehicle.vue"
import VehicleList from "../views/admin/manager/resource/vehicle/VehicleList.vue"
import EditVehicle from "../views/admin/manager/resource/vehicle/EditVehicle.vue"
import Account from  "../views/admin/manager/Account.vue"
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
    },
    {
      path:"/admin/manager/hotel",
      component:HotelMangaer,
      children:[
        {
          name:"HOTEL LIST",
          path:"",
          component:HotelList
        },
        {
          name:"ADD HOTEL",
          path:"add",
          component:EditHotel
        },
        {
          name:"EDIT HOTEL",
          path:"edit/:id",
          component:EditHotel
        }
      ]
    },
    {
      path:"/admin/manager/vehicle",
      component:VehicleMangaer,
      children:[
        {
          name:"VEHICLE LIST",
          path:"",
          component:VehicleList
        },
        {
          name:"ADD VEHICLE",
          path:"add",
          component:EditVehicle
        },
        {
          name:"EDIT VEHICLE",
          path:"edit/:id",
          component:EditVehicle
        }
      ]
    },
    {
      name:"ACCOUNT MANAGE",
      path:"/admin/manager/account",
      component:Account
    }
    // ...generateRoutes(),
  ]
});



