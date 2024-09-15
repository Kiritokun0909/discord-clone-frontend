import { server } from './base';

export const uploadMedia = async (fileMe: File): Promise<string> => {
  const formData = new FormData();
  formData.append('mediaFile', fileMe);

  try {
    const response = await server.post('/api/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Assuming the response contains the uploaded file's URL or identifier
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error; // Rethrow the error for further handling
  }
};