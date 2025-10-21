import { uploadData, downloadData, remove, getUrl, list } from "aws-amplify/storage";

export const storageService = {
  async uploadFile(file: File) {
    try {
      const task = uploadData({
        path: ({ identityId }: { identityId?: string }) => `private/${identityId}/uploads/${Date.now()}-${file.name}`,
        data: file,
        options: {
          contentType: file.type,
        },
      });
      return task.result;
    } catch (error) {
      console.error("Upload file error:", error);
      throw error;
    }
  },

  async downloadFile(key: string) {
    try {
      const result = await downloadData({
        path: ({ identityId }) => `private/${identityId}/uploads/${key}`,
      });
      return result.result;
    } catch (error) {
      console.error("Download file error:", error);
      throw error;
    }
  },

  async deleteFile(key: string) {
    try {
      await remove({
        path: key,
      });
      return;
    } catch (error) {
      console.error("Delete file error:", error);
      throw error;
    }
  },

  async getFileUrl(path: string): Promise<string> {
    try {
      const result = await getUrl({
        path: path,
      });
      return result.url.toString();
    } catch (error) {
      console.error("Get file URL error:", error);
      throw error;
    }
  },

  async listFiles() {
    try {
      const result = await list({
        path: ({ identityId }) => `private/${identityId}/uploads/`,
      });
      return result.items;
    } catch (error) {
      console.error("List files error:", error);
      throw error;
    }
  },
};
