
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Loader from '@/components/shared/Loader';

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    document.title = 'StockView - Inventory Management System';
  }, []);
  
  if (loading) {
    return <Loader />;
  }
  
  return <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />;
};

export default Index;
