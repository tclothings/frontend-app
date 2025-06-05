import { uploadToS3 } from "app/lib/configs/s3Client";
import React, { useState } from "react";
import Button from "./button";

interface VideoItem {
  file: File;
  previewUrl: string;
  s3Url?: string;
  uploaded: boolean;
  altText?: string;
}

interface IMedia {
  mediaType: "video";
  url: string;
  altText?: string;
}

export default function VideoUpload({
  onSave,
}: {
  onSave: (videos: IMedia[]) => void;
}) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newVideos = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploaded: false,
    }));
    setVideos((prev) => [...prev, ...newVideos]);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const updatedVideos = [...videos];
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      if (!video.uploaded) {
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
        altText: v.altText || v.file.name,
      }));
    onSave(mediaItems);
    setIsUploading(false);
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={handleVideoChange}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {videos.map((video, idx) => (
          <div key={idx} className="relative border p-2 rounded">
            <video
              src={video.previewUrl || video.s3Url}
              controls
              className="w-full h-auto"
            />
            <button
              onClick={() => removeVideo(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              Remove
            </button>
            {video.uploaded && (
              <span className="absolute bottom-1 right-1 text-green-600 text-xs">
                Uploaded
              </span>
            )}
          </div>
        ))}
      </div>

      <Button
        text={isUploading ? "Uploading…" : "Save Videos"}
        disabled={isUploading || videos.length === 0}
        onClick={handleUpload}
        className="mt-4"
      />
 
    </div>
  );
}
