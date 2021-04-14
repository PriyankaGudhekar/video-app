const db = require('../utils/db');

module.exports.getVideos = async function (req, res) {

    try {
        let query = "select * from mst_video "

        let response = await db.execCallQuery(query)

        console.log(response.rows, "get response")
        if (response.rows.length == 0) {
            res.send({
                "status": false,
                "data": "No Video Found"
            })
        }
        else {
            res.send({
                "status": true,
                "data": response.rows
            })
        }
    } catch (err) {
        throw err
    }


}