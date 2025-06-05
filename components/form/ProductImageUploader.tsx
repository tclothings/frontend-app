import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { uploadToS3 } from "app/lib/configs/s3Client";
import { resizeImageToSquare } from "app/lib/utils";
import React, { useState } from "react";
import Button from "./button";

interface IMedia {
  mediaType: "image";
  url: string;
  altText: string;
}

export default function ProductImageUploader() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const resized = await resizeImageToSquare(file);
    setImages((prev) => [...prev, resized]);
    setPreviewUrls((prev) => [...prev, URL.createObjectURL(resized)]);
    setMainImageIndex(images.length); // newly added is main
  };

  const handleReplace = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const resized = await resizeImageToSquare(file);
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    const newUploads = [...uploadedUrls];

    newImages[index] = resized;
    newPreviews[index] = URL.createObjectURL(resized);
    newUploads[index] = ""; // reset uploaded URL

    setImages(newImages);
    setPreviewUrls(newPreviews);
    setUploadedUrls(newUploads);
  };

  const handleDelete = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    const newUploads = [...uploadedUrls];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    newUploads.splice(index, 1);

    setImages(newImages);
    setPreviewUrls(newPreviews);
    setUploadedUrls(newUploads);

    if (mainImageIndex === index) setMainImageIndex(0);
    else if (mainImageIndex > index) setMainImageIndex(mainImageIndex - 1);
  };

  const handleSave = async () => {
    setIsUploading(true);

    const mediaArray: IMedia[] = [];

    const newUploadedUrls = [...uploadedUrls];

    for (let i = 0; i < images.length; i++) {
      if (uploadedUrls[i]) {
        // already uploaded
        mediaArray.push({
          mediaType: "image",
          url: uploadedUrls[i],
          altText: `Product image ${i + 1}`,
        });
        continue;
      }

      const file = images[i];
      const s3Url = await uploadToS3(file, "product-images");

      newUploadedUrls[i] = s3Url;
      mediaArray.push({
        mediaType: "image",
        url: s3Url,
        altText: `Product image ${i + 1}`,
      });
    }

    setUploadedUrls(newUploadedUrls);
    setIsUploading(false);

    // Submit mediaArray to your backend or form state
    console.log("Final media array:", mediaArray);
    // setValue("media", mediaArray); // if using RHF
  };

  return (
    <div className="space-y-4">
      {/* Main image uploader */}
      <label className="block w-full h-64 bg-gray-100 border border-dashed flex justify-center items-center cursor-pointer">
        <input type="file" accept="image/*" onChange={handleAddImage} hidden />
        {previewUrls[mainImageIndex] ? (
          <img
            src={previewUrls[mainImageIndex]}
            alt="Main"
            className="h-full object-contain"
          />
        ) : (
          <span className="text-gray-400">Click to upload</span>
        )}
      </label>

      {/* Thumbnails */}
      <div className="flex gap-3 flex-wrap">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              onClick={() => setMainImageIndex(index)}
              className={`w-24 h-24 object-cover rounded border ${
                mainImageIndex === index ? "border-blue-500" : "border-gray-300"
              } cursor-pointer`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex justify-center gap-2">
              {/* Replace */}
              <label className="px-1 py-0.5 cursor-pointer">
                <PencilSquareIcon
                  width={20}
                  className="text-[var(--blue-600)]"
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleReplace(e, index)}
                />
              </label>
              {/* Delete */}
              <Button
                icon={<TrashIcon width={20} className="text-[var(--red)]" />}
                onClick={() => handleDelete(index)}
                className="px-1 py-0.5"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Save Images"}
      </button>
    </div>
  );
}

// import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
// import { uploadToS3 } from "app/lib/configs/s3Client";
// import { resizeImageToSquare } from "app/lib/utils";
// import React, { useState } from "react";
// import Button from "./button";

// interface IMedia {
//   mediaType: "image";
//   url: string;
//   altText: string;
// }

// export default function ProductImageUploader() {
// //   const { setValue } = useFormContext();
//   const [images, setImages] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const [mainImageIndex, setMainImageIndex] = useState(0);

//   const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const resized = await resizeImageToSquare(file);
//     setImages((prev) => [...prev, resized]);
//     setPreviewUrls((prev) => [...prev, URL.createObjectURL(resized)]);
//     setMainImageIndex(images.length); // newly added is main
//   };

//   const handleReplace = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const resized = await resizeImageToSquare(file);
//     const newImages = [...images];
//     const newPreviews = [...previewUrls];

//     newImages[index] = resized;
//     newPreviews[index] = URL.createObjectURL(resized);

//     setImages(newImages);
//     setPreviewUrls(newPreviews);
//   };

//   const handleDelete = (index: number) => {
//     const newImages = [...images];
//     const newPreviews = [...previewUrls];

//     newImages.splice(index, 1);
//     newPreviews.splice(index, 1);

//     setImages(newImages);
//     setPreviewUrls(newPreviews);

//     if (mainImageIndex === index) setMainImageIndex(0);
//     else if (mainImageIndex > index) setMainImageIndex(mainImageIndex - 1);
//   };

//   const handleSave = async () => {
//     const mediaArray: IMedia[] = [];

//     for (let i = 0; i < images.length; i++) {
//       const file = images[i];
//       const s3Url = await uploadToS3(file, "product-images"); // your folder

//       mediaArray.push({
//         mediaType: "image",
//         url: s3Url,
//         altText: `Product image ${i + 1}`,
//       });
//     }

//     // setValue("media", mediaArray);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Main image uploader */}
//       <label className="block w-full h-64 bg-gray-100 border border-dashed flex justify-center items-center cursor-pointer">
//         <input type="file" accept="image/*" onChange={handleAddImage} hidden />
//         {previewUrls[mainImageIndex] ? (
//           <img
//             src={previewUrls[mainImageIndex]}
//             alt="Main"
//             className="h-full object-contain"
//           />
//         ) : (
//           <span className="text-gray-400">Click to upload</span>
//         )}
//       </label>

//       {/* Thumbnails */}
//       <div className="flex gap-3 flex-wrap">
//         {previewUrls.map((url, index) => (
//           <div key={index} className="relative group">
//             <img
//               src={url}
//               onClick={() => setMainImageIndex(index)}
//               className={`w-24 h-24 object-cover rounded border ${
//                 mainImageIndex === index ? "border-blue-500" : "border-gray-300"
//               } cursor-pointer`}
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex justify-center gap-2">
//               {/* Replace */}
//               <label className="px-1 py-0.5 cursor-pointer">
//                 <PencilSquareIcon
//                   width={20}
//                   className="text-[var(--blue-600)]"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   onChange={(e) => handleReplace(e, index)}
//                 />
//               </label>
//               {/* Delete */}
//               <Button
//                 icon={<TrashIcon width={20} className="text-[var(--red)]" />}
//                 onClick={() => handleDelete(index)}
//                 className=" px-1 py-0.5"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         type="button"
//         onClick={handleSave}
//         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Save Images
//       </button>
//     </div>
//   );
// }
