class Order{
    constructor(order_id, drinker_id, seller_id, time_order, time_finish, orders) {
        this.order_id = order_id
        this.drinker_id = drinker_id;
        this.seller_id = seller_id;
        this.time_order = time_order;
        this.time_finish = time_finish;
        this.orders = orders
    }
}

module.exports = Order