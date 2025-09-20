import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Track your business performance and insights</p>
      </div>
      
      <div className="analytics-section">
        <div className="chart-container">
          <h3>Revenue Trend</h3>
          <div className="chart-placeholder">
            📊 Chart visualization would go here
          </div>
        </div>
        
        <div className="analytics-stats">
          <div className="stat-card">
            <h4>Page Views</h4>
            <div className="stat-number">45,623</div>
            <div className="stat-period">This month</div>
          </div>
          
          <div className="stat-card">
            <h4>Bounce Rate</h4>
            <div className="stat-number">32.1%</div>
            <div className="stat-period">This month</div>
          </div>
          
          <div className="stat-card">
            <h4>Session Duration</h4>
            <div className="stat-number">4:32</div>
            <div className="stat-period">Average</div>
          </div>
        </div>
      </div>
      
      <div className="top-pages">
        <h2>Top Performing Pages</h2>
        <div className="page-list">
          <div className="page-item">
            <div className="page-name">/dashboard</div>
            <div className="page-views">12,543 views</div>
          </div>
          <div className="page-item">
            <div className="page-name">/products</div>
            <div className="page-views">8,921 views</div>
          </div>
          <div className="page-item">
            <div className="page-name">/analytics</div>
            <div className="page-views">5,432 views</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;