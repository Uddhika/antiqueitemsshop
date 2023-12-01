import express, { request, response } from 'express';
import { user, product, order } from './datamodel.js';
import {} from 'dotenv/config';
import Stripe from 'stripe';

const prouter = express.Router();

async function createOrder(customer, data){
    const items = JSON.parse(customer.metadata.cart);
    const ship = JSON.parse(customer.metadata.shipping);
    
    const newOrder = new order({
        userid: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: items,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: ship,
        payment_status: data.payment_status,
        paytype: 'card'
    })

    try{
        // console.log(newOrder)
        const saveOrder = await newOrder.save();
    }
    catch(error){
        console.log(error);
    }
}

let endpointSecret; 
// endpointSecret = "whsec_fc01d5ca2df3f1f42a67df01ccdd3b6d4a668ff464f7e99ca612ca7d08adea6e";

const stripe = Stripe(process.env.stripe);

prouter.get('/viewproduct/:id', async(request, response) => {
    const {id} = request.params;
    const findproduct = await product.findById(id);
    // console.log(findproduct)
    if(findproduct){
        return response.json(findproduct);
        
    }
    else{
        return false;
    }
})

prouter.post('/payment', async(request, response) => {
    const {email, shipcost, cartdata, shippingarr} = request.body;

    const newarr = cartdata.map((item) => {
        const newobj = {...item};
        delete newobj['pimg'];
        delete newobj['pdesc'];
        return newobj;
    })


    const customer = await stripe.customers.create({
        metadata:{
            userId: email,
            cart: JSON.stringify(newarr),
            shipping: JSON.stringify(shippingarr),
        }
    })

    const line_items = cartdata.map((item) => {
        
        return {
            
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.pname,
                    images: [],
                    description: item.pdesc,
                    
                    metadata: {
                        id: item._id,
                    }
                },
            unit_amount: item.price * 100,
              },
            quantity: item.quantity,      
        };
    });

    const session = await stripe.checkout.sessions.create({ 
        payment_method_types: ['card'],
        shipping_options: [
        {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: shipcost * 100,
                    currency: 'usd',
                },
                display_name: 'Shipping Charges',
                delivery_estimate: {
                    minimum: {
                        unit: 'business_day',
                        value: 5,
                    },
                    maximum: {
                        unit: 'business_day',
                        value: 7,
                    },
                }
            }
        }
        ],
        customer: customer.id,
        line_items,
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
    });
    
    response.send({url: session.url});
})

prouter.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

    let data;
    let eventType;
    
    if(endpointSecret){
        // console.log(endpointSecret)
        let event;

        try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
        }
        data = event.data.object;
        eventType = event.type;
    }
    else{
        data = request.body.data.object;
        eventType = request.body.type;
    }
  

  // Handle the event
    if(eventType === "checkout.session.completed"){
        stripe.customers.retrieve(data.customer).then((customer) => {
            // console.log(customer);
            // console.log(data);
            createOrder(customer,data);
        }).catch(error => {
            console.log(error);
        })
    }

  response.send().end();
});

prouter.get('/config', async(request, response) => {
    response.send({
        publishableKey: process.env.publish,
    })
})

prouter.delete('/deleteproduct/:item', async(request, response) => {
    const {item} = request.params;
    const productcheck = await product.findByIdAndDelete(item);

    if(productcheck){
        const updatedproducts = await product.find({});
        return response.send({message: 'deleteok', data: updatedproducts})
    }

    else{
        return response.send({message: 'notdelete'})
    }
})

prouter.put('/updateproduct', async(request, response) => {
    const {name, price, desc, image, id} = request.body;

    const data = {
        _id: id,
        pname: name,
        price: price,
        pimg: image,
        pdesc: desc,
        
    }

    const updateproduct = await product.findOneAndUpdate({_id: id}, data);

    if(updateproduct){

        const updatedproducts = await product.find({});
        // console.log(updatedproducts.length)

        return response.send({msg: "updated", data: updatedproducts});
    }

    else{
        return response.send({msg: 'not updated'});
    }

})

//order route

prouter.get('/vieworders', async(request, response) => {
    try{
        const orders = await order.find({});
        return response.json(orders);
    }
    catch(error){
        return response.json('error');
    }
})

prouter.put('/updateorder', async(request, response) => {
    const {orderitem, delstatus} = request.body;
    try{
        const updateorder = await order.findOneAndUpdate({_id:orderitem.delid}, {delivery_status: delstatus});
        if(updateorder){
            const getupdatedorder = await order.find({});
            return response.json(getupdatedorder);
        }
    
        }
    catch(error){
        console.log(error)
    }
}
)

prouter.delete('/deleteorder/:item', async(request, response) => {
    const item = request.params;
    const delorder = await order.findByIdAndDelete(item.item);
    try{
        if(delorder){
            const getupdatedorders = await order.find({});
            return response.json(getupdatedorders);
        }
        // console.log('ok');
    }
    catch(error){
        return response.json(error)
    }
    
})

export default prouter;