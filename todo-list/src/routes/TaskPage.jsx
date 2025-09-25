import Searchbar from "../components/Searchbar"
import Sidebar from "../components/Sidebar"
import Task from "../components/Task"
import { useEffect, useState } from "react"
import { privateApi } from '../service/api'
import { jwtDecode } from 'jwt-decode'
import "./css/taskpage.css"

function TaskPage() {
    const [tasks, setTasks] = useState([])
    const [taskGroups, setTaskGroups] = useState([])
    const [currentTasks, setCurrentTasks] = useState([])
    const [ searchTasks, setSearchTasks ] = useState("")


    const response = JSON.parse(localStorage.getItem('auth-data'))
    const { token } = response.state
    const userData = jwtDecode(token)


    const getTasks = async () => {
        try {
            const res = await privateApi.get(`/tasks/all/${userData.id}`)
            setTasks(res.data.tasks)
            console.log("Tarefas: ", res.data.tasks)
        } catch (error) {
            console.error("Falha ao buscar as tarefas:", error)
        }
    }

    const getTaskGroups = async () => {
        try {
            const res = await privateApi.get("/groups")
            setTaskGroups(res.data.groups)

        } catch (error) {
            console.error("Falha ao buscar os grupos: ", error)
        }
    }


    useEffect(() => {
        const taskJoinGroup = tasks.map(task => {
            const group = taskGroups.find(group => group.id === task.groupId)

            return group
                ? {
                    ...task,
                    group_name: group.name,
                    group_color: group.color,
                    group_icon: group.icon
                }
                : task
        })
        setCurrentTasks(taskJoinGroup)
    }, [tasks, taskGroups])

    const onChangeStatus = async (taskId, status) => {
        try {
            await privateApi.put(`/tasks/${taskId}`, { status })
            getTasks()
            console.log("INFO Tarefa atualizada com sucesso!")
        } catch (error) {
            console.error("Erro ao atualizar o status: ", error)
        }
    }

    const onDelTask = async (id) => {
        try {
            await privateApi.delete(`/tasks/${id}`)
            console.log("Tarefa deletada com sucesso! ", id)
            getTasks()

        } catch (error) {
            console.error("Erro ao deletar a tarefa: ", error)
        }
    }

    const searchTask = (term) => {
        const normalizedTerm = term.trim().toLowerCase()

        setSearchTasks(tasks.filter(task =>
            task.name.toLowerCase().includes(normalizedTerm)
        ))
    };

    const displayTasks = searchTasks ? searchTasks : currentTasks


    useEffect(() => {
        getTasks()
        getTaskGroups()
    }, [])

    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Searchbar onSearch={searchTask} />
                <div className="taskbar">
                    {
                        displayTasks.map(task => (
                            <Task
                                key={task.id}
                                id={task.id}
                                tittle={task.name}
                                description={task.descricao}
                                group_name={task.group_name}
                                timeframe={task.updateAt}
                                status={task.status}
                                onChangeStatus={onChangeStatus}
                                onDelTask={onDelTask}
                            />
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default TaskPage