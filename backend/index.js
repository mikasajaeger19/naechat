import express from 'express';
import dotenv from 'dotenv';
import authRouter from './auth/auth.js';
import { authenticateJWT } from './controllers/auth.js';
import {groupRouter} from './routes/group.js';
import {messageRouter} from './routes/message.js';
import {userRouter} from './routes/user.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use('/api', authenticateJWT);
app.use('/auth', authRouter);
app.use('/api/group', authenticateJWT, groupRouter);
app.use('/api/message', authenticateJWT, messageRouter);
app.use('/api/user', authenticateJWT, userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})