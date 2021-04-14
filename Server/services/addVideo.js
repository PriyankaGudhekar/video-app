const db = require('../utils/db');

module.exports.addVideo = async function (req, res) {
    let reqBody = req.body.params;

    try {
        let query = "insert into mst_video (vid_name,vid_desc,vid_url)" +
            "values (?,?,?)"

        let values = [reqBody.video_name, reqBody.video_desc, reqBody.video_url]

        let response = await db.execQuery(query, values)


        console.log(response.rows, "insert response")
        if (response.rows.affectedRows == 0) {
            res.send({
                "status": false,
                "data": "Video Addition Failed"
            })
        }
        else {
            res.send({
                "status": true,
                "data": "Video Added Succesfully"
            })
        }
    } catch (err) {
        throw err
    }


}