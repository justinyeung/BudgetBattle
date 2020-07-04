require('dotenv').config();
const DB_PROD_URI = process.env.REACT_APP_DB_URI;

module.exports = {
    mongodburi: DB_PROD_URI,
};
