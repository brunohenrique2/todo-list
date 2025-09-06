import { useState } from "react"

function Task( { id, tittle, group_name, description, timeframe, status, onChangeStatus, onDelTask } ) {
    return (
        <div key={id} className={`task-container ${status === "concluido" ? "checked" : ""}`}>
            <div className="task-content">
                <div className="task-header">
                    <span className="task-tittle">
                        {tittle}
                    </span>
                    <div className="task-display-info task-group">
                        <span>
                            {group_name}
                        </span>
                    </div>
                    <div className="task-display-info taks-time">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
                        <span>
                            {timeframe}
                        </span>
                    </div>
                </div>
                <p className="task-description">
                    {description}
                </p>
            </div>
            <div className="task-actions-container">
                <label 
                    className="task-actions task-btn-checker">
                    <input 
                        type="checkbox" 
                        name="task-completed"
                        onClick={() => onChangeStatus(id)}
                    />
                    <span className="checkbox-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check check-icon"><path d="M20 6 9 17l-5-5"/></svg>
                    </span>
                </label>
                <div 
                    className="task-actions task-btn-delete"
                    onClick={() => onDelTask(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </div>
            </div>
        </div>
    )
}

export default Task