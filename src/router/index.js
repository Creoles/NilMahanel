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
import HotelCompany from "../views/admin/company/HotelCompany.vue"
import EditHotelCompany from "../views/admin/company/EditHotelCompany.vue"
import EditHotelPrice from "../views/admin/manager/price/hotel/HotelPrice.vue"
import VehicleManager from "../views/admin/manager/resource/vehicle/Vehicle.vue"
import VehicleList from "../views/admin/manager/resource/vehicle/VehicleList.vue"
import EditVehicle from "../views/admin/manager/resource/vehicle/EditVehicle.vue"
import RestaurantManager from "../views/admin/manager/resource/restaurant/Restaurant.vue"
import RestaurantList from "../views/admin/manager/resource/restaurant/RestaurantList.vue"
import EditRestaurant from "../views/admin/manager/resource/restaurant/EditRestaurant.vue"
import RestaurantAccount from "../views/admin/finance/account/RestaurantAccount.vue"
import RestaurantPrice from "../views/admin/manager/price/restaurant/EditPrice.vue"
import ShopManager from "../views/admin/manager/resource/shop/Shop.vue"
import ShopList from "../views/admin/manager/resource/shop/ShopList.vue"
import EditShop from "../views/admin/manager/resource/shop/EditShop.vue"
import ScenicManager from "../views/admin/manager/resource/scenic/Scenic.vue"
import ScenicList from "../views/admin/manager/resource/scenic/ScenicList.vue"
import EditScenic from "../views/admin/manager/resource/scenic/EditScenic.vue"
import CiceroneManager from "../views/admin/manager/resource/cicerone/Cicerone.vue"
import CiceroneList from "../views/admin/manager/resource/cicerone/CiceroneList.vue"
import EditCicerone from "../views/admin/manager/resource/cicerone/EditCicerone.vue"
import CiceronePrice from "../views/admin/manager/price/cicerone/EditPrice.vue"
import CiceroneAccount from "../views/admin/finance/account/CiceroneAccount.vue"
import ProductManager from "../views/wholesaler/product/product.vue"
import ProductList from "../views/wholesaler/product/list.vue"
import EditProduct from "../views/wholesaler/product/edit.vue"
import ProductDetail from "../views/wholesaler/product/detail.vue"
import Account from "../views/admin/manager/Account.vue"
import Country from "../views/admin/manager/Country.vue"
import ShopCompany from "../views/admin/company/ShopCompany.vue"
import VehicleCompany from "../views/admin/company/VehicleCompany.vue"
import VehicleType from "../views/admin/manager/resource/vehicle/VehicleType.vue"
import EditVehicleCompany from "../views/admin/company/EditVehicleCompany.vue"
import VehicleAccount from "../views/admin/finance/account/VehicleAccount.vue"
import VehiclePrice from "../views/admin/manager/price/vehicle/EditPrice.vue"
import ScenicPrice from "../views/admin/manager/price/scenic/EditPrice.vue"
import EditShopCompany from "../views/admin/company/EditShopCompany.vue"
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
        },
        {
          name: "HOTEL COMPANY",
          path: "company",
          component: HotelCompany
        },
        {
          name: "ADD HOTEL COMPANY",
          path: "company/add",
          component: EditHotelCompany
        },
        {
          name: "EDIT HOTEL COMPANY",
          path: "company/edit/:id",
          component: EditHotelCompany
        },
        {
          name: "EDIT HOTEL PRICE",
          path: "price/:id",
          component: EditHotelPrice
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
        },
        {
          name: "VEHICLE TYPE LIST",
          path: "type",
          component: VehicleType
        },
        {
          name: "ADD VEHICLE COMPANY",
          path: "company/add",
          component: EditVehicleCompany
        },
        {
          name: "EDIT VEHICLE COMPANY",
          path: "company/edit/:id",
          component: EditVehicleCompany
        },
        {
          name: "VEHICLE ACCOUNT",
          path: "account",
          component: VehicleAccount
        },
        {
          name: "VEHICLE PRICE",
          path: "price",
          component: VehiclePrice
        },
        {
          name: "VEHICLE COMPANY",
          path: "company",
          component: VehicleCompany
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
        },
        {
          name: "RESTAURANT ACCOUNT",
          path: "account",
          component: RestaurantAccount,
        },
        {
          name: "RESTAURANT PRICE",
          path: "price",
          component: RestaurantPrice
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
        },
        {
          name: "SHOP COMPANY",
          path: "company",
          component: ShopCompany
        },
        {
          name: "ADD SHOP COMPANY",
          path: "company/add",
          component: EditShopCompany
        },
        {
          name: "EDIT SHOP COMPANY",
          path: "company/edit/:id",
          component: EditShopCompany
        },
        {
          name: "SHOP PRICE",
          path: "price",
          component: ShopList
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
        },
        {
          name: "SCENIC PRICE",
          path: "price",
          component: ScenicPrice
        }
      ]
    },
    {
      path: "/admin/manager/cicerone",
      component: CiceroneManager,
      children: [{
        name: "CICERONE LIST",
        path: "",
        component: CiceroneList
      }, {
        name: "ADD CICERONE",
        path: "add",
        component: EditCicerone
      }, {
        name: "EDIT CICERONE",
        path: "edit/:id",
        component: EditCicerone
      }, {
        name: "CICERONE COST",
        path: "price",
        component: CiceronePrice
      }, {
        name: "CICERONE ACCOUNT",
        path: "account",
        component: CiceroneAccount
      }]
    },
    {
      path: "/wholesaler/product",
      component: ProductManager,
      children: [{
        name: "PRODUCT LIST",
        path: "",
        component: ProductList
      },
        {
          name: "ADD PRODUCT",
          path: "add",
          component: EditProduct
        },
        {
          name: "EDIT PRODUCT",
          path: "edit/:id",
          component: EditProduct
        },
        {
          name: "PRODUCT DETAIL",
          path: "detail",
          component: ProductDetail
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
    },


    // ...generateRoutes(),
  ]
});