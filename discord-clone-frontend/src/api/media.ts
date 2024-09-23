import { server } from "./base";

export interface MediaUploadResponse {
  fileId: string;
  fileUrl: string;
}

export const uploadMedia = async (fileMe: File): Promise<MediaUploadResponse> => {
  const formData = new FormData();
  formData.append("mediaFile", fileMe);

  try {
    const response = await server.post("/api/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      fileId: response.data.fileId,
      fileUrl: response.data.url,
    };
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

export const deleteMedia = async (mediaId: string) => {
  try {
    var response = await server.delete(`/api/media/${mediaId}`);
    console.log(response.status);
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};
