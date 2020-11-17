module.exports = {
    roleChecker,
}


function roleChecker(role) {
    return(req, res, next) => {
        if( req.decodedJwt.role === role) {
            console.log("jwt role",  req.decodedJwt.role)
            next()
        } else {
            res.status(401).json({ message: "You are unauthorized"})
        }

    }
}
