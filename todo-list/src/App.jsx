import Searchbar from "./components/Searchbar"
import Sidebar from "./components/Sidebar"
import Task from "./components/Task"
import data from "../public/data/tasks.json"
import { useState } from "react"

function App() {

  const user = data.usuarios[0]
  const tasks = data.tasks.filter(task => task.user_id === user.id)
  const tasks_groups = data.task_groups

  const task_join_group = tasks.map(task => {
    //busca os dados do grupo daquela tarefa
    const task_group = tasks_groups.find(group => group.id === task.group_id)

    //verifica se tarefa tem um grupo, se não, ele retorna a tarefa normalmente.
      if(!task_group) {
        return task
      }
      
      //mescla os dados da tarefa com os dados do seu grupo
      return {
        ...task,
        group_name: task_group.name,
        group_color: task_group.color,
        group_icon: task_group.icon
      }
    })
    
  const [ searchTerm, setSearchTerm ] = useState("")

  const getTaskSearch = (search_term) => {
      const term_formated = search_term.trim().toLowerCase()
      const term_secure = term_formated.replace(/[^a-zA-Z0-9 ]/g, "")
      const tasks_searched = task_join_group.filter(tarefa => {

        if(!regex.test(term_secure)) return false

        return tarefa.tittle.toLowerCase().includes(term_secure.toLowerCase())
      })
      return tasks_searched
  }

  const [ currenteTasks, setCurrenteTasks ] = useState(task_join_group)

  const altTaskStatus = (id) => {
    const update = currenteTasks.map( task =>
      task.id === id ? {...task, status: task.status === "pendente" ? "concluido" : "pendente"}
      : task
    )
    setCurrenteTasks(update)
  }

  const delTask = (id) => {
    const del = currenteTasks.filter(task => task.id !== id)
    setCurrenteTasks(del)
  }

  return (
    <>
      <main>
      <Sidebar />
      <div className="main-content">
        <Searchbar onSearch={setSearchTerm}/>
        <div className="taskbar">
          {
            searchTerm
            ?
            
            getTaskSearch(searchTerm).map((value) => (
              <Task 
                key={value.id}
                id={value.id}
                tittle={value.tittle}
                description={value.description}
                group_name={value.group_name}
                timeframe={value.timeframe}
                status={value.status}
                onChangeStatus={altTaskStatus}
                onDelTask={delTask}
              />
            ))
            :
            currenteTasks.map((value) => (
              <Task 
                key={value.id}
                id={value.id}
                tittle={value.tittle}
                description={value.description}
                group_name={value.group_name}
                timeframe={value.timeframe}
                status={value.status}
                onChangeStatus={altTaskStatus}
                onDelTask={delTask}
              />
            ))
          }
        </div>
      </div>
      </main>
    </>
  )
}

export default App
