import React, { useState } from 'react';

interface Order {
  id: number;
  customerName: string;
  products: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
}

const Orders: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: 1001,
      customerName: 'John Doe',
      products: ['Wireless Headphones', 'Phone Case'],
      total: 124.98,
      status: 'shipped',
      orderDate: '2024-09-15'
    },
    {
      id: 1002,
      customerName: 'Jane Smith',
      products: ['Smart Watch'],
      total: 199.99,
      status: 'processing',
      orderDate: '2024-09-16'
    },
    {
      id: 1003,
      customerName: 'Mike Johnson',
      products: ['Laptop Stand', 'Coffee Mug', 'Wireless Mouse'],
      total: 89.97,
      status: 'pending',
      orderDate: '2024-09-16'
    },
    {
      id: 1004,
      customerName: 'Sarah Wilson',
      products: ['Running Shoes'],
      total: 79.99,
      status: 'delivered',
      orderDate: '2024-09-14'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'processing': return '#3498db';
      case 'shipped': return '#9b59b6';
      case 'delivered': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Orders</h1>
        <p>Track and manage customer orders</p>
      </div>
      
      <div className="order-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <div className="stat-number">{orders.length}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <div className="stat-number">
            {orders.filter(order => order.status === 'pending').length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Revenue Today</h3>
          <div className="stat-number">$494.93</div>
        </div>
      </div>
      
      <div className="filters">
        <select className="filter-select">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        
        <input type="date" className="filter-date" />
      </div>
      
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">#{order.id}</td>
                <td>{order.customerName}</td>
                <td className="products-cell">
                  <div className="products-list">
                    {order.products.map((product, index) => (
                      <span key={index} className="product-tag">
                        {product}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="total">${order.total.toFixed(2)}</td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="btn-icon">👁️</button>
                  <button className="btn-icon">✏️</button>
                  <button className="btn-icon">📋</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;