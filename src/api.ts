// api.ts
import axios from 'axios';
import { saveAs } from 'file-saver';

const SERVER = 'http://localhost:8080';


const axiosInstance = axios.create({
  baseURL: `${SERVER}/api`,
});

// Interceptor để tự động gắn Authorization header nếu có token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // hoặc sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type CSRFormData = {
  commonName: string;
  organization: string;
  country: string;
  organizationalUnit?: string;
  state?: string;
  locality?: string;
  email?: string;
};

export const generateCSR = async (data: CSRFormData) => {
  return axiosInstance.post('/csr/generate-csr', data);
};

export const getAllCSRs = async () => {
  return axiosInstance.get('/csr/csrs');
};

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post(`${SERVER}/api/users/login`, { username, password });
  return res.data; // vẫn dùng axios thường cho login vì chưa có token
};

export const registerUser = async (
  username: string,
  displayName: string,
  password: string,
  role: string
) => {
  return axiosInstance.post('/users/register', {
    username,
    displayName,
    password,
    role,
  });
};

export const downloadCSRFile = async (url: string) => {
  return axiosInstance.post(
    '/csr/download',
    { url },
    {
      responseType: 'blob', // Quan trọng để nhận file nhị phân
    }
  );
};

export const handleDownload = async (url: string, fileName: string) => {
  try {
    const res = await downloadCSRFile(url);
    saveAs(res.data, fileName); // Lưu file dưới tên fileName
  } catch (err) {
    console.error('Download failed:', err);
  }
};