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
import HotelManager from "../views/admin/manager/resource/hotel/Hotel.vue"
import EditHotel from "../views/admin/manager/resource/hotel/EditHotel.vue"
import HotelList from "../views/admin/manager/resource/hotel/HotelList.vue"
import VehicleManager from "../views/admin/manager/resource/vehicle/Vehicle.vue"
import VehicleList from "../views/admin/manager/resource/vehicle/VehicleList.vue"
import EditVehicle from "../views/admin/manager/resource/vehicle/EditVehicle.vue"
import RestaurantManager from "../views/admin/manager/resource/restaurant/Restaurant.vue"
import RestaurantList from "../views/admin/manager/resource/restaurant/RestaurantList.vue"
import EditRestaurant from "../views/admin/manager/resource/restaurant/EditRestaurant.vue"
import ShopManager from "../views/admin/manager/resource/shop/Shop.vue"
import ShopList from "../views/admin/manager/resource/shop/ShopList.vue"
import EditShop from "../views/admin/manager/resource/shop/EditShop.vue"
import ScenicManager from "../views/admin/manager/resource/scenic/Scenic.vue"
import ScenicList from "../views/admin/manager/resource/scenic/ScenicList.vue"
import EditScenic from "../views/admin/manager/resource/scenic/EditScenic.vue"
import Account from "../views/admin/manager/Account.vue"
import Country from "../views/admin/manager/Country.vue"
Vue.use(VueRoute);

function generateRoutes() {

}
export default new VueRoute({
    mode: "history", //todo
    routes: [{
            name: 'sign',
            path: '/sign',
            component: Sign
        },
        {
            name: 'home',
            path: '/admin',
            component: Home
        },
        {
            name: 'ORDER SYSTEM',
            path: '/admin/hotel/order',
            component: HotelOrder
        },
        {
            name: 'CUSTOMER MANAGE',
            path: '/admin/manager/customer',
            component: Customer
        },
        {
            name: "ROOM MONITOR",
            path: '/admin/manager/room-monitor',
            component: RoomMonitor
        },
        {
            name: "Group Monitor",
            path: "/admin/manager/group-service-monitoring",
            component: GroupMonitor
        },
        {
            path: "/admin/manager/hotel",
            component: HotelManager,
            children: [{
                    name: "HOTEL LIST",
                    path: "",
                    component: HotelList
                },
                {
                    name: "ADD HOTEL",
                    path: "add",
                    component: EditHotel
                },
                {
                    name: "EDIT HOTEL",
                    path: "edit/:id",
                    component: EditHotel
                }
            ]
        },
        {
            path: "/admin/manager/vehicle",
            component: VehicleManager,
            children: [{
                    name: "VEHICLE LIST",
                    path: "",
                    component: VehicleList
                },
                {
                    name: "ADD VEHICLE",
                    path: "add",
                    component: EditVehicle
                },
                {
                    name: "EDIT VEHICLE",
                    path: "edit/:id",
                    component: EditVehicle
                }
            ]
        },
        {
            path: "/admin/manager/restaurant",
            component: RestaurantManager,
            children: [{
                    name: "RESTAURANT LIST",
                    path: "",
                    component: RestaurantList
                },
                {
                    name: "ADD RESTAURANT",
                    path: "add",
                    component: EditRestaurant
                },
                {
                    name: "EDIT RESTAURANT",
                    path: "edit/:id",
                    component: EditRestaurant
                }
            ]
        },
        {
            path: "/admin/manager/shop",
            component: ShopManager,
            children: [{
                    name: "SHOP LIST",
                    path: "",
                    component: ShopList
                },
                {
                    name: "ADD SHOP",
                    path: "add",
                    component: EditShop
                },
                {
                    name: "EDIT SHOP",
                    path: "edit/:id",
                    component: EditShop
                }
            ]
        },
        {
            path: "/admin/manager/scenic",
            component: ScenicManager,
            children: [{
                    name: "SCENIC LIST",
                    path: "",
                    component: ScenicList
                },
                {
                    name: "ADD SCENIC",
                    path: "add",
                    component: EditScenic
                },
                {
                    name: "EDIT SCENIC",
                    path: "edit/:id",
                    component: EditScenic
                }
            ]
        },
        {
            name: "ACCOUNT MANAGE",
            path: "/admin/manager/account",
            component: Account
        },
        {
            name: "COUNTRY MANAGE",
            path: "/admin/manager/country",
            component: Country
        }
        // ...generateRoutes(),
    ]
});