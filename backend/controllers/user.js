import { PrismaClient } from '@prisma/client';

const viewUser = async (req, res) => {
    
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
    finally{
        prisma.$disconnect();
    }
}

const viewAllUsers = async (req, res) => {

    const prisma = new PrismaClient();
    try {
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        return null;
    }
    finally{
        prisma.$disconnect();
    }

}


const createUser = async (name, prisma) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name
            }
        });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

const updateUser = async (req, res, id) => {

    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                bio: req.body.bio
            }
        });
        return res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
    finally{
        prisma.$disconnect();
    }
}

const userGroups = async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const groups = await prisma.group.findMany({
            where: {
                users: {
                    some: {
                        id: parseInt(req.params.id)
                    }
                }
            }
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

export { viewUser, createUser, updateUser, viewAllUsers, userGroups };