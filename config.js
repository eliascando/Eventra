import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};

Object.keys(config).forEach( key => {
    if (config[key] === undefined) {
        throw new Error(`ENVIRONMENT VARIABLE ${key} IS NOT DEFINED`);
    }
});

export { config };