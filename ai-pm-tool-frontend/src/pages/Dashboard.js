import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import ProjectSummary from '../components/ProjectSummary';
import UserActivity from '../components/UserActivity';
import api from '../api/axios'
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    try {
      // Optionally send a request to the backend to notify about the logout
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Navigate to the login page
    navigate('/');
  };

  useEffect(() => {
    // Fetch tasks and projects when component mounts
    const fetchData = async () => {
      try {
        const tasksResponse = await api.get('/tasks');
        const projectsResponse = await api.get('/projects');
        // const tasksResponse = await axios.get('http://localhost:5001/api/tasks');
        // const projectsResponse = await axios.get('http://localhost:5001/api/projects');
        
        setTasks(tasksResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
//     <div className="dashboard">
//       <header className="header">
//       <h1>Dashboard</h1>
//       </header>
//       <div className="dashboard-content">
//         <div className="dashboard-section">
//           <h2>Project Summary</h2>
//           <ProjectSummary projects={projects} />
//         </div>
//         <div className="dashboard-section">
//           <h2>Task List</h2>
//           <TaskList tasks={tasks} />
//         </div>
//         <div className="dashboard-section">
//           <h2>User Activity</h2>
//           <UserActivity />
//         </div>
//       </div>
//     </div>
//   );
<div className="dashboard">
<header className="header">
<button onClick={handleLogout} className="logout-button"> <i className="fas fa-sign-out-alt"></i></button>

  <h1>Dashboard</h1>
</header>
<div className="content">
  <aside className="sidebar">
    <nav>
      <ul>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#tasks">Tasks</a></li>
        <li><a href="#reports">Reports</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </nav>
  </aside>
  <main className="main-content">
    <section className="overview">
      <h2>Project Overview</h2>
      <ProjectSummary projects={projects} />
    </section>
    <section className="tasks">
      <h2>Recent Tasks</h2>
      <TaskList tasks={tasks} />
    </section>
  </main>
</div>
</div>
);

};

export default Dashboard;
