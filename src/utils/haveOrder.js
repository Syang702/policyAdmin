import { isOrder } from '../api/car.js'
function haveOrder() {
    isOrder().then(res => {
        if (res.nums >0) {
            this.voicePrompt('有新的订单待分配!');
        }
    })
}
export {
    haveOrder
}
