import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const router = Router();

dotenv.config();

router.get('/', (req, res) => {
    res.send('Auth router');
})

router.post('/register', async (req, res) => {
    const prisma = new PrismaClient();
    //console.log(req.body.username)
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        });

        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                bio: req.body.bio
            }
        });

        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const data = {
            username: newUser.username
        };
        const token = jwt.sign(data, jwtSecretKey); 
        return res.json({token, newUser});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await prisma.$disconnect();
    }
});

router.post('/login', async (req, res) => {
    console.log("this is the input", req.body)
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        });

        if (!user) {
            return res.status(400).send('User does not exist');
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).send('Unauthorized');
            }
            if (result) {
                console.log('User logged in');
            } else {
                return res.status(401).send('Unauthorized');
            }
        })

        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const data = {
            username: user.username
        };
        const token = jwt.sign(data, jwtSecretKey);
        return res.json({token, user});

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await prisma.$disconnect();
    }
})


router.get('/validate', (req, res) => {

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
})

export default router;
