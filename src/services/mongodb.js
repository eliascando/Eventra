import mongoose from "mongoose";
import { config } from "../../config.js";

const connect = async () => {
    try {
        await mongoose.connect(config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    }
    catch (error) {
        console.log(error);
    }
}

export { connect };
