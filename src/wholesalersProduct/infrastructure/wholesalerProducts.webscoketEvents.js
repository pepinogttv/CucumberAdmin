import { WholesalerProductController } from "./WholesalerProductController.js";
export const register = (socket) => {
    socket.on('update-wholesaler-products', ({ wholesaler }) => {
        WholesalerProductController.updateWholesalerProducts({
            wholesaler,
            updateCallback: (data) => {
                socket.emit('update-wholesaler-products:updating', data)
            },
            endCallback() {
                socket.emit('update-wholesaler-products:end')
            }
        });
    })
    socket.on('set-wholesaler-products-additional-info', ({ wholesaler }) => {
        WholesalerProductController.setWholesalerProductsImages({
            wholesaler,
            updateCallback: (data) => {
                socket.emit('set-wholesaler-products-additional-info:updating', data)
            },
            endCallback() {
                socket.emit('set-wholesaler-products-additional-info:ended')
            }
        });
    })
};
