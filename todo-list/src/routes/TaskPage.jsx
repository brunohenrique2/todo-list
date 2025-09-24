import Searchbar from "../components/Searchbar"
import Sidebar from "../components/Sidebar"
import Task from "../components/Task"
import { useEffect, useState } from "react"
import {privateApi} from '../service/api'
import "./css/taskpage.css"

function TaskPage() {
    const [ tasks, setTasks ] = useState([])
    const [ taskGroups, setTaskGroups ] = useState([])
    const [ currentTasks, setCurrentTasks ] = useState([])

    
    useEffect(() => {
        const getTasks = async () => {
            const res = await privateApi.get("/tasks")
            setTasks(res.data.tasks)
        }
        getTasks()
    }, [])

    useEffect(() => {
        const getTaskGroups = async () => {
            const res = await axios.get("http://localhost:3000/taskGroups")
            setTaskGroups(res.data.taskGroups)
        }
        getTaskGroups()
    }, [])

    useEffect(() => {
        const taskJoinGroup = tasks.map(task => {
            const group = taskGroups.find(group => group.id === task.group_id)

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

    console.log(taskGroups)

    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Searchbar />
                <div className="taskbar">
                    {
                        currentTasks.map(task => (
                            <Task 
                                key={task.id}
                                id={task.id}
                                tittle={task.tittle}
                                description={task.description}
                                group_name={task.group_name}
                                timeframe={task.timeframe}
                                status={task.status}
                            />
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default TaskPage