import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from '@/store/user.js'
import moduleOrders from '@/store/order.js'
import moduleCabinet from '@/store/cabinet.js'
import moduleGprinter from '@/store/gprinter.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        'm_user': moduleUser,
        'm_order':moduleOrders,
		'm_cabinet': moduleCabinet,
		'm_gprinter': moduleGprinter
    },
})

export default store