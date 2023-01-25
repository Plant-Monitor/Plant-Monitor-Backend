import { registerAs } from "@nestjs/config";

export default registerAs('mongodb', () => ({
    uri: process.env.MONGO_URI,
    user_db: process.env.NODE_ENV,
}))