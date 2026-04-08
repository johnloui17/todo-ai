'use client';

import React from 'react';
import CategoryCard from './CategoryCard';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Personal', color: 'blue', progress: 65, icon: '👤' },
  { id: '2', name: 'Work', color: 'orange', progress: 30, icon: '💼' },
  { id: '3', name: 'Health', color: 'green', progress: 85, icon: '🏃' },
  { id: '4', name: 'Finance', color: 'purple', progress: 15, icon: '💰' },
];

const CategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {MOCK_CATEGORIES.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
