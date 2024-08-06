const dotenv = require('dotenv')

dotenv.config()

module.exports={
    DB:process.env.MONGO_URI,
    PORT:process.env.PORT,
    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PORT:process.env.REDIS_PORT,
    REDIS_URL:process.env.REDIS_URL,
    NODE_ENV:process.env.NODE_ENV,
    SESSION_SECRET:process.env.SESSION_SECRET
}
