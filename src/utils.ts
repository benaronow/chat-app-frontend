import fs from "fs/promises";

export const readFileContent = async (filePath: string) => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    return "";
  }
};
