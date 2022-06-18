import { WholesalerController } from "./WholesalerController.js";
export const register = (socket) => {
    socket.on('update-wholesaler-categories', ({ wholesaler }) => {
        WholesalerController.updateWholesalerCategories({
            wholesaler,
            endCallback(data) {
                socket.emit('update-wholesaler-categories:ended', data)
            }
        })
    })
};
