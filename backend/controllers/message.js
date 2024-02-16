import { PrismaClient } from '@prisma/client';

async function getMessages(req, res) {

    const prisma = new PrismaClient();
    try {
        const messages = await prisma.message.findMany({
            where: {
                group: {
                    id: parseInt(req.params.id)
                }
            }
        });
        return res.json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        return null;
    }

    finally {
        prisma.$disconnect();
    }
}

async function createMessage(req, res) {

    const prisma = new PrismaClient();
    try {
        const message = await prisma.message.create({
            data: {
                text: req.body.text,
                user: {
                    connect: {
                        id: parseInt(req.body.userid)
                    }
                },
                group: {
                    connect: {
                        id: parseInt(req.body.groupid)
                    }
                }
            }
        });
        return res.json(message);
    } catch (error) {
        console.error('Error creating message:', error);
        return null;
    }
    finally {
        prisma.$disconnect();
    }
}

export { getMessages, createMessage };