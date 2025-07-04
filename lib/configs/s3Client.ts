// utils/s3Client.ts
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!;

export const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY!,
  },
  requestChecksumCalculation: "WHEN_REQUIRED",
});


export const uploadToS3 = async (file: File, folder: string) => {
  const key = `${folder}/${file.name}_${Date.now()}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: file.type,
  });

  await s3Client.send(command);
  return `https://${bucketName}.s3.amazonaws.com/${key}`;
};