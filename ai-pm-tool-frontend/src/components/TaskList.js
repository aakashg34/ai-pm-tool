import React from 'react';
import './TaskList.css'; // Import the CSS file for styling

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      <h3>Task List</h3>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className={`task-item ${task.status.toLowerCase()}`}>
            <h4>{task.title}</h4>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;


// import React from 'react';

// const TaskList = ({ tasks }) => {
//   return (
//     <div className="task-list">
//       <ul>
//         {tasks.map(task => (
//           <li key={task._id}>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <span>Status: {task.status}</span>
//             <span>Due Date: {new Date(task.dueDate).toLocaleDateString()}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;
