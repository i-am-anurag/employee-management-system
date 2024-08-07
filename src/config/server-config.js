const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    APP_URL: process.env.SERVER_URL || "localhost:3000/"
}