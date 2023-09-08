import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TaskList from "../components/tasks/TaskList";
import { addtask, getusertasks } from "../redux/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()
  const {errors: err, taskList, isLoading} = useSelector(state => state.task)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(addtask(data))
  }

  useEffect(() => {
      dispatch(getusertasks())
  }, [])

  return (
    <div>
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

        <input type="submit" />
      </form>

      <br />

     { isLoading ? <div> isLoading ... </div> : <TaskList tasks={taskList} />}
    </div>
  );
};

export default Home;
