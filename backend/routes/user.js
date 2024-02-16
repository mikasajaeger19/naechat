import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { viewUser, createUser, updateUser, viewAllUsers, userGroups} from '../controllers/user.js';
import { parse } from 'path';

const userRouter = Router();

userRouter.put('/update/:id', (req, res) => {
   updateUser(req, res, parseInt(req.params.id));
});

userRouter.get('/allUsers', viewAllUsers);

userRouter.get("/getUser/:id", (req, res) => {
    viewUser(req, res);
});

userRouter.get("/groups/:id", (req, res) => {
    userGroups(req, res);
})

export { userRouter };
