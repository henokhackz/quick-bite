'use server'
import prisma from "@/lib/prisma";
import { GroupForm, groupSchema } from "../schema/schema";


export const createGroup = async (data:GroupForm, ownerId:string) => {

    const validated = groupSchema.safeParse(data);
    
    if(!validated.success){
        console.log(validated.error)
        return {
            success: false,
            message: 'Invalid data'
        }
    }

    try {

    const existingGroup = await prisma.chatRoom.findFirst({
        where: {
            name: validated.data.name
        }
    })

    if(existingGroup){

        return{
            success:false,
            message:"Group name already exists"
        }
    }

    const group = await prisma.chatRoom.create({
        data: {
            name: validated.data.name,
            description: validated.data.description,
            isPrivate: validated.data.isPrivate,
            type:'GROUP',
             ownerId
        }
    });
    console.log(group)
    return {
        success:true,
        data:group
    }
}catch(error){
    console.log(error)
    return {
        success:false,
        data:null
    }
}
    
}


export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return {
            success:true,
            data:users
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:null
        }
    }
}