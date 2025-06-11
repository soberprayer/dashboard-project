const API_BASE_URL = 'http://localhost:3001/api';

// 定义接口（不需要在开头重复导出）
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'pending';
  department: string;
  position: string;
  join_date: string;
  last_login: string;
  login_count: number;
  location: string;
  rating: number;
  projects: number;
  tasks: number;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserStats {
  total: number;
  active: number;
  pending: number;
  admin: number;
}

class UserAPI {
  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
    role?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<UserListResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = await fetch(`${API_BASE_URL}/users?${queryParams}`);
    if (!response.ok) {
      throw new Error('获取用户列表失败');
    }
    
    return response.json();
  }

  async getUserStats(): Promise<UserStats> {
    const response = await fetch(`${API_BASE_URL}/users/stats`);
    if (!response.ok) {
      throw new Error('获取用户统计失败');
    }
    
    return response.json();
  }

  async getUser(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('获取用户详情失败');
    }
    
    return response.json();
  }

  async createUser(userData: Omit<User, 'id' | 'avatar' | 'join_date' | 'last_login' | 'login_count' | 'rating' | 'projects' | 'tasks'>): Promise<{ id: number; message: string }> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('创建用户失败');
    }
    
    return response.json();
  }

  async updateUser(id: number, userData: Partial<User>): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('更新用户失败');
    }
    
    return response.json();
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('删除用户失败');
    }
    
    return response.json();
  }

  async batchOperation(action: 'activate' | 'deactivate' | 'delete', userIds: number[]): Promise<{ message: string; affectedRows: number }> {
    const response = await fetch(`${API_BASE_URL}/users/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, userIds }),
    });
    
    if (!response.ok) {
      throw new Error('批量操作失败');
    }
    
    return response.json();
  }
}

export const userAPI = new UserAPI();
