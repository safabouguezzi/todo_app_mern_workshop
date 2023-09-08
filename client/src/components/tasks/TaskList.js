import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({tasks}) => {
  return (
    <div> 
        {
           Array.isArray(tasks) && tasks.map(task => <TaskCard key={task._id} task={task} />)
        }
    </div>
  )
}

export default TaskList