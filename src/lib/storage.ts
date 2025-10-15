import { uploadData, downloadData, remove, getUrl } from "aws-amplify/storage";

export const storageService = {
  async uploadFile(file: File, key: string): Promise<string> {
    try {
      const result = await uploadData({
        key,
        data: file,
        options: {
          accessLevel: "private",
        },
      }).result;
      return result.key;
    } catch (error) {
      console.error("Upload file error:", error);
      throw error;
    }
  },

  async downloadFile(key: string): Promise<Blob> {
    try {
      const result = await downloadData({
        key,
        options: {
          accessLevel: "private",
        },
      }).result;
      const body = result.body as unknown;
      if (body instanceof Blob) {
        return body;
      }
      throw new Error("Downloaded data body is not a Blob");
    } catch (error) {
      console.error("Download file error:", error);
      throw error;
    }
  },

  async deleteFile(key: string): Promise<void> {
    try {
      await remove({
        key,
        options: {
          accessLevel: "private",
        },
      });
    } catch (error) {
      console.error("Delete file error:", error);
      throw error;
    }
  },

  async getFileUrl(key: string): Promise<string> {
    try {
      const result = await getUrl({
        key,
        options: {
          accessLevel: "private",
        },
      });
      return result.url.toString();
    } catch (error) {
      console.error("Get file URL error:", error);
      throw error;
    }
  },
};
