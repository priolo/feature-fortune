# Startup Web App

A modern, responsive single-page application built with React, TypeScript, and Vite. This application features a clean layout with lateral navigation, search functionality, and multiple pages for managing a startup business.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Pure CSS (No frameworks like Tailwind CSS)
- **No ESLint**: As per requirements

## 🎨 Features

### Layout
- **Lateral Menu**: Collapsible sidebar navigation with icons and labels
- **Header**: Contains app title, centered search box, and user profile
- **Main Content**: Responsive content area using React Router's Outlet
- **Responsive Design**: Works on desktop and mobile devices

### Pages
1. **Dashboard** - Overview with metrics cards and recent activity
2. **Analytics** - Business insights with charts and statistics
3. **Products** - Product inventory management with table view
4. **Customers** - Customer management with contact information
5. **Orders** - Order tracking and management system
6. **Settings** - Application configuration and preferences

### Navigation
- Active page highlighting in sidebar
- Smooth transitions between pages
- Collapsible sidebar for more screen space
- Icons for each navigation item

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory
```bash
cd client
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout component
│   └── Layout.css          # Layout-specific styles
├── pages/
│   ├── Dashboard.tsx       # Dashboard page
│   ├── Analytics.tsx       # Analytics page
│   ├── Products.tsx        # Products management
│   ├── Customers.tsx       # Customer management
│   ├── Orders.tsx          # Order management
│   └── Settings.tsx        # Settings page
├── styles/
│   └── pages.css           # Global page styles
├── App.tsx                 # Main App component with routing
├── main.tsx               # Application entry point
└── index.css              # Global CSS reset and base styles
```

## 🎯 Key Components

### Layout Component
- Responsive sidebar with navigation menu
- Header with search functionality
- Main content area using React Router's Outlet
- Collapsible sidebar feature

### Page Components
- Dashboard: Metrics overview and activity feed
- Analytics: Business performance insights
- Products: Inventory management table
- Customers: Customer database with contact info
- Orders: Order tracking and status management
- Settings: Application preferences and configuration

## 📱 Responsive Design

The application is fully responsive and includes:
- Mobile-friendly navigation
- Adaptive grid layouts
- Touch-friendly interface elements
- Optimized for various screen sizes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Styling

The application uses pure CSS without any CSS frameworks:
- Custom responsive grid layouts
- Consistent color scheme and typography
- Smooth animations and transitions
- Clean, modern interface design