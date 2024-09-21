import { server } from "./base";

export const uploadMedia = async (fileMe: File): Promise<string> => {
  const formData = new FormData();
  formData.append("mediaFile", fileMe);

  try {
    const response = await server.post("/api/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Assuming the response contains the uploaded file's URL or identifier
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
