'use client';

import React, { useEffect, useState, useCallback } from 'react';
import CategoryCard from './CategoryCard';
import { repository } from '@/db/repository';

interface CategoryData {
  id: string;
  name: string;
  color: any;
  progress: number;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const cats = await repository.getCategories();
      
      // Enhance categories with progress
      const enhancedCats = await Promise.all(cats.map(async (cat) => {
        const progress = await repository.getCategoryProgress(cat.id);
        
        return {
          id: cat.id,
          name: cat.name,
          color: cat.color as any || 'blue',
          progress
        };
      }));

      setCategories(enhancedCats);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    window.addEventListener('task-added', fetchCategories);
    return () => window.removeEventListener('task-added', fetchCategories);
  }, [fetchCategories]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 mt-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-zinc-100 dark:bg-zinc-800 rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))
      ) : (
        <div className="col-span-2 text-center py-12 text-zinc-500 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="font-bold">No categories yet</p>
          <p className="text-xs mt-1">Tap the + button to add your first category</p>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
