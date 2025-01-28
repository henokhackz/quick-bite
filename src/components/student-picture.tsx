'use client'
import React, { useEffect, useState } from 'react'
import { WebcamCapture } from './webcam-capture'
import { uploadImage } from '@/lib/actions/image.action'

interface ImageProps {
  photos: {
    photo1?: string
    photo2?: string
  }
}

const StudentPicture = () => {
  const [pictures, setPictures] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<ImageProps>({ photos: {} })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const uploadPictures = async () => {
      if (pictures.length > 0) {
        setLoading(true)
        setError(null) 

        try {
          // Iterate through the pictures and upload each one
          const newPhotos: { [key: string]: string } = {}

          for (let i = 0; i < pictures.length; i++) {
            const picture = pictures[i]
            const { data, success, message } = await uploadImage({ image: picture })

            if (success && data?.secure_url) {
              newPhotos[`photo${i + 1}`] = data.secure_url
            } else {
              throw new Error(message || 'Failed to upload image')
            }
          }

          // Update the imageUrls state with the new uploaded photos
          setImageUrls((prevState) => ({
            photos: {
              ...prevState.photos,
              ...newPhotos
            }
          }))
        } catch (err: any) {
          // Handle errors and show an error message to the user
          setError(err.message || 'An error occurred while uploading the image.')
        } finally {
          setLoading(false)
        }
      }
    }

    uploadPictures()
  }, [pictures])

  return (
    <div className='h-[250px] w-full flex flex-col bg-cardBackground p-5'>
      <div className='flex w-full items-center justify-center gap-4'>
        {/* First picture */}
        <div className='h-full w-1/2 rounded-xl overflow-hidden mr-4'>
          {imageUrls.photos.photo1 ? (
            <img
              src={imageUrls.photos.photo1}
              alt="First Picture"
              className='h-full w-full object-cover'
              height={200}
              width={200}
            />
          ) : (
            <div className='h-[200px] w-[200px]'>
              <WebcamCapture pictures={pictures} setPictures={setPictures} />
            </div>
          )}
        </div>

        {/* Second picture */}
        <div className='h-full w-1/2 rounded-xl overflow-hidden'>
          {imageUrls.photos.photo2 ? (
            <img
              src={imageUrls.photos.photo2}
              alt="Second Picture"
              className='h-full w-full object-cover'
              height={200}
              width={200}
            />
          ) : (
            <div className='h-[200px] w-[200px]'>
              <WebcamCapture pictures={pictures} setPictures={setPictures} />
            </div>
          )}
        </div>
      </div>

      {loading && <p>Uploading pictures...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default StudentPicture
