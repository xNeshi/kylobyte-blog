"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

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
        <div className="relative w-full h-full aspect-[9/3] shadow-2xl border-0 rounded-2xl overflow-clip flex items-center justify-center">
          <Image
            src={preview}
            alt="Image preview"
            className="object-cover"
            fill
          />{" "}
          <Button
            type="button"
            onChange={(e) => {
              e.preventDefault();
              setPreview(null);
              onFileChange(null);
            }}
            className="z-10 absolute top-2 right-2 !p-1.5 bg-gray-400 w-full h-7 tablet:w-fit text-white rounded-full hover:bg-red-600 active:bg-red-400"
          >
            <X />
          </Button>
        </div>
      ) : (
        <div className="relative flex flex-col w-full h-full aspect-[9/3] border-1 rounded-2xl p-5 text-center items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-gray-500
        file:mr-4 file:py-1 file:px-4
        file:rounded-full 
        file:text-sm file:font-semibold
        file:border-1
        file:bg-background file:text-foreground
        file:hover:bg-[var(--hover-bg)] file:active:bg-[var(--active-bg)]
        file:hover:scale-95 file:transition-transform file:duration-300 file:ease-in-out"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
