const authenticateJWT = (req, res) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try{

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const verified = jwt.verify(token, jwtSecretKey);

        if(verified){
            res.send('Token is valid');
        }
        else{
            res.send('Token is invalid');
        }
    } catch (error){
        return res.status(401).send('Unauthorized');
    }
};

export {authenticateJWT};