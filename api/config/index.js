module.exports = {
    PORT: process.env.PORT || 3000,
    DB: {
        CONNECTION_STRING: process.env.CONNECTION_STRING || "mongodb://localhost:27017/kkm-project",
    },
    TOKEN_EXPIRE_TIME: !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME)) ? parseInt(process.env.TOKEN_EXPIRE_TIME) : 60 * 60 * 24, 
    JWT: {
        SECRET: process.env.JWT_SECRET||"123456" ,
        SESSION: {
            session: false
        }
    },
    LANG: process.env.SYSTEM_LANG || "en",
    LOGS: {
        TRANSPORT: process.env.LOG_TRANSPORT || "DB",
        LOG_LEVEL: process.env.LOG_LEVEL || "info",
        MAX_FILE_SIZE: process.env.LOG_MAX_FILE_SIZE || "50m", 
        MAX_FILES: process.env.LOG_MAX_FILES || "14d" 
    }
};