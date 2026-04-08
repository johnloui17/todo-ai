'use client';

import React from 'react';
import NotTodoItem from './NotTodoItem';

const MOCK_NOT_TODOS = [
  { id: '1', title: 'Smoking', streak: 15 },
  { id: '2', title: 'Sugar intake', streak: 4 },
  { id: '3', title: 'Social Media > 1h', streak: 8 },
];

const NotTodoList: React.FC = () => {
  return (
    <div className="mt-6">
      {MOCK_NOT_TODOS.map((item) => (
        <NotTodoItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default NotTodoList;
