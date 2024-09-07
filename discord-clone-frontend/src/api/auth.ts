const API_BASE_URL = 'https://your-api-url.com'; // Replace with your actual API base URL

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}`);
  }
};
