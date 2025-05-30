
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'In Stock' | 'Low Stock' | 'Out of Stock';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStatusStyle(),
      className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1.5",
        status === 'In Stock' ? 'bg-green-600' : 
        status === 'Low Stock' ? 'bg-yellow-600' : 'bg-red-600'
      )}></span>
      {status}
    </span>
  );
};

export default StatusBadge;
