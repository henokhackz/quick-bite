
'use server'
import cloudinary from "../cloudinary"


export async function uploadImage({image}:{image:File}) {  

    
    try {
        const result = await cloudinary.uploader.upload(image, {
            resource_type: 'image',
            folder: 'user_images',
            use_filename: true
        })
    
        return {data:result,
            success: true
        }
        
    } catch (error) {
        console.log(error)
        return {data:null,
            success: false,
            message: "Error uploading image"

        }
        
    }
    
}

