const Schema = {
    Drinkers: {
        id: {type: 'increments', nullable: false, primary: true},
        username: {type: 'string', maxlength: 254, nullable: false, unique: true},
        password: {type: 'string', maxlength: 254, nullable: false},
        caffeine: {type: 'integer', nullable: false}
    },
    Sellers: {
        id: {type: 'increments', nullable: false, primary: true},
        username: {type: 'string', maxlength: 254, nullable: false, unique: true},
        password: {type: 'string', maxlength: 254, nullable: false},
        latitude: {type: 'decimal', nullable: false},
        longitude: {type: 'decimal', nullable: false}
    },
    Items: {
        id: {type: 'increments', nullable: false, primary: true},
        seller_id: {type: 'integer', nullable: false},
        name: {type: 'string', maxlength: 254, nullable: false},
        price: {type: 'string', maxlength: 254, nullable: false},
        caffeine: {type: 'string', maxlength: 254, nullable: false}
    },
    Orders: {
        id: {type: 'increments', nullable: false, primary: true},
        drinker_id: {type: 'integer', nullable: false},
        seller_id: {type: 'integer', nullable: false},
        time_order: {type: 'datetime', nullable: false},
        time_finish: {type: 'datetime', nullable: false},
        items: {type: 'string', maxlength: 254, nullable: false}
    },
    Frequency:{
        id: {type: 'increments', nullable: false, primary: true},
        drinker_id: {type: 'integer', nullable: false},
        item: {type: 'string', maxlength: 254, nullable: false},
        total: {type: 'integer', nullable: false}
    }
/*,
posts: {
    id: {type: 'increments', nullable: false, primary: true},
    user_id: {type: 'integer', nullable: false, unsigned: true},
    category_id: {type: 'integer', nullable: false, unsigned: true},
    title: {type: 'string', maxlength: 150, nullable: false},
    slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
    html: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
},


tags: {
    id: {type: 'increments', nullable: false, primary: true},
    slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
    name: {type: 'string', maxlength: 150, nullable: false}
},


posts_tags: {
    id: {type: 'increments', nullable: false, primary: true},
    post_id: {type: 'integer', nullable: false, unsigned: true},
    tag_id: {type: 'integer', nullable: false, unsigned: true}
}*/
};
module.exports = Schema;