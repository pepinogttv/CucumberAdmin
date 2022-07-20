import { WholesalerProductController } from "../../wholesalersProduct/infrastructure/WholesalerProductController.js";
import { AdminUserController } from "../../adminUser/infrastructure/AdminUserController.js";
export const listeners = {
  "product.created":
    (io) =>
    async ({ product, user }) => {
      // const sockets = await io.fetchSockets();
      AdminUserController.addProductUploaded({ user, product });
      WholesalerProductController.updateOne({
        productCode: product.wholesalerData.productCode,
        data: { uploaded: true },
      });
    },
};
