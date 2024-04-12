# Upload Multer + Cloudinary

`Route.ts`

```
const uploadFiled = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "videos", maxCount: 5 },
]);

router.route("/add").post(uploadFiled, multiFiledUpload, addPost);
```

Config multer upload `upload.ts`

```
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 2, // max 2  filed
    fileSize: 1024 * 1024 * 25, // max 25mb file size
  },
  fileFilter(req, file, callback) {
    if (
      (file.mimetype.startsWith("image") && file.fieldname === "images") ||
      (file.mimetype.startsWith("video") && file.fieldname === "videos")
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});
```

CloudinaryUploadHandler.ts

```
import { v2 as ImageCloud } from "cloudinary";
async function uploader(file: string) { // Cloudinary uploader api config
  ImageCloud.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const res = await ImageCloud.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

export async function multiFiledUpload( req: Request,res: Response, next: NextFunction) {
  const files = req.files as {
    images?: Express.Multer.File[];
    videos?: Express.Multer.File[];
  };
  req.body.images = [];
  req.body.videos = [];
  try {
    if (files.images) {
      const base64images = await Promise.all(
        files.images.map((file) => {
          const base64 = Buffer.from(file.buffer).toString("base64");
          let dataURI = "data:" + file.mimetype + ";base64," + base64;
          return dataURI;
        })
      );
      req.body.images = await Promise.all(
        base64images.map(async (x) => {
          return await uploader(x);
        })
      );
    }
    if (files.videos) {
     // video upload config similer to images
     // get req.body.image|video from next function
    }
    next();
  } catch (error) {
    res.status(400).send({ message: "Upload failed !" });
  }
}

```
