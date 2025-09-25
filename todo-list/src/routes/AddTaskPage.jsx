import { useEffect, useState } from 'react'
import { privateApi } from '../service/api'
import { Link, useNavigate } from 'react-router-dom'
import './css/addTaskPage.css'

const AddTaskPage = () => {
  const [name, setName] = useState("")
  const [descricao, setDescricao] = useState("")
  const [groups, setGroups] = useState([])
  const [groupId, setGroupId] = useState("")
  const navigate = useNavigate()

  const getTaskGroups = async () => {
    try {
      const res = await privateApi.get("/groups")
      setGroups(res.data.groups)
      console.log(res.data);
    } catch (error) {
      console.error("Falha ao buscar os grupos: ", error)
    }
  }

  

  useEffect(() => {
    getTaskGroups()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault() // previne reload do form
    try {
      const body = {
        name,
        descricao,
        groupId: Number(groupId)
      }
      const res = await privateApi.post("/tasks/create", body)
      console.log("Tarefa criada:", res.data)

      setName("")
      setDescricao("")
      setGroupId("")

      navigate("/tasks")
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error)
    }
  }

  return (
    <main className='main-create-task-container'>
      <div className='create-task-container'>
        <form className='create-task-form' onSubmit={handleSubmit}>
          <input
            className='input-form input-tittle-task'
            type="text"
            value={name}
            placeholder='Titulo'
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className='input-form input-descricao'
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <select
            className='input-form select-task-groups'
            value={groupId}
            onChange={e => setGroupId(e.target.value)}
          >
            <option value="">Selecione um grupo</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
          <div className="form-actions">
            <Link to={'/tasks'}>
              <button className='btn-action'>Voltar</button>
            </Link>
            <button className='btn-action btn-action-confirm' type='submit'>Criar</button>

          </div>
        </form>
      </div>
    </main>
  )
}

export default AddTaskPage
