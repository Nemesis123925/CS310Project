class Trip{
    constructor(order_id, seller_id, drinker_socket_id, location) {
        this.order_id = order_id
        this.seller_id = seller_id;
        this.drinker_socket_id = drinker_socket_id;
        this.location = location;
    }
}

module.exports = Trip