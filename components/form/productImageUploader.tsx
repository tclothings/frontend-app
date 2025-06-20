import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { uploadToS3 } from "app/lib/configs/s3Client";
import { resizeImageToSquare } from "app/lib/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "./button";
import clsx from "clsx";
import { toast } from "sonner"; // Assuming you have sonner for toasts
import { ImageItem, VideoItem } from "app/features/admin/productManagement/products/addEditProduct";
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
}
export default function ProductImageUploader({ onSave, imageItems, setImageItems }: VideoUploadProps) {
  // Use a single state to manage all image items
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Define accepted MIME types and size limit
  const acceptedMIMETypes = ["image/jpeg", "image/png", "image/webp"];
  const MAX_IMAGE_SIZE_MB = 3;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File type validation
    if (!acceptedMIMETypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, and WebP image formats are allowed.");
      e.target.value = ""; // Clear input
      return;
    }

    // File size validation
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error(
        `Image "${file.name}" exceeds the ${MAX_IMAGE_SIZE_MB}MB limit.`
      );
      e.target.value = ""; // Clear input
      return;
    }

    try {
      const resizedFile = await resizeImageToSquare(file);
      const newImageItem: ImageItem = {
        // id: URL.createObjectURL(resizedFile), // Use object URL as temp ID for key
        file: resizedFile,
        previewUrl: URL.createObjectURL(resizedFile),
        uploaded: false, // Initially not uploaded
        altText: file.name, // Default alt text
      };

      setImageItems((prev) => [...prev, newImageItem]);
      // Set the newly added image as main if it's the first one, or if you want it to be the new main
      setMainImageIndex(imageItems.length); // Sets the newly added image as the main image
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try another file.");
    }
    e.target.value = ""; // Clear input after processing
  };

  const handleReplace = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File type validation for replacement
    if (!acceptedMIMETypes.includes(file.type)) {
      toast.error(
        "Only JPEG, PNG, and WebP image formats are allowed for replacement."
      );
      e.target.value = "";
      return;
    }

    // File size validation for replacement
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
        const oldPreviewUrl = newItems[index].previewUrl; // Get old URL to revoke
        if (oldPreviewUrl) {
          URL.revokeObjectURL(oldPreviewUrl); // Revoke old object URL
        }

        newItems[index] = {
          ...newItems[index], // Keep existing altText, s3Url if any
          // id: URL.createObjectURL(resizedFile), // Update ID as new previewUrl is created
          file: resizedFile,
          previewUrl: URL.createObjectURL(resizedFile),
          s3Url: undefined, // Reset S3 URL for re-upload
          uploaded: false, // Mark as not uploaded
        };
        return newItems;
      });
    } catch (error) {
      console.error("Error processing replacement image:", error);
      toast.error(
        "Failed to process replacement image. Please try another file."
      );
    }
    e.target.value = ""; // Clear input
  };

  const handleDelete = (index: number) => {
    setImageItems((prev) => {
      const newItems = prev.filter((_, i) => i !== index);
      // Revoke the object URL for the deleted item to prevent memory leaks
      const itemToDelete = prev[index];
      if (itemToDelete && itemToDelete.previewUrl) {
        URL.revokeObjectURL(itemToDelete.previewUrl);
      }

      // Adjust main image index if the main image is deleted or indices shift
      if (mainImageIndex === index) {
        setMainImageIndex(0); // Default to the first image
      } else if (mainImageIndex > index) {
        setMainImageIndex((prevIndex) => prevIndex - 1);
      }
      return newItems;
    });
  };

  const handleSave = async () => {
    setIsUploading(true);
    let allUploadsSuccessful = true; // Flag to track overall success

    const updatedImageItems = [...imageItems]; // Create a mutable copy

    for (let i = 0; i < updatedImageItems.length; i++) {
      const imageItem = updatedImageItems[i];

      // Only upload if the image is not already marked as uploaded
      if (!imageItem.uploaded && imageItem.file) {
        try {
          const s3Url = await uploadToS3(imageItem.file, "product-images");
          updatedImageItems[i] = {
            ...imageItem,
            s3Url,
            uploaded: true, // Mark as uploaded
          };
          toast.success(`"${imageItem.file.name}" uploaded successfully!`);
        } catch (err) {
          console.error("Upload failed for", imageItem.file.name, err);
          toast.error(`Failed to upload "${imageItem.file.name}".`);
          allUploadsSuccessful = false;
        }
      }
    }

    // Update the state with the new upload statuses and S3 URLs
    setImageItems(updatedImageItems);

    // Prepare the final IMedia array for the onSave callback
    const mediaArray: IMedia[] = updatedImageItems
      .filter((item) => item.uploaded && item.s3Url) // Only include successfully uploaded images
      .map((item) => ({
        mediaType: "image",
        url: item.s3Url!, // Non-null assertion because filtered for `item.s3Url`
        altText: item.altText || `Product image`, // Fallback for alt text
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
          accept={acceptedMIMETypes.join(",")} // Use the defined MIME types
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
        {/* Adjusted for mobile and clarity */}
        <div
          className={clsx(
            "absolute inset-0 bg-[var(--background)/80] backdrop-blur-md w-full h-full flex items-center justify-center text-[var(--brand-blue)] font-medium transition-opacity",
            { "opacity-0 hover:opacity-100": imageItems.length > 0 }, // Only show on hover if images are present
            { "opacity-100": imageItems.length === 0 } // Always visible if no images are selected
          )}
        >
          Click to add images
        </div>
      </label>

      {/* Thumbnails */}
      <div className="flex gap-3 flex-wrap">
        {imageItems.map((item, index) => (
          // Use item.id for a stable key if possible. If not, index is fallback.
          <div key={item.s3Url || index} className="relative group">
            <Image
              height={300}
              width={300}
              src={item.previewUrl}
              alt={item.altText || ""}
              onClick={() => setMainImageIndex(index)}
              className={clsx(
                `w-24 h-24 object-cover rounded border cursor-pointer`,
                mainImageIndex === index ? "border-blue-500" : "border-gray-300"
              )}
            />
            {/* Overlay for replace/delete */}
            <div className="absolute inset-0 bg-[var(--background)/80] opacity-0 group-hover:opacity-100 backdrop-blur-sm flex justify-center items-center gap-2 rounded">
              {/* Replace */}
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
              {/* Delete */}
              <Button
                icon={<TrashIcon width={20} className="text-[var(--red)]" />}
                onClick={() => handleDelete(index)}
                className="px-1 py-0.5"
              />
            </div>
            {/* Uploaded status indicator */}
            {item.uploaded && (
              <span className="absolute bottom-1 right-1 text-green-600 text-xs bg-white px-1 rounded-sm">
                Uploaded
              </span>
            )}
            {/* Optional: Add alt text input for each thumbnail */}
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
        // Disable if no images, currently uploading, or if there are unprocessed images (not uploaded and not failed)
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
