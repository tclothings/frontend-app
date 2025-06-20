import { uploadToS3 } from "app/lib/configs/s3Client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "./button";
import { IMedia } from "app/lib/types";
import { TrashIcon } from "@heroicons/react/24/outline";
import SubmitButton from "./submitButton";
import { toast } from "sonner";
import { VideoItem } from "app/features/admin/productManagement/products/addEditProduct";



// interface IMedia {
//   mediaType: string
//   url: string;
//   altText?: string;
// }

export interface VideoUploadProps {
  onSave: (newMedia: IMedia[]) => void;
  videos: VideoItem[];
  setVideos: Dispatch<SetStateAction<VideoItem[]>>;
}

 
export default function VideoUpload({ onSave, videos, setVideos }: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_VIDEO_SIZE_MB = 5;
    const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

    const files = Array.from(e.target.files || []);
    const newVideos: VideoItem[] = [];
    let hasInvalidFile = false;

    for (const file of files) {
      if (file.size > MAX_VIDEO_SIZE_BYTES) {
        toast.error(
          `Video "${file.name}" exceeds the ${MAX_VIDEO_SIZE_MB}MB limit.`
        );
        hasInvalidFile = true;
        continue;
      }

      newVideos.push({
        file,
        previewUrl: URL.createObjectURL(file),
        uploaded: false, // Initially not uploaded
      });
    }
    if (hasInvalidFile) {
      e.target.value = "";
    }
    setVideos((prev) => [...prev, ...newVideos]);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const updatedVideos = [...videos];
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      if (!video.uploaded && video.file) {
        try {
          const s3Url = await uploadToS3(video.file, "product-videos");
          updatedVideos[i] = {
            ...video,
            s3Url,
            uploaded: true,
          };
        } catch (err) {
          console.error("Upload failed for", video.file.name);
        }
      }
    }
    setVideos(updatedVideos);
    const mediaItems: IMedia[] = updatedVideos
      .filter((v) => v.uploaded && v.s3Url)
      .map((v) => ({
        mediaType: "video",
        url: v.s3Url!,
        altText: v.altText || v.file?.name!,
      }));
    onSave(mediaItems);
    setIsUploading(false);
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <h2 className="mb-3 font-semibold text-lg">Videos</h2>
      <div className=" border border-dashed border-[var(--brand-blue)] space-y-4 p-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative border p-2 rounded flex justify-center items-center">
            <input
              placeholder="Click to select videos"
              className="w-[200px] hover:cursor-pointer"
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoChange}
            />
          </div>
          {videos.map((video, idx) => (
            <div key={idx} className="relative border p-2 rounded">
              <video
                src={video.previewUrl || video.s3Url}
                controls
                className="w-full h-auto"
              />
              <Button
                icon={<TrashIcon width={20} className="text-[var(--red)]" />}
                onClick={() => removeVideo(idx)}
                className="absolute top-1 right-1 px-2 py-1 text-xs rounded"
              />
              {/* <button
              onClick={() => removeVideo(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              Remove
            </button> */}
              {video.uploaded && (
                <span className="absolute bottom-1 right-1 text-green-600 text-xs">
                  Uploaded
                </span>
              )}
            </div>
          ))}
        </div>
        <SubmitButton
          isSmallBtn
          disabled={isUploading || videos.length === 0}
          handleSubmit={handleUpload}
          isLoading={isUploading}
          name="Upload Videos"
          type="button"
          className="border bg-white dark:bg-[var(--background)] border-[var(--brand-blue)] !text-[var(--brand-blue)] dark:text-white disabled:opacity-50"
        />
        {/* <Button
        text={isUploading ? "Uploading…" : "Save Videos"}
        disabled={isUploading || videos.length === 0}
        onClick={handleUpload}
        className="mt-4"
      /> */}
      </div>
    </>
  );
}
