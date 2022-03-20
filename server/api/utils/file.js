import { promises } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import onError from "./onError.js";

// путь к текущей директории
const _dirname = dirname(fileURLToPath(import.meta.url));
console.log(_dirname);
// путь к директории с файлами
const fileDir = join(_dirname, "../files");

// утилита для получения пути к файлу
export const getFilePath = (filePath) => join(fileDir, filePath);

// утилита для удаления файла
export const removeFile = async (filePath) => {
  try {
    await promises.unlink(join(fileDir, filePath));
  } catch (e) {
    onError(e);
  }
};
