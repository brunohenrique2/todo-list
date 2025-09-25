import { useEffect, useState } from 'react'
import { privateApi, publicApi } from '../service/api'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import './css/editTaskPage.css'

function EditTaskPage() {
    const [name, setName] = useState("")
    const [descricao, setDescricao] = useState("")
    const [groups, setGroups] = useState([])
    const [groupId, setGroupId] = useState("")
    const { taskId } = useParams()
    const [task, setTask] = useState({})
    const navigate = useNavigate()

    const response = JSON.parse(localStorage.getItem('auth-data'))
    const {token} = response.state
    const userData = jwtDecode(token)

    const getTaskById = async () => {
        try {
            const res = await privateApi.get(`/tasks/${taskId}`)
            const task = res.data.tasks

            // Preenche os states do form com os dados retornados
            setName(task?.name || "")
            setDescricao(task?.descricao || "")
            // armazena como string pra bind com <select>
            setGroupId(task?.groupId ? String(task.groupId) : "")
            setTask(task)

        } catch (error) {
            console.error("Não foi possível buscar os dados da tarefa: ", error)
        }
    }

    const updateTask = async () => {
        try {
            const body = {
                name: name,
                descricao: descricao,
                groupId: Number(groupId) || null
            }
            await privateApi.put(`/tasks/${taskId}`, body)

            navigate('/tasks')
        } catch (error) {
            console.error("Erro ao atualizar a tarefa:", error)
        }
    }

    const getTaskGroups = async () => {
        try {
            const res = await privateApi.get("/groups")
            setGroups(res.data.groups || [])
        } catch (error) {
            console.error("Falha ao buscar os grupos: ", error)
        }
    }

    useEffect(() => {
        getTaskById()
        getTaskGroups()
    }, [taskId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateTask()
    }

    return (
        <main className='main-edit-task-container'>
            <div className='edit-task-container'>
                <form className='edit-task-form' onSubmit={handleSubmit}>
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
                        className='select-task-groups'
                        value={groupId}
                        onChange={e => setGroupId(e.target.value)}
                    >
                        <option value="">Selecione um grupo</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                    <div className="task-info-panel">
                        <p><strong>Criador:</strong> {userData.name || 'Desconhecido'}</p>
                        <p><strong>Criado em:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                        <p><strong>Última atualização:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
                    </div>
                    <div className="form-actions">
                        <Link to={'/tasks'}>
                            <button className='btn-action' type="button">Voltar</button>
                        </Link>
                        <button className='btn-action btn-action-confirm' type='submit'>
                            Atualizar
                        </button>
                    </div>
                </form>
                <div className="subtasks-container">
                        <h2>Sub Tarefas</h2>
                        <div className='subtasks-content'>

                        </div>
                </div>
            </div>
        </main>
    )
}

export default EditTaskPage
