import React from "react";
import Image from "next/image";
import { convertToBase64 } from "@/lib/utils";

interface ImageUploadProps {
  errors: any;
  setValue: (field: any, value: any) => void;
  photoPreview: File | null | string;
  setPhotoPreview: React.Dispatch<React.SetStateAction<File | null | string>>;
  type: "photo1" | "photo2";
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  errors,
  setValue,
  photoPreview,
  setPhotoPreview,
  type,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-2">
        <label
          htmlFor={type}
          className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
        >
          <Image src="/upload.png" alt="Upload" width={28} height={28} />
          {photoPreview && (
            <Image
              src={
                photoPreview instanceof File
                  ? URL.createObjectURL(photoPreview)
                  : photoPreview
              }
              alt={`${type} preview`}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
          )}
        </label>
        <input
          type="file"
          id={type}
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const base64 = await convertToBase64(file);
              setValue(type, base64);
              setPhotoPreview(file);
            }
          }}
        />
        {errors[type]?.message && (
          <p className="text-xs text-red-500">{errors[type].message}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
