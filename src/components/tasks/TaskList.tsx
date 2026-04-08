'use client';

import React from 'react';
import TaskItem from './TaskItem';

const MOCK_TASKS = [
  { id: '1', title: 'Buy groceries', isCompleted: false },
  { id: '2', title: 'Meeting with designers', isCompleted: true, hasSubtasks: true },
  { id: '3', title: 'Call plumber', isCompleted: false },
  { id: '4', title: 'Walk the dog', isCompleted: false },
  { id: '5', title: 'Update project docs', isCompleted: false, hasSubtasks: true },
];

const TaskList: React.FC = () => {
  return (
    <div className="mt-4 flex flex-col">
      {MOCK_TASKS.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
};

export default TaskList;
