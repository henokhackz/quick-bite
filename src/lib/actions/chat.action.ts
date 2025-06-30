'use server'
import prisma from "@/lib/prisma";
import { GroupForm, groupSchema } from "../schema/schema";

import { revalidatePath } from "next/cache";
import {pusher} from '@/lib/pusher/pusher'
import { User, UserRole } from "@prisma/client";


export const createGroup = async (data:GroupForm, ownerId:string, users?:User[]) => {

    const validated = groupSchema.safeParse(data);
    
    if(!validated.success){
        console.log(validated.error)
        return {
            success: false,
            message: 'Invalid data'
        }
    }
    const { name, description, isPrivate} = validated.data

    try {

    const existingGroup = await prisma.chatRoom.findFirst({
        where: {
            name,
        }
    })

    if(existingGroup){

        return{
            success:false,
            message:"Group name already exists"
        }
    }



    if(!users || users.length <=2){
        return {
            success:false,
            message:"Group must have at least 3 members",
            data:null,
        }
        
    }
    const userIds = [...users.map((user) => ({id:user.id})), {id:ownerId, role:"ADMIN"}] as {id:string, role:UserRole}[]

    const group = await prisma.chatRoom.create({
        data: {
            name,
            description,
            isPrivate,
            type:'GROUP',
            ownerId
        },
    });

       await prisma.chatRoomUser.createMany({
        data: userIds.map((user) => ({
          userId: user.id,
          chatRoomId: group.id,
          role: user?.role || "MEMBER",
        })
    ),     
      });

    const groupUsers = await prisma.chatRoomUser.findMany({
        where:{
            chatRoomId:group.id
        },
        include:{
            user:true
        }
    })
    groupUsers.forEach((user) => {
        pusher.trigger(user.id, 'new-group', {
            group: group,
          });
    })
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
            },
            include:{
                users:true
            }
        })

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


        existingGroup.users.forEach((user) => {
            pusher.trigger(user.id, 'new-group-user', {
                group: existingGroup,
              });
        })
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
    if(!message || !senderId || !groupId){
        return {
            success:false,
            data:null
        }
    }

     
    try {
        const existingGroup = await prisma.chatRoom.findUnique({
            where: {
                id:groupId
            },
            include:{
                messages:true,
                users:true
            }
        })

        if(!existingGroup){
            return {
                success:false,
                data:null
            }
        }
     //get message sender ids and make sure they are not null
    const messageSenderIds = existingGroup.messages
  .map((message) => message?.senderId) 
  .filter((id): id is string => id !== null && id !== undefined); 

        const message1 = await prisma.message.create({
            data: {
                text: message,
                sender: { connect: { id: senderId } },
                chatRoom: { connect: { id: groupId } ,
            
                 
                
            },
            seenIds:[...messageSenderIds, senderId]
            


            }
        });
       
        const chatUser = existingGroup.users.find((user) => user.userId === senderId);

        if (!chatUser) {
            console.log("User not found in group");
            return { success: false, data: null };
        }

        await prisma.chatRoomUser.update({
            where:{
            chatRoomId:groupId,
            userId:senderId,
            id:chatUser?.id

            },
            data:{
                user: { connect: { id: senderId } }

            }
        })
        console.log("🚀 Triggering Pusher for chat:", groupId, {
         messages: [message1],
        });
        
        const updatedConversation = await prisma.chatRoom.findUnique({
            where:{id:groupId},
            include:{messages:true, users:{include:{user:true}}}
        })
        const lastMessage = updatedConversation?.messages[updatedConversation.messages.length - 1];
      
        updatedConversation?.users.forEach(({user}) => {
            pusher.trigger(user?.id as string, 'update-message', {
                messages:[lastMessage]
            })
        })
        await  pusher.trigger(groupId, 'new-message',{
            messages:[message1]
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
             include: { users: true, messages:true },
           });
    
           if (existingConversation) {


            const lastMessage = existingConversation.messages[existingConversation.messages.length - 1];

            if (lastMessage) {
                await prisma.message.update({
                    where:{
                        id:lastMessage.id
                    },
                    data:{
                       seenIds:{
                        push:senderId
                       } 
                    }
                })
            }

            pusher.trigger(existingConversation.id, 'new-message', {
                messages:[lastMessage]
            })

            revalidatePath(`/list/chats/${existingConversation.id}`)
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



export const seenConversation = async (currentUserId:string, conversationId:string) => {
    try {
        const conversation = await prisma.chatRoom.findUnique({
            where:{id:conversationId},
            include:{messages:true}
        })

        if(!conversation){
            return {
                success:false,
                data:null
            }
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1];
        await prisma.message.update({
            where:{
                id:lastMessage.id
            },
            data:{
               seenIds:{
                push:currentUserId
               }
            }
        })

       await pusher.trigger(conversationId, 'update-message', {
            messages:[lastMessage]
        })
        
        return {
            success:true,
            data:conversation
        }

}catch(error) {
    console.log(error)
    return {
        success:false,
        data:null
    }
}
}