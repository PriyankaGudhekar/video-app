const mysql = require('mysql');
const mysqlConfig = require('../config/config.development').mysql;
const pool = mysql.createPool(mysqlConfig);

module.exports.execQuery = function (query, values) {
    return new Promise(function (resolve, reject) {

        pool.getConnection((error, connection) => {
            if (error) {
                console.log("Error -> ", error);
                reject("db connection gone away")
            } else {

                connection.query(query, values, function (err, rows, fields) {
                    connection.release();

                    if (err) {
                        console.log('rejecting ', query, values)
                        console.log(err)
                        reject("something wrong in database related operation")
                    } else {
                        resolve({ rows: rows, fields: fields })
                    }

                })

            }
        })
    })
}

module.exports.execCallQuery = async function (query) {
    return new Promise(function (resolve, reject) {
        console.log(query);

        pool.getConnection((error, connection) => {
            if (error) {
                console.log("Error -> ", error);
                reject(error)
            } else {

                connection.query(query, function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        resolve({ rows: rows, fields: fields })
                    }

                })

            }
        })
    })
}

module.exports.dbCheck = function (callback) {

    db.getConnection((err, connection) => {
        if (err) {
            console.log("Error -> ", err);
            if (err.code === 'ER_ACCESS_DENIED_ERROR') {
                err = new Error('Could not access the database. Check MySQL config and authentication credentials');
            }
            if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                err = new Error('Could not connect to the database. Check MySQL host and port configuration');
            }
            callback(err);
        } else {
            connection.release();
            callback();
        }
    })
}

