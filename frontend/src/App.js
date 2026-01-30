// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerView from './components/CustomerView';

function App() {
  return <CustomerView />;
  // return (
    // <BrowserRouter>
      // <Routes>
        {/* Redirect root to latest customer */}
        {/* <Route path="/" element={<Navigate to="/customers/latest" replace />} /> */}

        {/* Handle /customers/latest */}
        {/* <Route path="/customers/latest" element={<CustomerView />} /> */}

        {/* Handle /customers/:id */}
        {/* <Route path="/customers/:id" element={<CustomerView />} /> */}
      // </Routes>
    // </BrowserRouter>
  // );
}

export default App;