import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized');
        }
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            // If token is valid, you can proceed to the next middleware
            next();
        } else {
            res.status(401).send('Token is invalid');
        }
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};

export { authenticateJWT };