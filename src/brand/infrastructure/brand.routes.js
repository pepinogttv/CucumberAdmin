import multer from "multer";
import makeExpressCallback from "../../shared/infrastructure/makeExpressCallback.js";
import { BrandController } from "./BrandController.js";

import { reduceImageQuality } from "../../shared/infrastructure/middlewares/reduceImageQuality.js";
import { authenticate } from "../../shared/infrastructure/middlewares/auth.js";

const upload = multer({ storage: multer.memoryStorage() });

export const register = (router) => {
  router.post(
    "/brands",
    authenticate,
    upload.single("file"),
    reduceImageQuality,
    makeExpressCallback(BrandController.create, ({ body, file }) => ({
      brand: body,
      file,
    }))
  );
  router.put(
    "/brands/:id",
    authenticate,
    upload.single("file"),
    reduceImageQuality,
    makeExpressCallback(BrandController.update, ({ body, file }) => ({
      brand: body,
      file,
    }))
  );
  router.delete(
    "/brands/:id",
    authenticate,
    makeExpressCallback(BrandController.deleteOne, ({ params }) => ({
      id: params.id,
    }))
  );
  router.get(
    "/brands",
    authenticate,
    makeExpressCallback(BrandController.getAll)
  );
  router.get(
    "/brands/:id",
    makeExpressCallback(BrandController.getOne, ({ params }) => ({
      id: params.id,
    }))
  );
};
