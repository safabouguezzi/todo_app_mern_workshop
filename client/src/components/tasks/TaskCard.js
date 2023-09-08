import React, { useState } from 'react'
import { deletetask, updatetask } from '../../redux/slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";


const TaskCard = ({task}) => {
    const dispatch= useDispatch()
    const [edited, setEdited] = useState(false)

    const {errors: err, taskList, isLoading} = useSelector(state => state.task)
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      console.log(data);
      dispatch(updatetask({...data, _id: task._id}))
    }
  return (
    <div>
        {
            edited ? 
            <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="title"
              {...register("title", { required: true })}
            />
            <input
              type="text"
              placeholder="desc"
              {...register("desc", { required: true })}
            />
    <br/>
            <input type="submit" value="Edit" />
          </form>
            : 
            <>  
             <div>{task.title}</div>
             <div>{task.desc}</div>
            </>
        }

{     
 edited ?   "" :
        <>
        <button onClick={() => setEdited(!edited)}>Edit</button>
        <button onClick={() => dispatch(deletetask(task._id))}>x</button>
        </>
   }


    </div>
  )
}

export default TaskCard