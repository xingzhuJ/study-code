// API service for communicating with the backend

const API_URL = 'http://localhost:3001/api';

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// User API endpoints
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const userAPI = {
  getAll: () => fetchAPI<User[]>('/users'),
  getById: (id: number) => fetchAPI<User>(`/users/${id}`),
  create: (user: Omit<User, 'id'>) => fetchAPI<User>('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),
  update: (id: number, user: Partial<User>) => fetchAPI<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  }),
  delete: (id: number) => fetchAPI<{ message: string }>(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Data API endpoints
export interface DataItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export const dataAPI = {
  getAll: () => fetchAPI<DataItem[]>('/data'),
  getById: (id: number) => fetchAPI<DataItem>(`/data/${id}`),
  create: (data: Omit<DataItem, 'id' | 'createdAt' | 'updatedAt'>) => fetchAPI<DataItem>('/data', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<DataItem>) => fetchAPI<DataItem>(`/data/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetchAPI<{ message: string }>(`/data/${id}`, {
    method: 'DELETE',
  }),
};
