import {Router} from 'express'
import { PrismaClient } from '@prisma/client'
import { createGroup, getAllGroups, getGroup } from '../controllers/group.js'
const groupRouter = Router()

groupRouter.get('/allGroups', getAllGroups);

groupRouter.post('/create', (req, res) => {
    createGroup(req, res, req.body.name, req.body.users)
})

groupRouter.get('/get/:id', (req, res) => {
    getGroup(req, res);
})

export {groupRouter}