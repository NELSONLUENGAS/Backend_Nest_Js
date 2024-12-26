import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
    database: {
        name: process.env.DB_NAME
    },
    apiKey: process.env.API_KEY
}))
