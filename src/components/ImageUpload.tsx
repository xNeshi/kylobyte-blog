"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: Dispatch<SetStateAction<File[] | null>>;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const previewUrl = URL.createObjectURL(files[0]);
      setPreview(previewUrl);
      onFileChange(Array.from(files));
    } else {
      setPreview(null);
      onFileChange(null);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative w-full h-full aspect-[9/3] border-1 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105">
          <Image
            src={preview}
            alt="Image preview"
            className="object-cover"
            fill
          />
        </div>
      ) : (
        <div className="w-full h-full aspect-[9/3] border-1 p-5 text-center flex items-center justify-center">
          <p className="text-gray-500 text-sm">
            No image selected. Please upload an image.
          </p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
        file:mr-4 file:py-1 file:px-4
        file:rounded-full 
        file:text-sm file:font-semibold
        file:border-1
        file:bg-background file:text-foreground
        file:hover:bg-[var(--hover-bg)] file:active:bg-[var(--active-bg)]
        file:hover:scale-95 file:transition-transform file:duration-300 file:ease-in-out"
      />
    </div>
  );
};

export default ImageUpload;
