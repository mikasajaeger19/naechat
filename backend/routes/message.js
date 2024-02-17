import { PrismaClient } from "@prisma/client";
import express from 'express';
import { createMessage, editMessage, getMessages } from '../controllers/message.js'

const messageRouter = express.Router();

messageRouter.get('/group/:id', (req, res) => {
    getMessages(req, res);
})

messageRouter.post('/create', (req, res) => {
    createMessage(req, res);
})

messageRouter.put('/update/:id', (req, res) => {
    editMessage(req, res, parseInt(req.params.id));
})

export { messageRouter}