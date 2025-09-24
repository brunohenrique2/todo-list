import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/tarefaform.css";

const TarefaForm = ({ tarefaId }) => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [mensagem, setMensagem] = useState("");

    // URL backend
    const BASE_URL = "http://localhost:3000";

    useEffect(() => {
        if (tarefaId) {
            axios.get(`${BASE_URL}/${tarefaId}`)
                .then(res => {
                    setTitulo(res.data.titulo);
                    setDescricao(res.data.descricao);
                })
                .catch(() => setMensagem("Erro ao carregar a tarefa."));
        } else {
            setTitulo("");
            setDescricao("");
        }
    }, [tarefaId]);

    useEffect(() => {
        if (mensagem) {
            const timer = setTimeout(() => setMensagem(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    const salvarTarefa = () => {
        if (!titulo || !descricao) {
            setMensagem("Preencha todos os campos!");
            return;
        }

        const dados = { titulo, descricao };

        if (tarefaId) {
            axios.put(`${BASE_URL}/${tarefaId}`, dados)
                .then(() => setMensagem("Tarefa atualizada com sucesso!"))
                .catch(() => setMensagem("Erro ao atualizar a tarefa."));
        } else {
            axios.post(BASE_URL, dados)
                .then(() => {
                    setMensagem("Tarefa criada com sucesso!");
                    setTitulo("");
                    setDescricao("");
                })
                .catch(() => setMensagem("Erro ao criar a tarefa."));
        }
    };

    return (
        <div className="form-container">
            <h2>{tarefaId ? "Editar / Visualizar Tarefa" : "Criar Tarefa"}</h2>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título da tarefa"
            />
            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição da tarefa"
            />
            <button onClick={salvarTarefa}>
                {tarefaId ? "Atualizar Tarefa" : "Criar Tarefa"}
            </button>
            {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
    );
};

export default TarefaForm;