import mongoose from "mongoose";
import { App } from "./app.js"
import logger from "./src/shared/infrastructure/logger.js";

const app = App();

const mongooseUrl = 'mongodb+srv://pepinogalactico:FULLCLIP24523434534@cucumberserverless.4zahm.mongodb.net/Cucumber?retryWrites=true&w=majority'
// const mongooseUrl = "mongodb+srv://pepinogalactico:FULLCLIP24523434534@cluster0.4zahm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(
    mongooseUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (err) return logger.error(err);
        try {
            app.start();
        } catch (e) {
            logger.error(e);
        }
    }
);
