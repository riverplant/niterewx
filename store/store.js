import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from '@/store/user.js'
import moduleOrders from '@/store/order.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        'm_user': moduleUser,
        'm_order':moduleOrders
    },
})

export default store