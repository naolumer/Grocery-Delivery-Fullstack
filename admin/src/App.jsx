import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Orders from './pages/Orders.jsx';
import ProductsList from './pages/ProductsList.jsx';
import Navbar from './components/Navbar.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Sidebar from './components/Sidebar.jsx';
import Login from './components/Login.jsx';
import { AppContext } from './context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, aToken, isLoading } = useContext(AppContext);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!isLoggedIn || !aToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isLoggedIn, aToken, isLoading } = useContext(AppContext);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (isLoggedIn && aToken) {
    return <Navigate to="/add-product" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const { isLoading } = useContext(AppContext);

  if (isLoading) {
    return <div>Loading...</div>; // Wait for token validation
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-list"
          element={
            <ProtectedRoute>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;