import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
    MONGO: {
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        NAME: process.env.DB_NAME,
        PORT: parseInt(process.env.DB_PORT),
        HOST: process.env.DB_HOST,
        CONECCTION: process.env.DB_CONECCTION,

    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET
}))
