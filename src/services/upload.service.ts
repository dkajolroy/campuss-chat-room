import { v2 as ImageCloud } from "cloudinary";
import multer from "multer";
import sharp from "sharp";

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, callback) {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 5,
  },
});

// minify image   //return base64
export async function sharpImage(file: Express.Multer.File) {
  const sharpImg = await sharp(file.buffer).resize(700).webp().toBuffer();
  const base = Buffer.from(sharpImg).toString("base64");
  return "data:" + file.mimetype + ";base64," + base;
}
// upload to cloudi
export async function uploader(file: Express.Multer.File, folder: string) {
  ImageCloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const base = await sharpImage(file);
  return await ImageCloud.uploader.upload(base, {
    resource_type: "auto",
    folder,
  });
}
