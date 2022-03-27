class Order{
    constructor(drinker_id, seller_id, time, orders) {
        this.drinker_id = drinker_id;
        this.seller_id = seller_id;
        this.time = time;
        this.orders = orders
    }
}

module.exports = Order