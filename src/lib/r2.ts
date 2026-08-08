import { S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID || "";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  // Connection drops වැළැක්වීමට සහ Retries සකස් කිරීමට:
  requestHandler: {
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 30000,     // 30 seconds
  },
  maxAttempts: 3,
});