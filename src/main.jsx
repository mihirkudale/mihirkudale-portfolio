// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Core Web Vitals monitoring (2026 standard: INP replaced FID)
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

// Report metrics to console in development, can be sent to analytics in production
const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
  }
  // In production, send to your analytics endpoint:
  // navigator.sendBeacon('/analytics', JSON.stringify(metric));
};

// Initialize Core Web Vitals tracking
onCLS(reportWebVitals);
onINP(reportWebVitals);  // Interaction to Next Paint (replaced FID in 2024)
onLCP(reportWebVitals);
onFCP(reportWebVitals);
onTTFB(reportWebVitals);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);