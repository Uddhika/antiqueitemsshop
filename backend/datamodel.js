import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    fname : {
        type: String,
        required: true
    },

    lname : {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true
    },

    password : {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: false
    }

})

const productSchema = mongoose.Schema({
    pname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        get: c => (c/100).toFixed(2),
        set: c => c*100,
        required: true,
    },

    pimg: {
        type : String,
        required: true,
    },

    pdesc: {
        type: String,
        required: true,
    }
},
    {
        toJSON: { getters: true }
    }
)

const orderSchema = mongoose.Schema({
    userid: {
        type : String,
        required: true,
    },
    customerId: {
        type: String
    },
    paymentIntentId: {
        type: String
    },
    products: [{
        id: {
            type: String
        },
        name: {
            type: String
        },
        price: {
            type: Number,
            get: c => (c/100).toFixed(2),
            set: c => c*100
        },
        quantity: {
            type: Number,
        },
    }],
    subtotal:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    shipping: {
        type: Object,
        required: true
    },
    delivery_status: {
        type: String,
        default: "pending"
    },
    payment_status:{
        type: String,
        required: true
    },
    paytype:{
        type: String,
        required: true,
    }
},
{timestamps: true}
)

const user = mongoose.model("users", userSchema);
const product = mongoose.model("products", productSchema);
const order = mongoose.model("orders", orderSchema);

export {
    user, product, order
}