import { CheckIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { uploadToS3 } from "app/lib/configs/s3Client";
import { resizeImageToSquare } from "app/lib/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "./button";
import clsx from "clsx";
import { toast } from "sonner";
import {
  ImageItem,
  VideoItem,
} from "app/features/admin/productManagement/products/addEditProduct";
import Image from "next/image";

interface IMedia {
  mediaType: "image";
  url: string;
  altText: string;
}

export interface VideoUploadProps {
  onSave: (newMedia: IMedia[]) => void;
  imageItems: VideoItem[];
  setImageItems: Dispatch<SetStateAction<VideoItem[]>>;
  onRemove?: (urlToRemove: string) => void; // updated type
}

export default function ProductImageUploader({
  onSave,
  imageItems,
  setImageItems,
  onRemove,
}: VideoUploadProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const acceptedMIMETypes = ["image/jpeg", "image/png", "image/webp"];
  const MAX_IMAGE_SIZE_MB = 3;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!acceptedMIMETypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, and WebP image formats are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error(
        `Image "${file.name}" exceeds the ${MAX_IMAGE_SIZE_MB}MB limit.`
      );
      e.target.value = "";
      return;
    }

    try {
      const resizedFile = await resizeImageToSquare(file);
      const newImageItem: ImageItem = {
        file: resizedFile,
        previewUrl: URL.createObjectURL(resizedFile),
        uploaded: false,
        altText: file.name,
      };

      setImageItems((prev) => [...prev, newImageItem]);
      setMainImageIndex(imageItems.length);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try another file.");
    }
    e.target.value = "";
  };

  const handleReplace = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!acceptedMIMETypes.includes(file.type)) {
      toast.error(
        "Only JPEG, PNG, and WebP image formats are allowed for replacement."
      );
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error(
        `Replacement image "${file.name}" exceeds the ${MAX_IMAGE_SIZE_MB}MB limit.`
      );
      e.target.value = "";
      return;
    }

    try {
      const resizedFile = await resizeImageToSquare(file);
      setImageItems((prev) => {
        const newItems = [...prev];
        const oldPreviewUrl = newItems[index].previewUrl;
        if (oldPreviewUrl) URL.revokeObjectURL(oldPreviewUrl);

        newItems[index] = {
          ...newItems[index],
          file: resizedFile,
          previewUrl: URL.createObjectURL(resizedFile),
          s3Url: undefined,
          uploaded: false,
        };
        return newItems;
      });
    } catch (error) {
      console.error("Error processing replacement image:", error);
      toast.error(
        "Failed to process replacement image. Please try another file."
      );
    }
    e.target.value = "";
  };

  const handleDelete = (index: number) => {
    setImageItems((prev) => {
      const newItems = prev.filter((_, i) => i !== index);
      const itemToDelete = prev[index];
      if (itemToDelete?.previewUrl)
        URL.revokeObjectURL(itemToDelete.previewUrl);

      if (mainImageIndex === index) {
        setMainImageIndex(0);
      } else if (mainImageIndex > index) {
        setMainImageIndex((prevIndex) => prevIndex - 1);
      }

      // Call onRemove with the item's preview or s3 URL
      const urlToRemove = itemToDelete?.s3Url || itemToDelete?.previewUrl;
      if (urlToRemove && onRemove) onRemove(urlToRemove);

      return newItems;
    });
  };

  const handleSave = async () => {
    setIsUploading(true);
    let allUploadsSuccessful = true;
    const updatedImageItems = [...imageItems];

    for (let i = 0; i < updatedImageItems.length; i++) {
      const imageItem = updatedImageItems[i];
      if (!imageItem.uploaded && imageItem.file) {
        try {
          const s3Url = await uploadToS3(imageItem.file, "product");
          updatedImageItems[i] = {
            ...imageItem,
            s3Url,
            uploaded: true,
          };
          toast.success(`"${imageItem.file.name}" uploaded successfully!`);
        } catch (err) {
          console.error("Upload failed for", imageItem.file.name, err);
          toast.error(`Failed to upload "${imageItem.file.name}".`);
          allUploadsSuccessful = false;
        }
      }
    }

    setImageItems(updatedImageItems);

    const mediaArray: IMedia[] = updatedImageItems
      .filter((item) => item.uploaded && item.s3Url)
      .map((item) => ({
        mediaType: "image",
        url: item.s3Url!,
        altText: item.altText || `Product image`,
      }));

    onSave(mediaArray);

    if (!allUploadsSuccessful) {
      toast.warning(
        "Some images failed to upload. Please check the console for details."
      );
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">Images</h2>
      <label className="relative block w-full h-64 border border-dashed border-[var(--brand-blue)] flex justify-center items-center cursor-pointer">
        <input
          type="file"
          accept={acceptedMIMETypes.join(",")}
          onChange={handleAddImage}
          hidden
        />
        {imageItems[mainImageIndex]?.previewUrl ? (
          <Image
            height={300}
            width={300}
            src={imageItems[mainImageIndex].previewUrl}
            alt={imageItems[mainImageIndex].altText || ""}
            className="h-full object-contain"
          />
        ) : (
          <span className="text-gray-400">Click to select image</span>
        )}
        <div
          className={clsx(
            "absolute inset-0 bg-[var(--background)/80] backdrop-blur-md w-full h-full flex items-center justify-center text-[var(--brand-blue)] font-medium transition-opacity",
            { "opacity-0 hover:opacity-100": imageItems.length > 0 },
            { "opacity-100": imageItems.length === 0 }
          )}
        >
          Click to add images
        </div>
      </label>

      <div className="flex gap-3 flex-wrap">
        {imageItems.map((item, index) => (
          <div
            key={item.s3Url || item.previewUrl || index}
            className="relative group"
          >
            <Image
              height={300}
              width={300}
              src={item.previewUrl}
              alt={item.altText || ""}
              onClick={() => setMainImageIndex(index)}
              className={clsx(
                "object-cover rounded border cursor-pointer",
                mainImageIndex === index ? "border-blue-500" : "border-gray-300"
              )}
            />
            <div className="absolute z-40 top-0 left-0">
              <Button
                icon={
                  <XMarkIcon className="mx-[1px] h-2 w-2 text-white dark:text-black" />
                }
                onClick={() => handleDelete(index)}
                className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500 hover:cursor-pointer"
              />
            </div>
            <div className="absolute inset-0 bg-[var(--background)/80] opacity-0 group-hover:opacity-100 backdrop-blur-sm flex justify-center items-center gap-2 rounded">
              <label className="px-1 py-0.5 cursor-pointer">
                <PencilSquareIcon
                  width={20}
                  className="text-[var(--blue-600)]"
                />
                <input
                  type="file"
                  accept={acceptedMIMETypes.join(",")}
                  hidden
                  onChange={(e) => handleReplace(e, index)}
                />
              </label>
            </div>
            {item.uploaded && (
              <span className="absolute bottom-1 right-1 text-green-600 text-xs bg-white px-1 rounded-sm">
                Uploaded 
              </span>
            )}
            <input
              type="text"
              placeholder="Alt text"
              value={item.altText}
              onChange={(e) => {
                const newAltText = e.target.value;
                setImageItems((prev) =>
                  prev.map((v, i) =>
                    i === index ? { ...v, altText: newAltText } : v
                  )
                );
              }}
              className="mt-1 w-full p-0.5 text-xs border rounded"
            />
          </div>
        ))}
      </div>

      <Button
        disabled={
          !imageItems.length ||
          isUploading ||
          !imageItems.some((item) => !item.uploaded)
        }
        onClick={handleSave}
        isLoading={isUploading}
        text={isUploading ? "Uploading..." : "Upload Images"}
        type="button"
        className="border bg-white dark:bg-[var(--background)] border-[var(--brand-blue)] !text-[var(--brand-blue)] dark:text-white disabled:opacity-50 rounded-lg"
      />
    </div>
  );
}
