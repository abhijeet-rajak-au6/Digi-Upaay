module.exports = {
    Send(req, res) {
        try {
            const { data, message, statusCode } = req.locals;

            return res.status(statusCode).json({
                message: message,
                Data:data,
            });
        } catch (err) {
            console.log(err);
        }
    },
};