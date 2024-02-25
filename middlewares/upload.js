import multer from "multer";
import path from "path";

const tempPath = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempPath,
});

export const upload = multer({
  storage: multerConfig,
});
