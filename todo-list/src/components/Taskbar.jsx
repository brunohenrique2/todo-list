function Taskbar() {
    return (
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
                status={value.status}
                onChangeStatus={altTaskStatus}
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
                status={value.status}
                onChangeStatus={altTaskStatus}
                />
            ))
            }
        </div>
    )
}

export default Taskbar