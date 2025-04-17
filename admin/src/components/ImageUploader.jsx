import React, { useRef, useState } from "react";
import {assets} from "../assets/assets"

const ImageUploaderGrid = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const fileInputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleClick = (index) => {
    fileInputRefs[index].current.click();
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[index] = url;
      setImages(newImages);
    }
  };

  const handleRemove = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    // Optional: also reset the file input value
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.value = "";
    }
  };

  return (
    <div className="space-y-2 w-[90%] md:w-[85%] xl:w-[40%] lg:w-[60%]">
      <h2 className="font-medium text-gray-700">Product Image</h2>
      <div className="flex items-center md:gap-4 gap-1">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-28 h-24 "
            onClick={() => handleClick(index)}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefs[index]}
              onChange={(e) => handleFileChange(index, e)}
              className="hidden"
            />
            <img
              src={image || assets.upload_area}
              alt={`Upload ${index + 1}`}
              className={`object-contain max-h-full max-w-full ${
                image ? "rounded" : "opacity-80 cursor-pointer"
              }`}
            />
            {image && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering upload on click
                  handleRemove(index);
                }}
                className="absolute top-1 right-1 bg-white text-gray-600 border border-gray-300 rounded-full w-5 h-5 text-xs flex items-center justify-center hover:text-red-500 hover:border-red-300"
                title="Remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploaderGrid;
