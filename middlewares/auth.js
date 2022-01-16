const jwt = require("jsonwebtoken");
const env = require("../env");

const JWT_SECRET = env.JWT_SECRET;

function isAuth(res) {
    var bearerHeader = res.req.rawHeaders.filter((header) => {
        if (header.startsWith('Bearer'))
            return header;
    });
    if (bearerHeader.length > 0 && bearerHeader.length < 2) {
        const accessToken = bearerHeader[0].split("Bearer ")[1];
        return jwt.verify(accessToken, JWT_SECRET, function (err, decoded) {
            if (err)
                throw new Error("Unauthorized: Invalid or expired token");
            res.locals.authInfo = {
                adminId: decoded.userId
            };
        });
    }
    throw new Error("Unauthorized: Missing or invalid Auth Header");
}

module.exports = {
    isAuth,
    JWT_SECRET,
}