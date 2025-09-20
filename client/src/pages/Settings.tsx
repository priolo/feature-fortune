import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'Startup Web App',
    siteDescription: 'Your amazing startup platform',
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    currency: 'USD',
  });

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Implement save functionality here
    alert('Settings saved successfully!');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your application preferences</p>
      </div>
      
      <div className="settings-container">
        <div className="settings-section">
          <h2>General Settings</h2>
          
          <div className="form-group">
            <label htmlFor="siteName">Site Name</label>
            <input
              id="siteName"
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="siteDescription">Site Description</label>
            <textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              className="form-textarea"
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="form-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              value={settings.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="form-select"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Standard Time</option>
              <option value="PST">Pacific Standard Time</option>
              <option value="CET">Central European Time</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              value={settings.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              className="form-select"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Notifications</h2>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="form-checkbox"
              />
              <span className="checkbox-text">Email Notifications</span>
            </label>
            <p className="form-help">Receive important updates via email</p>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                className="form-checkbox"
              />
              <span className="checkbox-text">Push Notifications</span>
            </label>
            <p className="form-help">Receive real-time notifications in your browser</p>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Appearance</h2>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleInputChange('darkMode', e.target.checked)}
                className="form-checkbox"
              />
              <span className="checkbox-text">Dark Mode</span>
            </label>
            <p className="form-help">Switch to dark theme for better viewing in low light</p>
          </div>
        </div>
        
        <div className="settings-actions">
          <button onClick={handleSave} className="btn btn-primary">
            Save Settings
          </button>
          <button className="btn btn-secondary">
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;