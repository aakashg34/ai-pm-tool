import React from 'react';
import './ProjectSummary.css'; // Import the CSS file for styling

const ProjectSummary = ({ projects }) => {
    return (
      <div className="project-summary">
        <h2>Project Summary</h2>
        <div className="project-list">
          {projects.map(project => (
            <div key={project._id} className="project-card">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-info">
                <span className="project-date">Created On: {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

// const ProjectSummary = ({ projects }) => {
//   return (
//     <div className="project-summary">
//       <ul>
//         {projects.map(project => (
//           <li key={project._id}>
//             <h3>{project.name}</h3>
//             <p>{project.description}</p>
//             <span>Created On: {new Date(project.createdAt).toLocaleDateString()}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// const ProjectSummary = ({ project }) => {
//   return (
//     <div className="project-summary">
//       <h3>Project Summary</h3>
//       <div className="project-details">
//         <p><strong>Name:</strong> {project.name}</p>
//         <p><strong>Description:</strong> {project.description}</p>
//         <p><strong>Status:</strong> {project.status}</p>
//         <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
//         <p><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// };



export default ProjectSummary;
