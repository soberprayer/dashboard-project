const API_BASE_URL = 'http://localhost:3001/api';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  shippingStatus: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDelivery?: string;
  shippingAddress: string;
  paymentMethod: 'credit_card' | 'alipay' | 'wechat_pay' | 'bank_transfer';
  discount: number;
  shippingFee: number;
  notes: string;
  priority: 'high' | 'medium' | 'low';
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderStats {
  total: number;
  pending: number;
  completed: number;
  total_revenue: number;
  today_orders: number;
}

class OrderAPI {
  async getOrders(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    paymentStatus?: string;
    shippingStatus?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<OrderListResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = await fetch(`${API_BASE_URL}/orders?${queryParams}`);
    if (!response.ok) {
      throw new Error('获取订单列表失败');
    }
    
    return response.json();
  }

  async getOrderStats(): Promise<OrderStats> {
    const response = await fetch(`${API_BASE_URL}/orders/stats`);
    if (!response.ok) {
      throw new Error('获取订单统计失败');
    }
    
    return response.json();
  }

  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) {
      throw new Error('获取订单详情失败');
    }
    
    return response.json();
  }

  async updateOrderStatus(id: string, statusData: {
    status?: string;
    paymentStatus?: string;
    shippingStatus?: string;
  }): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusData),
    });
    
    if (!response.ok) {
      throw new Error('更新订单状态失败');
    }
    
    return response.json();
  }

  async batchOperation(action: 'process' | 'ship' | 'cancel', orderIds: string[]): Promise<{ message: string; affectedRows: number }> {
    const response = await fetch(`${API_BASE_URL}/orders/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, orderIds }),
    });
    
    if (!response.ok) {
      throw new Error('批量操作失败');
    }
    
    return response.json();
  }
}

export const orderAPI = new OrderAPI();
