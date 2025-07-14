"use client";
import { Download, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

type ImageUploadProps = {
  onFileChange: Dispatch<SetStateAction<File[] | null>>;
  currentImage?: string;
};

export const ImageUpload = ({
  onFileChange,
  currentImage,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const previewUrl = URL.createObjectURL(files[0]);
      setPreview(previewUrl);
      onFileChange(Array.from(files));
    }
  };

  const handleRemoveClick = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    onFileChange(null);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative w-full h-full aspect-[9/6] tablet:aspect-[9/3] border-0 overflow-clip flex items-center justify-center">
          <Image
            src={preview}
            alt="Image preview"
            className="object-cover"
            fill
          />
          <Button
            type="button"
            onClick={handleRemoveClick}
            className="z-10 absolute top-2 right-2 !p-1.5 bg-gray-400 w-fit h-7 text-white rounded-full hover:bg-red-600 active:bg-red-400"
          >
            <X />
          </Button>
        </div>
      ) : (
        <div className="relative gap-3 flex flex-col w-full h-full aspect-[9/6] tablet:aspect-[9/3] border p-5 text-center items-center justify-center">
          <Download className="size-20 text-gray-400" />
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition duration-300 ease-in-out"
          >
            Upload Image
          </label>
          <p className="text-sm text-gray-400">Only images are allowed</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
