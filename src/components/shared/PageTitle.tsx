
import React from 'react';

interface PageTitleProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageTitle = ({ title, description, actions }: PageTitleProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {description && <p className="text-gray-500 mt-1">{description}</p>}
      </div>
      {actions && <div className="mt-4 md:mt-0">{actions}</div>}
    </div>
  );
};

export default PageTitle;
