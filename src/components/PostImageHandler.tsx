"use client";

import Image from "next/image";
import { useState } from "react";

type PostImageHandler = {
  imageUrl: string;
  title: string;
};

const PostImageHandler = ({ imageUrl, title }: PostImageHandler) => {
  const [image, setImage] = useState(imageUrl);
  return (
    <Image
      src={image}
      onError={() =>
        setImage((prev) => (prev = "/images/placeholder-image.jpg"))
      }
      alt={title}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default PostImageHandler;
