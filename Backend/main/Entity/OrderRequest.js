class OrderRequest{
    constructor(drinkerID, seller_socket_id, orders) {
        this.drinkerID = drinkerID;
        this.drinker_socket_id = "";
        this.seller_socket_id = seller_socket_id;
        this.orders = orders
    }
}

module.exports = OrderRequest