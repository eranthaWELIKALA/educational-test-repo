module.exports = function (err, req, res, next) {
    if (err.response) {
        res.status(err.response.status).send({
            status: err.response.status,
            message: err.response.data
        });
    }
    else {
        next();
    }
}