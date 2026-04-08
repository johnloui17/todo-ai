'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  id: string;
  name: string;
  color: 'blue' | 'orange' | 'green' | 'purple' | 'red';
  progress: number;
  icon?: string;
}

const colorMap = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-500',
    dot: '#3b82f6',
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-500',
    dot: '#f97316',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-500',
    dot: '#22c55e',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-500',
    dot: '#a855f7',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-500',
    dot: '#ef4444',
  },
};

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, color, progress, icon }) => {
  // SVG Progress Ring logic
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const colors = colorMap[color] || colorMap.blue;

  return (
    <Link href={`/category/${id}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 transition-all hover:shadow-md h-full flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${colors.bg}`}>
            {icon || '📁'}
          </div>
          
          <div className="relative h-14 w-14">
            <svg className="h-full w-full rotate-[-90deg]">
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-gray-100 dark:text-gray-800"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ color: colors.dot }}
                className={`${colors.text} transition-all duration-500`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-bold leading-tight">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">12 tasks</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
