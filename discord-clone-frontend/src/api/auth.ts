import { server } from "./base";
export interface LoginData {
  email: string;
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

export const login = async (data: LoginData): Promise<LoginResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if the provided credentials match the example account
  // if ((data.email === exampleAccount.username || data.email === exampleAccount.email) && data.password === '123') {
  //   return exampleAccount;
  // } else {
  //   throw new Error('Invalid username or password');
  // }

  const response = await server.post('api/auth/login', data)

  if (response.status !== 200 || response.data === null) {
    throw new Error('Login failed');
  }

  const loginResponse : LoginResponse = {
    user: {
      id: response.data.user.id,
      username: response.data.user.name,
      email: response.data.user.email,
      avatarUrl: response.data.user.avatarUrl,
    },
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken
  };
  
  return loginResponse;
};

export const register = async (data: LoginData & { email: string }): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real app, you would create a new user here
  // For now, just return the example account
  return exampleAccount;
};

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const loginGoogle = async (credential: string): Promise<LoginResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if the provided credentials match the example account
  var response = await server.post('/api/auth/login-external', {
    provider: 'google',
    token: credential
  });

  if (response.status !== 200) {
    throw new Error('Login failed');
  }

  const loginResponse : LoginResponse = {
    user: {
      id: response.data.user.id,
      username: response.data.user.name,
      email: response.data.user.email,
      avatarUrl: response.data.user.avatarUrl,
    },
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken
  };
  
  return loginResponse;
}