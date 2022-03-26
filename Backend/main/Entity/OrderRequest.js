class OrderRequest{
    constructor(drinkerID, sellerID, order_name, order_caffeine) {
        this.drinkerID = drinkerID;
        this.sellerID = sellerID;
        this.order_name = order_name;
        this.order_caffeine = order_caffeine;
    }
}

module.exports = OrderRequest