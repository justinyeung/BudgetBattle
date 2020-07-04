require('dotenv').config();
const DB_PROD_URI = process.env.REACT_APP_DB_URI;
const DB_DEV_URI = process.env.REACT_APP_LOCAL_DB_URI;

module.exports = {
    mongodburi: DB_PROD_URI,
};
