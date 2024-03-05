import { v4 as uuidv4 } from "uuid";
import { set } from "lodash";
import { storage } from "../index";

export const parseDataAndUpload = async (resource, data) => {
  if (!data) {
    return data;
  }
  const uploads = parseDocGetAllUploads(data);
  const docPath = `${resource}/${data.id || uuidv4()}`;
  await Promise.all(
    uploads.map(async (upload) => {
      const link = await uploadAndGetLink(storage)(upload, docPath);
      set(data, upload.fieldDotsPath + ".src", link);
      set(data, upload.fieldDotsPath + ".storagePath", `${docPath}/${upload.fieldSlashesPath}`);
    }),
  );
  return data;
};

const uploadAndGetLink = (storage) => async (upload, docPath) => {
  const { rawFile, fieldSlashesPath } = upload;
  const storagePath = `${docPath}/${fieldSlashesPath}`;

  const task = storage.ref(storagePath).put(rawFile);
  try {
    const taskResult = await new Promise((res, rej) =>
      task.then(res).catch(rej),
    );
    // @ts-ignore
    const getDownloadURL = await taskResult.ref.getDownloadURL();
    return getDownloadURL;
  } catch (storageError) {
    if (storageError.code === "storage/unknown") {
      console.error(
        'saveFile() error saving file, No bucket found! Try clicking "Get Started" in firebase -> storage',
        { storageError },
      );
    } else {
      console.error("saveFile() error saving file", {
        storageError,
      });
    }
  }
  return null;
};

export function parseDocGetAllUploads(obj) {
  const isObject = !!obj && typeof obj === "object";
  if (!isObject) {
    return [];
  }
  const uploads = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    recusivelyParseObjectValue(value, key, uploads);
  });
  return uploads;
}

export function recusivelyParseObjectValue(input, fieldPath, uploads) {
  const isFalsey = !input;
  if (isFalsey) {
    return input;
  }
  const isPrimitive = typeof input !== "object";
  if (isPrimitive) {
    return input;
  }
  const isTimestamp = !!input.toDate && typeof input.toDate === "function";
  if (isTimestamp) {
    return input.toDate();
  }
  const isArray = Array.isArray(input);
  if (isArray) {
    return input.map((value, index) =>
      recusivelyParseObjectValue(value, `${fieldPath}.${index}`, uploads),
    );
  }
  const isObject = typeof input === "object";
  if (!isObject) {
    return;
  }
  const isFileField = !!input && input.hasOwnProperty("rawFile");
  if (isFileField) {
    uploads.push({
      fieldDotsPath: fieldPath,
      fieldSlashesPath: fieldPath.split(".").join("/"),
      rawFile: input.rawFile,
    });
    delete input.rawFile;
    return;
  }
  Object.keys(input).forEach((key) => {
    const value = input[key];
    recusivelyParseObjectValue(value, `${fieldPath}.${key}`, uploads);
  });
  return input;
}
