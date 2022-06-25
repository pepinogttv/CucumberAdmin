import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = Schema({
    products: { type: [Object], required: true },
    user_id: { type: String, required: true },
    total: Number,
    mercadopago_reference_id: String,
    comprobante: String,
    status: {
        type: String, required: true, enum: [
            'in-cart', //Un usuario no puede tener mas de una orden en el carrito
            'started',
            'pending-payment',
            'paied',
            'pending-payment-to-the-wholesaler',
            'pending-shipping',
            'in-shipping',
            'finished'
        ]
    } // 

})