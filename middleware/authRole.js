const isAdmin = (req, res, next) => {
    if(req.user.role === "admin"){
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized only admin' });
    }
}

const isUser = (req, res, next) => {
    if(req.user.role === "user"){
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized only admin' });
    }
}

module.exports = {isAdmin, isUser};