module.exports = function (req, res, next) {

    req.additional = {};
    req.additional['identifier'] = req.headers.identifier || '';
    req.additional['requestUrl'] = req.originalUrl;

    console.log("api_start", req.additional, req.body || "");
    
    res.on('finish', () => {
        console.log("api_finish", req.additional, res.statusCode + " " + res.statusMessage)
    })
    return next();
}