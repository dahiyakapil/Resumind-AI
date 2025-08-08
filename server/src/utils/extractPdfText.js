import fs from "fs";
import pdf from "pdf-parse";
import path from "path";
import { fromPath } from "pdf2pic";
import { createWorker } from "tesseract.js";

const TMP_PATH = path.join("tmp");
if (!fs.existsSync(TMP_PATH)) fs.mkdirSync(TMP_PATH);

export const extractPdfText = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);

    // First try to extract using pdf-parse
    const data = await pdf(buffer);
    if (data.text && data.text.trim().length > 30) {
      return data.text;
    }

    // If not enough text, fallback to OCR
    const convert = fromPath(filePath, {
      density: 150,
      saveFilename: "resume-page",
      savePath: TMP_PATH,
      format: "png",
      width: 1000,
      height: 1400,
    });

    const page = await convert(1); // Convert first page

    const worker = await createWorker("eng", 1);
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const result = await worker.recognize(page.path);
    await worker.terminate();

    fs.unlinkSync(page.path); // Clean up image

    return result.data.text;

  } catch (error) {
    throw new Error("Tesseract OCR failed: " + error.message);
  }
};
