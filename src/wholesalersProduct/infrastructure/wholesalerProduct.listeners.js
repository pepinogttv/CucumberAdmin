
export const listeners = {
    'wholesalerProduct.update:updating': (io) => async (product) => {
        const socket = (await io.fetchSockets())[0]
        socket.emit('wholesalerProduct.update:updating', product);
    },
    'wholesalerProduct.update:end': (socket) => (products) => {
        socket.emit('wholesalerProduct.update:end', products);
    },
    'wholesalerProduct.setAdditionalInfo:updating': (socket) => (product) => {
        socket.emit('wholesalerProduct.setAdditionalInfo:updating', product);
    },
    'wholesalerProduct.setAdditionalInfo:end': (socket) => (product) => {
        socket.emit('wholesalerProduct.setAdditionalInfo:end', product);
    },
}

