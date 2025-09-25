import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { privateApi } from "../service/api";
import { jwtDecode } from 'jwt-decode'
import { Link } from "react-router-dom";
import "./css/homepage.css"

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [taskGroups, setTaskGroups] = useState([]);


  const response = JSON.parse(localStorage.getItem('auth-data'))
  const { token } = response.state
  const userData = jwtDecode(token)

  const getTasks = async () => {
    try {
      const res = await privateApi.get(`/tasks/all/${userData.id}`);
      setTasks(res.data.tasks)
      console.log("Tarefas: ", tasks)
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  };

  const getTaskGroups = async () => {
    try {
      const res = await privateApi.get("/groups");
      setTaskGroups(res.data.groups)
      console.log("Grupos: ", taskGroups)
    } catch (err) {
      console.error("Erro ao buscar grupos:", err);
    }
  };

  useEffect(() => {
    getTasks();
    getTaskGroups();
  }, []);

  return (
    <main>
      <Sidebar />
      <div className="home-main-content">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <Card title="Total de Tarefas" number={tasks.length} />
          <Card title="Grupos de Tarefas" number={taskGroups.length} />
          <Card title="Tarefas em aberto" number={tasks.filter(task => task.status === false).length} />
        </div>

        <div className="dashboard-actions">
          <Link to={'/tasks'}>
            <button className="btn-action btn-link-view-tasks">Visualizar Tarefas</button>
          </Link>
          <Link to={"/tasks/add"}>
            <div className="btn-action btn-link-create-task">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
              <span>CRIAR</span>
            </div>
          </Link>
        </div>
        <div className="tasks-open-display">
          <h2>Tarefas em aberto</h2>
          <div className="quick-tasks-container">
            {
              tasks.filter(task => task.status === false).map(task => (
                <div key={task.id} className="quick-tasks">
                  <Link to={`tasks/edit/${task.id}`}>
                    <span className="quick-tasks-tittle">{task.name}</span>
                    <p className="quick-tasks-descricao">{task.descricao}</p>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;