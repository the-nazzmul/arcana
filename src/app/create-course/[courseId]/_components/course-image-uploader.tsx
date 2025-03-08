"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { EditIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface CourseImageUploaderProps {
  courseId: string;
  initialImageUrl: string | null;
}

export default function CourseImageUploader({
  courseId,
  initialImageUrl,
}: CourseImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState(
    initialImageUrl || "/course-image-placeholder.png"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      const file = res?.[0];
      if (file) {
        const newImageUrl = file.ufsUrl;
        try {
          const response = await fetch(`/api/update-course`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ courseImageUrl: newImageUrl, courseId }),
          });
          if (response.ok) {
            setImageUrl(newImageUrl);
            setIsProcessing(false);
          } else {
            console.error("Failed to update course image");
          }
        } catch (error) {
          console.error("Error updating course image:", error);
        }
      }
      setIsProcessing(false);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      setIsProcessing(false);
    },
  });

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      await startUpload([file]);
    }
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden group">
      <Image
        src={imageUrl}
        alt="course image"
        width={400}
        height={300}
        className="object-cover w-full h-full aspect-video"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleEditClick} className="text-white">
          <EditIcon className="size-8" />
        </button>
      </div>
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white">
            <Loader2Icon className="animate-spin size-10" />
          </p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
