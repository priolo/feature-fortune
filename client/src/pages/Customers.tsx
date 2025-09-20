import React, { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
}

const Customers: React.FC = () => {
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      totalOrders: 15,
      totalSpent: 1249.99,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      totalOrders: 8,
      totalSpent: 654.50,
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      totalOrders: 23,
      totalSpent: 2199.75,
      joinDate: '2023-11-08'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 321-0987',
      totalOrders: 5,
      totalSpent: 299.99,
      joinDate: '2024-03-12'
    },
  ]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Customers</h1>
        <p>Manage your customer base and relationships</p>
        <button className="btn btn-primary">Add New Customer</button>
      </div>
      
      <div className="customer-stats">
        <div className="stat-card">
          <h3>Total Customers</h3>
          <div className="stat-number">{customers.length}</div>
        </div>
        <div className="stat-card">
          <h3>Avg. Order Value</h3>
          <div className="stat-number">$67.80</div>
        </div>
        <div className="stat-card">
          <h3>Customer Retention</h3>
          <div className="stat-number">85.2%</div>
        </div>
      </div>
      
      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="customer-info">
                  <div className="customer-avatar">👤</div>
                  <div className="customer-name">{customer.name}</div>
                </td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.totalOrders}</td>
                <td>${customer.totalSpent.toFixed(2)}</td>
                <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="btn-icon">👁️</button>
                  <button className="btn-icon">✏️</button>
                  <button className="btn-icon">📧</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;