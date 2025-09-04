import Searchbar from "./components/Searchbar"
import Sidebar from "./components/Sidebar"
import Task from "./components/Task"
import data from "../public/data/tasks.json"
import { useState } from "react"

function App() {

  
  const usuario = data.usuarios[0]
  const task_join_group = usuario.tarefas.map(task => {
    //busca os dados do grupo daquela tarefa
    const task_group = usuario.task_groups.find(group => group.id === task.group_id)

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
      const regex = /^[a-zA-Z0-9 ]+$/
      const term_formated = search_term.trim().toLowerCase()
      const term_secure = term_formated.replace(regex, "")
      const search_term_teated = search_term.trim()
      const tasks_searched = task_join_group.filter(tarefa => {

        if(!regex.test(term_secure)) return false

        return tarefa.tittle.toLowerCase().includes(term_secure.toLowerCase())
      })
      return tasks_searched
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
            getTaskSearch(searchTerm).map((value, key) => (
              <Task 
                key={key}
                id={value.id}
                tittle={value.tittle}
                description={value.description}
                group_name={value.group_name}
                timeframe={value.timeframe}
              />
            ))
            :
            task_join_group.map((value, key) => (
              <Task 
                key={key}
                id={value.id}
                tittle={value.tittle}
                description={value.description}
                group_name={value.group_name}
                timeframe={value.timeframe}
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
