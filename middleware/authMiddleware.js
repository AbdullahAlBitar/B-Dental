const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const token = req.body.jwt || req.headers.authorization?.split(' ')[1]; // Get token from headers

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        console.log(`${decoded.role}, ID: ${decoded.id}, is authorized`);
        
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateJWT;
