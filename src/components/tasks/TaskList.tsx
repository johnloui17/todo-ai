'use client';

import React from 'react';
import TaskItem, { Task, Subtask } from './TaskItem';

const MOCK_TASKS: (Task & { subtasks?: Subtask[] })[] = [
  { 
    id: '1', 
    title: 'Buy groceries', 
    status: 'pending', 
    type: 'todo' 
  },
  { 
    id: '2', 
    title: 'Meeting with designers', 
    status: 'completed', 
    type: 'todo',
    subtasks: [
      { id: 's1', title: 'Share prototype', status: 'completed' },
      { id: 's2', title: 'Review feedback', status: 'completed' }
    ]
  },
  { 
    id: '3', 
    title: 'Call plumber', 
    status: 'pending', 
    type: 'todo' 
  },
  { 
    id: '4', 
    title: 'Walk the dog', 
    status: 'pending', 
    type: 'todo' 
  },
  { 
    id: '5', 
    title: 'Update project docs', 
    status: 'pending', 
    type: 'todo',
    subtasks: [
      { id: 's3', title: 'Write intro', status: 'completed' },
      { id: 's4', title: 'Add diagrams', status: 'pending' }
    ]
  },
];

const TaskList: React.FC = () => {
  return (
    <div className="mt-4 flex flex-col">
      {MOCK_TASKS.map((task) => (
        <TaskItem key={task.id} task={task} subtasks={task.subtasks} />
      ))}
    </div>
  );
};

export default TaskList;
