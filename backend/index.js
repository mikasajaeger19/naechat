// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//       const users = await prisma.user.findMany()
//       console.log(users)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

import express from 'express';
import dotenv from 'dotenv';
import authRouter from './auth/auth.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})