import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // General UI Colors
        foreground: "#f8f9fa",
        background: "#f1f5f9",
        
        // Primary Brand Colors
        primaryLight: "#4cc9f0",
        primary: "#4361ee",
        primaryDark: "#3a0ca3",
        
        // Accent and Feedback
        accent: "#ffb703",
        success: "#38b000",
        danger: "#d00000",
        neutral: "#adb5bd",
        neutralDark: "#495057",
        
        // Dashboard-Specific Colors
        dashboardBackground: "#e9ecef",    // Soft neutral for dashboard background
        dashboardForeground: "#212529",    // Dark text for dashboard content
        cardBackground: "#ffffff",         // White for cards
        cardForeground: "#343a40",         // Dark gray text for cards
        
        // Chart Colors
        chartPrimary: "#4361ee",           // Main chart color
        chartSecondary: "#4cc9f0",         // Secondary data color
        chartTertiary: "#ffb703",          // Accent for data points
        chartBackground: "#ffffff",        // Chart background
        chartGrid: "#dee2e6",              // Gridline color
        chartText: "#495057",              // Text in charts
        
        // Additional Backgrounds
        modalBackground: "#ffffff",        // Modals and overlays
        sidebarBackground: "#343a40",      // Sidebar
        sidebarForeground: "#f8f9fa",      // Text/icons for sidebar
        tooltipBackground: "#212529",      // Tooltips
        tooltipForeground: "#f8f9fa",      // Tooltip text
        
        // Notifications
        notificationBackground: "#4cc9f0",
        notificationForeground: "#ffffff",
      }
      
    },
  },
  plugins: [],
};
export default config;
