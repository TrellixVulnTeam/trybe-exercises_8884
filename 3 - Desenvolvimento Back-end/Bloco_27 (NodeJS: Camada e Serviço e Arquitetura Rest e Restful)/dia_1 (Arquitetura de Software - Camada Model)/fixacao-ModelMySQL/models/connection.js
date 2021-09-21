// COM MYSQL
// const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//   user: 'arthur-hc',
//   password: 'trybe12345',
//   host: 'localhost',
//   database: 'model_example'
// });

// module.exports = connection;

// COM MONGODB
const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

let db = null;

const connection = () => {
    return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db('model_example');
    return db;
    })
};

module.exports = connection;