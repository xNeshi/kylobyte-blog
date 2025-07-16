"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type PostImageHandler = {
  imageUrl: string;
  title: string;
};

const PostImageHandler = ({ imageUrl, title }: PostImageHandler) => {
  const [image, setImage] = useState(imageUrl);
  const [reveal, setReveal] = useState(false);
  const loader = reveal ? "none" : "inline-block";

  return (
    <>
      <Image
        src={image}
        onError={() => {
          setReveal(true);
          setImage((prev) => (prev = "/images/placeholder-image.jpg"));
        }}
        onLoadingComplete={() => {
          setReveal(true);
        }}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <span
        className="flex items-center justify-center bg-background w-full h-full absolute inset-0"
        style={{
          display: loader,
        }}
      >
        <Loader2 className="w-15 h-15 animate-spin text-gray-500" />
      </span>
    </>
  );
};

export default PostImageHandler;
