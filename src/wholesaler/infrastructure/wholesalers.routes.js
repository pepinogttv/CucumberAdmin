import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { WholesalerController } from "./WholesalerController.js";

import { authenticate } from "../../shared/infrastructure/middlewares/auth.js";
import { roleRequired } from "../../shared/infrastructure/middlewares/roleRequired.js";

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });


export const register = (router) => {
    router.get('/wholesalers',
        makeExpressCallback(WholesalerController.getAll)
    );
    router.get('/wholesalers/:id',
        makeExpressCallback(
            WholesalerController.getOne,
            function ({ params }) {
                return {
                    id: params.id
                }
            }
        )
    );
    router.post('/wholesalers',
        authenticate,
        upload.single('file'),
        makeExpressCallback(
            WholesalerController.create,
            function ({ body, file }) {
                return {
                    file,
                    wholesaler: body.wholesaler
                }
            }
        )
    );
    router.put('/wholesalers/:id',
        authenticate,
        upload.single('file'),
        makeExpressCallback(
            WholesalerController.update,
            function ({ params, body, file }) {
                return {
                    file,
                    wholesaler: body.wholesaler,
                    id: params.id
                }
            }
        )
    );
    router.delete('/wholesalers/:id',
        authenticate,
        makeExpressCallback(
            WholesalerController.deleteOne,
            function ({ params }) {
                return {
                    id: params.id
                }
            }
        )
    );
    router.post('/wholesalers/update-categories',
        authenticate,
        roleRequired('owner'),
        makeExpressCallback(
            WholesalerController.updateCategories,
            function ({ body }) {
                return {
                    wholesaler: body.wholesaler
                }
            }
        )
    );
};
