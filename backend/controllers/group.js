import { PrismaClient } from '@prisma/client';

async function createGroup(req, res) {
    const prisma = new PrismaClient();

    try {
        // Check if userIds is an array
        if (!Array.isArray(req.body.userIds)) {
            throw new Error('User IDs must be provided as an array');
        }

        // Create the group with the given name and connect existing users
        const group = await prisma.group.create({
            data: {
                name: req.body.name,
                users: {
                    connect: req.body.userIds.map(id => ({ id })) // Connect existing users by their IDs
                }
            },
            // Include users in the response
            include: {
                users: true
            }
        });

        return res.json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(400).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}


async function getAllGroups(req, res) {
    const prisma = new PrismaClient();
    try {
        const groups = await prisma.group.findMany({
        });
        return res.json(groups);
    } catch (error) {
        console.error('Error getting groups:', error);
        return null;
    }
    finally{
        prisma.$disconnect();
    }  
}

async function getGroup(req, res) {
    const prisma = new PrismaClient();
    try {
        const group = await prisma.group.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.json(group);
    } catch (error) {
        console.error('Error getting group:', error);
        return null;
    }
    finally{
        prisma.$disconnect();
    }  
}

async function usersInGroup(req, res){
    const prisma = new PrismaClient();
    try {
        const group = await prisma.group.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                users: true
            }
        });
        return res.json(group.users);
    } catch (error) {
        console.error('Error getting users in group:', error);
        return null;
    }
    finally{
        prisma.$disconnect();
    }  

}


export { createGroup, getAllGroups, getGroup, usersInGroup};

