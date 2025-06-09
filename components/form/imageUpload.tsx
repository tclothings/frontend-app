"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { UseFormReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import Modal from "../ui/modal";
import SubmitButton from "./submitButton";

interface IProps {
  name: string;
  initialValue?: string;
  methods: UseFormReturn<any>;
  placeholder?: string;
  handleFileChange: (file: File) => void;
  fileNames: { [key: string]: string } | string;
  schema?: any;
  accept?: string;
  outputSize?: number; // optional override
}

export default function ImageUpload({
  methods,
  name,
  initialValue,
  placeholder,
  handleFileChange,
  fileNames,
  schema,
  accept = "image/jpeg,image/png,image/webp",
  outputSize = 1000,
}: IProps) {
  const { errors } = methods.formState;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>();
  const [isRequired, setIsRequired] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 50, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [scale, setScale] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (schema?.fields && name) {
      const fieldSchema = schema.fields[name];
      if (fieldSchema) {
        const isRequiredField = fieldSchema
          .describe()
          .tests.some((test: any) => test.name === "required");
        setIsRequired(isRequiredField);
      }
    }
  }, [schema, name]);

  useEffect(() => {
    if (typeof fileNames === "string") {
      setFileName(fileNames);
    } else {
      if (fileNames[name]) setFileName(fileNames[name]);
    }
  }, [fileNames, name]);

  const { ref, onChange, ...fileInputProps } = methods.register(name);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files?.[0];
    const maxAllowedSize = 3 * 1024 * 1024; // 3MB

    if (file.size > maxAllowedSize) {
      alert("Image too large. Max allowed size is 3MB.");
      return;
    }

    onChange(e);
    if (file) {
      setImageFile(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const closeModal = () => {
    setImageSrc(null);
    setCompletedCrop(null);
  };

  const handleSave = async () => {
    if (!completedCrop || !canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const image = imgRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    canvas.width = outputSize;
    canvas.height = outputSize;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      outputSize,
      outputSize
    );

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `upload-${Date.now()}.webp`, {
            type: "image/webp",
          });
          handleFileChange(file);
          closeModal();
        }
      },
      "image/webp",
      0.9
    );
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const aspect = 1;
    const cropWidth = 50;

    const crop: Crop = {
      unit: "%",
      width: cropWidth,
      height: (cropWidth * height) / width,
    };

    setCrop(crop);
  };

  return (
    <>
      <div
        onClick={handleFileInputClick}
        className={`w-full mb-7 file-upload-container ${
          errors[name] ? "error" : ""
        } ${fileName ? "file-upload-container-success" : ""}`}
      >
        <label
          className={clsx("file-upload-placeholder text-gray-400", {
            filled: fileName || initialValue,
          })}
        >
          {placeholder}{" "}
          {isRequired && (fileName || initialValue) && (
            <span className="text-red">*</span>
          )}
        </label>
        <p className={clsx("text-ellipsis")}>
          {fileName ||
            (initialValue &&
              initialValue.substring(initialValue.lastIndexOf("/") + 1))}
        </p>
        <input
          type="file"
          id={name}
          className="hidden"
          onChange={handleChange}
          ref={fileInputRef}
          {...fileInputProps}
          accept={accept}
        />
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="error-message mt-[12px]">{message}</p>
          )}
        />
      </div>

      <Modal title="Crop Image" isOpen={!!imageSrc} onClose={closeModal}>
        {imageSrc && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop={false}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={handleImageLoad}
                style={{ transform: `scale(${scale})`, maxHeight: 600 }}
              />
            </ReactCrop>

            <div className="mt-4">
              <label>Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            <div className="hidden">
              <canvas ref={canvasRef} />
            </div>

            <SubmitButton
              name="Crop and Upload"
              handleSubmit={handleSave}
              isSmallBtn
              isLoading={false}
            />
          </>
        )}
      </Modal>
    </>
  );
}

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import { UseFormReturn } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import clsx from "clsx";
// import Button from "./button";
// import Modal from "../ui/modal";
// import SubmitButton from "./submitButton";

// interface IProps {
//   name: string;
//   initialValue?: string;
//   methods: UseFormReturn<any>;
//   placeholder?: string;
//   handleFileChange: (file: File) => void;
//   fileNames: { [key: string]: string } | string;
//   schema?: any;
//   type?: string;
//   height?: number;
//   accept?: string;
// }

// export default function ImageUpload({
//   methods,
//   name,
//   initialValue,
//   placeholder,
//   handleFileChange,
//   fileNames,
//   schema,
//   type = "image/jpeg",
//   height = 600,
//   accept = "image/*",
// }: IProps) {
//   const { errors } = methods.formState;
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [fileName, setFileName] = useState<string | undefined>();
//   const [isRequired, setIsRequired] = useState(false);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [crop, setCrop] = useState<Crop>({ unit: "%", width: 50, aspect: 1 });
//   const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
//   const [scale, setScale] = useState(1);
//   const imgRef = useRef<HTMLImageElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (schema?.fields && name) {
//       const fieldSchema = schema.fields[name];
//       if (fieldSchema) {
//         const isRequiredField = fieldSchema
//           .describe()
//           .tests.some((test: any) => test.name === "required");
//         setIsRequired(isRequiredField);
//       }
//     }
//   }, [schema, name]);

//   useEffect(() => {
//     if (typeof fileNames === "string") {
//       setFileName(fileNames);
//     } else {
//       if (fileNames[name]) setFileName(fileNames[name]);
//     }
//   }, [fileNames, name]);

//   const { ref, onChange, ...fileInputProps } = methods.register(name);

//   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const file = e.target.files?.[0];
//     const maxAllowedSize = 600 * 1024;
//     if (file.size > maxAllowedSize) {
//       alert("Image too large");
//       return;
//     }

//     onChange(e);
//     if (file) {
//       console.log(file, "raw");

//       setImageFile(file);
//       setImageSrc(URL.createObjectURL(file));
//     }
//   };

//   const handleFileInputClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const closeModal = () => {
//     setImageSrc(null);
//     setCompletedCrop(null);
//   };

//   const handleSave = async () => {
//     if (!completedCrop || !canvasRef.current || !imgRef.current) return;

//     const canvas = canvasRef.current;
//     const image = imgRef.current;

//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const cropWidth = completedCrop.width * scaleX;
//     const cropHeight = completedCrop.height * scaleY;

//     canvas.width = cropWidth;
//     canvas.height = cropHeight;

//     ctx.clearRect(0, 0, cropWidth, cropHeight);
//     ctx.drawImage(
//       image,
//       completedCrop.x * scaleX,
//       completedCrop.y * scaleY,
//       cropWidth,
//       cropHeight,
//       0,
//       0,
//       cropWidth,
//       cropHeight
//     );

//     canvas.toBlob((blob) => {
//       if (blob) {
//         const file = new File([blob], "cropped-image.jpeg", { type });
//         handleFileChange(file);
//         closeModal();
//       }
//     }, type);
//   };

//   const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
//     const { width, height } = e.currentTarget;
//     const aspect = 1;
//     const cropWidth = 50;

//     const crop: Crop = {
//       unit: "%",
//       width: cropWidth,
//       height: (cropWidth * height) / width,
//       aspect,
//     };

//     setCrop(crop);
//   };

//   return (
//     <>
//       <div
//         onClick={handleFileInputClick}
//         className={`w-full mb-7 file-upload-container ${
//           errors[name] ? "error" : ""
//         } ${fileName ? "file-upload-container-success" : ""}`}
//       >
//         <label
//           className={clsx("file-upload-placeholder", {
//             filled: fileName || initialValue,
//           })}
//         >
//           {placeholder}{" "}
//           {isRequired && (fileName || initialValue) && (
//             <span className="text-red">*</span>
//           )}
//         </label>
//         <p className={clsx("text-ellipsis")}>
//           {fileName ||
//             (initialValue &&
//               initialValue.substring(initialValue.lastIndexOf("/") + 1))}
//         </p>
//         <input
//           type="file"
//           id={name}
//           className="hidden"
//           onChange={handleChange}
//           ref={fileInputRef}
//           {...fileInputProps}
//           accept={accept}
//         />
//         <ErrorMessage
//           errors={errors}
//           name={name}
//           render={({ message }) => (
//             <p className="error-message mt-[12px]">{message}</p>
//           )}
//         />
//       </div>

//       <Modal title="Crop Image" isOpen={!!imageSrc} onClose={closeModal}>
//         {imageSrc && (
//           <>
//             <ReactCrop
//               crop={crop}
//               onChange={(c) => setCrop(c)}
//               onComplete={(c) => setCompletedCrop(c)}
//               aspect={1}
//               circularCrop={false}
//             >
//               <img
//                 ref={imgRef}
//                 src={imageSrc}
//                 alt="Crop preview"
//                 onLoad={handleImageLoad}
//                 style={{ transform: `scale(${scale})`, maxHeight: height }}
//               />
//             </ReactCrop>

//             <div className="mt-4">
//               <label>Zoom</label>
//               <input
//                 type="range"
//                 min={1}
//                 max={3}
//                 step={0.1}
//                 value={scale}
//                 onChange={(e) => setScale(Number(e.target.value))}
//                 className="w-full mt-2"
//               />
//             </div>

//             <div className="hidden">
//               <canvas ref={canvasRef} />
//             </div>

//             <SubmitButton
//               name="Crop and Upload"
//               handleSubmit={handleSave}
//               isSmallBtn
//               isLoading={false}
//             />
//           </>
//         )}
//       </Modal>
//     </>
//   );
// }
