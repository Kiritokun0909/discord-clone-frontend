const API_BASE_URL = 'https://your-api-url.com'; // Replace with your actual API base URL when ready

export interface LoginData {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
}

// Example account
const exampleAccount: User = {
  id: '1',
  username: 'admin',
  email: 'admin@gmail.com',
  avatarUrl: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
};

export const login = async (data: LoginData): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if the provided credentials match the example account
  if ((data.username === exampleAccount.username || data.username === exampleAccount.email) && data.password === '123') {
    return exampleAccount;
  } else {
    throw new Error('Invalid username or password');
  }
};

export const register = async (data: LoginData & { email: string }): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real app, you would create a new user here
  // For now, just return the example account
  return exampleAccount;
};
