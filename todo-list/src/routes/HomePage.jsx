import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [taskGroups, setTaskGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [tasksByUser, setTasksByUser] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/tasks");
        setTasks(res.data.tasks);

        const open = res.data.tasks.filter(task => task.status === true);
        setOpenTasks(open);
      } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
      }
    };

    const getTaskGroups = async () => {
      try {
        const res = await axios.get("http://localhost:3000/taskGroups");
        setTaskGroups(res.data.taskGroups);
      } catch (err) {
        console.error("Erro ao buscar grupos:", err);
      }
    };

    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users");
        setUsers(res.data.users);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };

    getTasks();
    getTaskGroups();
    getUsers();
  }, []);

  useEffect(() => {
    if (openTasks.length > 0 && users.length > 0) {
      const grouped = {};
      openTasks.forEach(task => {
        const user = users.find(u => u.id === task.creatorId);
        const name = user?.name || "Desconhecido";
        grouped[name] = (grouped[name] || 0) + 1;
      });

      const userCards = Object.entries(grouped).map(([name, count]) => ({
        name,
        count
      }));

      setTasksByUser(userCards);
    }
  }, [openTasks, users]);

  return (
    <main>
      <Sidebar />
      <div className="home-main-content">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <Card title="Total de Tarefas" number={tasks.length} />
          <Card title="Grupos de Tarefas" number={taskGroups.length} />
          <Card title="Tarefas em aberto" number={tasks.filter(task => task.Status == true).length} />
        </div>

        <div className="dashboard-cards">
          {tasksByUser.map((user, index) => (
            <Card key={index} title={`Tarefas: ${user.name}`} number={user.count} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default HomePage;