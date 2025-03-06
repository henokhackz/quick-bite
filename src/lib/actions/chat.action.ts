'use server'
import prisma from "@/lib/prisma";
import { GroupForm, groupSchema } from "../schema/schema";

import { revalidatePath } from "next/cache";
import {pusher} from '@/lib/pusher/pusher'


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




export const addUserToGroup = async (userId:string, groupId:string) => {
    try {
      
        //check if user exists 
            const existingUser = await prisma.user.findUnique({
              where: { id: userId },
             });

             if (!existingUser) {
            console.log("User does not exist");
                return { success: false, data: null };
             }
             console.log(existingUser, "existing user")
        //check group exists
        const existingGroup = await prisma.chatRoom.findUnique({
            where: {
                id:groupId
            }
        })

        console.log(existingGroup, "existing group", groupId, 'group id ')
        if(!existingGroup){
            console.log("Group does not exist")
            return {
                success:false,
                data:null

            }
        }
        // Check if the user is already in the group
        const existingMembership = await prisma.chatRoomUser.findFirst({
            where: {
                userId,
                chatRoomId: groupId
            }
        });

        if (existingMembership) {
            console.log("User is already in the group");
            return { success: false, data: null };
        }


        const groupUser = await prisma.chatRoomUser.create({
            data: {
                role: "MEMBER",
                user: { connect: { id: userId } },
                chatRoom: { connect: { id: groupId } }
            }
        });
        return {
            success:true,
            data:groupUser
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:null
        }
    }
}



export const getGroups = async () => {
    try {
        const groups = await prisma.chatRoom.findMany({
            where: {
                type: 'GROUP'
            }
        });
        return {
            success:true,
            data:groups
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:null
        }
    }
}

export const createMessage = async (message:string, senderId:string, groupId:string) => {
    try {
        const message1 = await prisma.message.create({
            data: {
                text: message,
                sender: { connect: { id: senderId } },
                chatRoom: { connect: { id: groupId } }
            }
        });

        pusher.trigger('chat', 'new-message', {
            data:message1
        })
        
        return {
            success:true,
            data:message1
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:null
        }
    }
}



export const getChats = async () => {
    try {
        const chats = await prisma.chatRoom.findMany(
            { 
               include: {
                messages: { include: { sender: true } },
                users: { include: { user: true } }
               }
            }
        );
        return {
            success:true,
            data:chats
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:null
        }
    }
}


export const getChat = async (id:string) => {
    try {
        const chat = await prisma.chatRoom.findUnique({
            where: { id },
            include: {
                messages: { include: { sender: true } },
                users: { include: { user: true } }
              }
        });
        return {
            success:true,
            data:chat
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            data:null
        }
    }
}


export const createConversation = async (senderId:string, recieverId:string) => {
    try {
            let existingConversation = await prisma.chatRoom.findFirst({
            where: {
            AND:[
            { users: { some: { userId: senderId}}},
                {users: { some: { userId: recieverId}}},
            ]
        
             },
             include: { users: true },
           });

           if (existingConversation) {
            return {
                success: true,
                data: existingConversation,
              };
           }

        const conversation = await prisma.chatRoom.create({
            data: {
                type: 'PERSONAL',
                name:senderId + recieverId,
                users: {
                    create: [
                     {userId: senderId, role:"MEMBER"},
                     {userId: recieverId, role:"MEMBER"}
                    ]
                  }
            }
        });
        revalidatePath(`/list/chats/${conversation.id}`)
        return {
            success:true,
            data:conversation
        }
    } catch (error) {
        console.log(error)
        return {  
            success:false,
            data:null
        }
    }
}
